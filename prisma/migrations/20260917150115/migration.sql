/*
  Warnings:

  - You are about to drop the column `citizenId` on the `complaints` table. All the data in the column will be lost.
  - Added the required column `userId` to the `complaints` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "complaints" DROP CONSTRAINT "complaints_citizenId_fkey";

-- AlterTable
ALTER TABLE "complaints" DROP COLUMN "citizenId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
