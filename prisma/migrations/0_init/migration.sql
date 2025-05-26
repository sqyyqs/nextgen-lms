-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseContent" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "page" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "CourseContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseHistory" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "pagesViewed" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "CourseHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseHistory" ADD CONSTRAINT "CourseHistory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

