import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  try {
    const result = await sql`
      INSERT INTO contact (name, email, phone, message) 
      VALUES (${name}, ${email}, ${phone}, ${message}) 
      RETURNING *;
    `;
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}