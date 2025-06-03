import {NextResponse} from 'next/server';

export async function GET() {
    const nonce = crypto.randomUUID();
    const message = `Вход в приложение. Nonce: ${nonce}`;

    const res = NextResponse.json({message});
    res.cookies.set('auth_nonce', nonce, {
        httpOnly: true,
        maxAge: 300,
        path: '/',
    });

    return res;
}
