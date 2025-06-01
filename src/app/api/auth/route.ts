import {NextRequest, NextResponse} from 'next/server'
import {verifyMessage} from "ethers";

export async function POST(req: NextRequest) {
    const {message, signature, address} = await req.json()

    const nonce = req.cookies.get('auth_nonce')?.value;

    if (!nonce || !message.includes(nonce)) {
        return NextResponse.json({error: 'Invalid nonce'}, {status: 400});
    }


    try {
        const recovered = verifyMessage(message, signature);
        if (recovered.toLowerCase() === address.toLowerCase()) {
            return NextResponse.json({success: true});
        } else {
            return NextResponse.json({success: false, error: 'Неверная подпись'}, {status: 401});
        }
    } catch (e) {
        return NextResponse.json({success: false, error: 'Ошибка при проверке подписи'}, {status: 400});
    }
}
