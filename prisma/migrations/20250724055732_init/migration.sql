/*
  Warnings:

  - You are about to drop the column `emailOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mobileOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sub]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailOtp",
DROP COLUMN "isVerified",
DROP COLUMN "mobileOtp",
DROP COLUMN "password",
ADD COLUMN     "appleToken" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "authZero" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emailToken" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sub" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "mobile" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_key" ON "User"("sub");
