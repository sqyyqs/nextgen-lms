import {NextResponse} from 'next/server'
import {PrismaClient} from '@/generated/prisma'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const body = await req.json()
    const {courseContentId, userId} = body

    if (!courseContentId || !userId) {
        return NextResponse.json(
            {error: 'Missing courseId or userId'},
            {status: 400}
        )
    }

    try {
        const history = await prisma.courseHistory.create({
            data: {
                courseContentId: Number(courseContentId),
                userId: Number(userId),
            },
        })

        return NextResponse.json(history, {status: 201})
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {error: 'Failed to create course history'},
            {status: 500}
        )
    }
}

export async function PATCH(req: Request) {
    const body = await req.json()
    const {id, readedContentId} = body

    if (!id || readedContentId === undefined) {
        return NextResponse.json(
            {error: 'Missing id or readedContentId'},
            {status: 400}
        )
    }

    try {
        const updated = await prisma.courseHistory.updateMany({
            where: {
                id: Number(id),
            },
            data: {
                courseContentId: Number(readedContentId),
            },
        })

        if (updated.count === 0) {
            return NextResponse.json(
                {error: 'History not found for given courseId and userId'},
                {status: 404}
            )
        }

        return NextResponse.json({message: 'Updated successfully'})
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {error: 'Failed to update course history'},
            {status: 500}
        )
    }
}

