// app/api/place-order/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';


export const revalidate = 1;

interface CartItem {
  id: string;
  name: string;
  type: string;
  description: string;
  category: string;
  price: number;
  imagehref: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const { userInfo, cart }: { userInfo: any; cart: CartItem[] } = await req.json();

  console.log('Received userInfo:', userInfo);
  console.log('Received cart:', cart);

  try {
    const client = await sql.connect();
    await client.query('BEGIN');

    // Insert user information and get the order ID
    const orderResult = await client.query(
      `INSERT INTO orders (
        user_name, user_email, user_phone, user_street1, user_street2, user_city, user_state, user_zip
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [
        userInfo.name, userInfo.email, userInfo.phone,
        userInfo.street1, userInfo.street2, userInfo.city,
        userInfo.state, userInfo.zip
      ]
    );

    console.log('Order insertion result:', orderResult);

    if (orderResult.rowCount === 0) {
      throw new Error('Failed to insert order');
    }

    const orderId = orderResult.rows[0].id;
    console.log('Generated order ID:', orderId);

    // Insert order items and update inventory
    for (const cartItem of cart) {
      await client.query(
        `INSERT INTO order_items (order_id, item_id, quantity, price)
        VALUES ($1, $2, $3, $4)`,
        [orderId, cartItem.id, cartItem.quantity, cartItem.price]
      );

      if (cartItem.category === 'Value Pack') {
        await updatePackageInventory(client, cartItem.id, cartItem.quantity);
      } else {
        await updateInventory(client, cartItem.id, -cartItem.quantity);
      }
      console.log(`Inserted order item for item ID ${cartItem.id}`);
    }

    await client.query('COMMIT');

    return NextResponse.json({ message: 'Order placed successfully' });
  } catch (error: any) {
    await sql.query('ROLLBACK');
    console.error('Error placing order:', error);
    return NextResponse.json({ error: 'Failed to place order', details: error.message }, { status: 500 });
  }
}

async function updateInventory(client: any, itemId: string, quantityChange: number): Promise<void> {
  try {
    const result = await client.query('SELECT inventory FROM fireworks WHERE id = $1', [itemId]);
    const currentInventory = result.rows[0]?.inventory;

    if (currentInventory === undefined) {
      throw new Error(`Item with ID ${itemId} not found`);
    }

    const newInventory = currentInventory + quantityChange;

    if (newInventory < 0) {
      throw new Error(`Insufficient inventory for item with ID ${itemId}`);
    }

    await client.query('UPDATE fireworks SET inventory = $1 WHERE id = $2', [newInventory, itemId]);
  } catch (error) {
    throw error;
  }
}

async function updatePackageInventory(client: any, packageId: string, packageQuantity: number): Promise<void> {
  try {
    const packageItemsResult = await client.query('SELECT firework_id, quantity FROM package_composition WHERE package_id = $1', [packageId]);
    const packageItems = packageItemsResult.rows;

    if (packageItems.length === 0) {
      throw new Error(`Package with ID ${packageId} has no items`);
    }

    for (const item of packageItems) {
      const itemId = item.firework_id;
      const itemQuantityChange = item.quantity * packageQuantity;
      await updateInventory(client, itemId, -itemQuantityChange);
    }
  } catch (error) {
    throw error;
  }
}
