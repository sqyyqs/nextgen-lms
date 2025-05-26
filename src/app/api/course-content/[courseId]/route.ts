import {NextResponse} from 'next/server'
import {PrismaClient} from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET(
    req: Request,
    params: { params: { courseId: string } }
) {
    const {courseId} = await params.params
    const userId = 1 // todo сделать id откуда-то

    const {searchParams} = new URL(req.url)
    const page = searchParams.get('page')

    if (page != null) {
        const pageNumber = Number(page)
        if (!isNaN(pageNumber)) {
            const contentOnPage = await prisma.courseContent.findFirst({
                where: {
                    courseId: Number(courseId),
                    page: pageNumber,
                },
            })

            return NextResponse.json(contentOnPage)
        }
    }

    const lastContentForUser = await prisma.courseHistory.findFirst({
        where: {
            userId: userId,
            courseContent: {
                courseId: Number(courseId),
            },
        },
        orderBy: {
            courseContent: {
                page: 'desc',
            },
        },
        include: {
            courseContent: true,
        },
    });

    return NextResponse.json(lastContentForUser?.courseContent)
}

