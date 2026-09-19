/*
  Warnings:

  - Added the required column `title` to the `service-request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service-request" ADD COLUMN     "title" TEXT NOT NULL;
