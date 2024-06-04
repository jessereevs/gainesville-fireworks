// app/api/update-inventory/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { updateInventory } from '../../lib/inventory';

export async function POST(req: NextRequest) {
  const { cart } = await req.json();

  try {
    // Update inventory for each item in the cart
    await Promise.all(cart.map((item: any) => updateInventory(item.id, -item.quantity)));

    return NextResponse.json({ message: 'Inventory updated successfully' });
  } catch (err) {
    console.error('Error updating inventory:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
