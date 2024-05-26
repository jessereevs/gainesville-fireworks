import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const result = await sql`SELECT * FROM Fireworks;`;
        const fireworks = result.rows;
        return NextResponse.json({ fireworks }, { status: 200 });
    } catch (error) {
        console.error('Error fetching fireworks:', error);
        return NextResponse.json({ error: 'Failed to fetch fireworks' }, { status: 500 });
    }
}
