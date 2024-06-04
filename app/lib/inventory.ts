import { sql } from '@vercel/postgres';

export async function updateInventory(itemId: number, quantityChange: number): Promise<void> {
  const client = await sql.connect();

  try {
    // Begin the transaction
    await client.query('BEGIN');

    // Retrieve current inventory for the item
    const result = await client.query('SELECT inventory FROM fireworks WHERE id = $1', [itemId]);
    const currentInventory = result.rows[0]?.inventory;

    if (currentInventory === undefined) {
      throw new Error(`Item with ID ${itemId} not found`);
    }

    const newInventory = currentInventory + quantityChange;

    if (newInventory < 0) {
      throw new Error(`Insufficient inventory for item with ID ${itemId}`);
    }

    // Update the inventory
    await client.query('UPDATE fireworks SET inventory = $1 WHERE id = $2', [newInventory, itemId]);

    // Commit the transaction
    await client.query('COMMIT');
  } catch (error) {
    // Rollback the transaction in case of error
    await client.query('ROLLBACK');
    console.error('Error updating inventory:', error);
    throw error;
  } finally {
    client.release();
  }
}
