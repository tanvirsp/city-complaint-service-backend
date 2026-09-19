/*
  Warnings:

  - Added the required column `contactNumber` to the `service-request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceFee` to the `service-request` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `service-request` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "service-request" ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "serviceFee" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "staffId" DROP NOT NULL,
ALTER COLUMN "address" SET NOT NULL;
