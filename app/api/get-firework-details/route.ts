import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const revalidate = 1;

export async function GET(req: NextRequest) {
  try {
    const result = await sql`
      SELECT id, name, description, category, inventory, price, imagehref 
      FROM fireworks 
      WHERE inventory > 0;
    `;
    const fireworks = result.rows;
    console.log("Fetched fireworks from database:", fireworks); // Debug log

    return NextResponse.json({ fireworks }, {
      status: 200,
      headers: {
        'cache': 'no-store',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching fireworks:', error);
    return NextResponse.json({ error: 'Failed to fetch fireworks' }, { status: 500 });
  }
}
