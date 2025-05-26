import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || ''

    const courses = await prisma.course.findMany({
        where: {
            title: {
                contains: query,
                mode: 'insensitive',
            },
        },
    })

    return NextResponse.json(courses)
}

//
// export async function POST(req: Request) {
//     const body = await req.json()
//     const course = await prisma.course.create({
//         data: {
//             title: body.title,
//         },
//     })
//     return NextResponse.json(course, { status: 201 })
// }
