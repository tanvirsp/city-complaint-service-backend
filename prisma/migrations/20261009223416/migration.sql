-- AlterTable
ALTER TABLE "service-request" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID';
