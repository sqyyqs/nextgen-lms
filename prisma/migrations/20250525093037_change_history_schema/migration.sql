/*
  Warnings:

  - You are about to drop the column `description` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `CourseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `pagesViewed` on the `CourseHistory` table. All the data in the column will be lost.
  - Added the required column `courseContentId` to the `CourseHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseHistory" DROP CONSTRAINT "CourseHistory_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "CourseHistory" DROP COLUMN "courseId",
DROP COLUMN "pagesViewed",
ADD COLUMN     "courseContentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CourseHistory" ADD CONSTRAINT "CourseHistory_courseContentId_fkey" FOREIGN KEY ("courseContentId") REFERENCES "CourseContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
