import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const result = await sql`SELECT * FROM Packages;`;
        const packages = result.rows;
        return NextResponse.json({ packages }, { status: 200 });
    } catch (error) {
        console.error('Error fetching packages:', error);
        return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
    }
}
