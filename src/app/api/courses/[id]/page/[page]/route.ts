import {NextResponse} from 'next/server'
import {PrismaClient} from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(
    req: Request,
    params: { params: { id: string; page: string } }
) {
    const {id, page} = await params.params

    const courseIdNumber = Number(id)
    const pageNumber = Number(page)

    if (isNaN(courseIdNumber)) {
        return NextResponse.json(
            {error: 'Invalid course ID'},
            {status: 400}
        )
    }

    if (isNaN(pageNumber)) {
        return NextResponse.json(
            {error: 'Invalid page number'},
            {status: 400}
        )
    }

    const content = await prisma.courseContent.findFirst({
        where: {
            courseId: courseIdNumber,
            page: pageNumber,
        },
    })

    if (!content) {
        return NextResponse.json(
            {error: 'Content not found'},
            {status: 404}
        )
    }

    return NextResponse.json(content)
}

