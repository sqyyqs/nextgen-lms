/*
  Warnings:

  - Added the required column `userId` to the `CourseHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseHistory" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "walletNumber" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseHistory" ADD CONSTRAINT "CourseHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
