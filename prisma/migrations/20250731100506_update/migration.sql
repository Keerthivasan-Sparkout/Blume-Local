/*
  Warnings:

  - You are about to drop the column `Communication` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Communication",
ADD COLUMN     "call" BOOLEAN,
ADD COLUMN     "sendemail" BOOLEAN,
ADD COLUMN     "sms" BOOLEAN,
ADD COLUMN     "whatsApp" BOOLEAN;
