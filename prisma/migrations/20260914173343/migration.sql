/*
  Warnings:

  - You are about to drop the column `additionalFiles` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `rejectionReason` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `resumePublicId` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedAt` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedBy` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `serviceFee` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `verificationStatus` on the `staffs` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `staffs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "staffs" DROP COLUMN "additionalFiles",
DROP COLUMN "rejectionReason",
DROP COLUMN "resume",
DROP COLUMN "resumePublicId",
DROP COLUMN "reviewedAt",
DROP COLUMN "reviewedBy",
DROP COLUMN "serviceFee",
DROP COLUMN "specialization",
DROP COLUMN "verificationStatus",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
