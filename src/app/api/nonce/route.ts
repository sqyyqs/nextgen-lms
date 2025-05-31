import { NextResponse } from 'next/server';

export async function GET() {
  const nonce = Math.random().toString(36).substring(2); // Генерируем случайный nonce
  return NextResponse.json({ nonce });
}