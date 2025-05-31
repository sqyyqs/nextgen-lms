import { NextRequest, NextResponse } from 'next/server'
import { verifyMessage } from 'viem'

export async function POST(req: NextRequest) {
  const { message, signature, address } = await req.json()

  const isValid = await verifyMessage({ address, message, signature })

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}
