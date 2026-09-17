-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "ComplaintStatus" AS ENUM ('PENDING', 'ONGING', 'COMPLETE', 'REJECTED');

-- CreateTable
CREATE TABLE "complaints" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "status" "ComplaintStatus" NOT NULL DEFAULT 'PENDING',
    "beforeImageUrl" TEXT NOT NULL DEFAULT '',
    "beforeImagePublicId" TEXT NOT NULL DEFAULT '',
    "afterImageUrl" TEXT NOT NULL DEFAULT '',
    "afterImagePublicId" TEXT NOT NULL DEFAULT '',
    "rejectReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "citizenId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,

    CONSTRAINT "complaints_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "citizens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
