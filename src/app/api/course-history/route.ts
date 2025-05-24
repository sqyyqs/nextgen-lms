import {NextResponse} from 'next/server'
import {PrismaClient} from '@/generated/prisma'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const body = await req.json()
    const {courseId, userId} = body

    if (!courseId || !userId) {
        return NextResponse.json(
            {error: 'Missing courseId or userId'},
            {status: 400}
        )
    }

    try {
        const history = await prisma.courseHistory.create({
            data: {
                courseId: Number(courseId),
                userId: Number(userId),
                pagesViewed: 0,
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
    const {id, pagesViewed} = body

    if (!id || pagesViewed === undefined) {
        return NextResponse.json(
            {error: 'Missing id or pagesRead'},
            {status: 400}
        )
    }

    try {
        const updated = await prisma.courseHistory.updateMany({
            where: {
                id: Number(id),
            },
            data: {
                pagesViewed: Number(pagesViewed),
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

