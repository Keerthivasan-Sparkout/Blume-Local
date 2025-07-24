/*
  Warnings:

  - You are about to drop the column `appleToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `authZero` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sub` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mobile` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_sub_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "appleToken",
DROP COLUMN "authZero",
DROP COLUMN "emailToken",
DROP COLUMN "sub",
ADD COLUMN     "emailOtp" INTEGER,
ADD COLUMN     "isVerified" BOOLEAN DEFAULT false,
ADD COLUMN     "mobileOtp" INTEGER,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "mobile" SET NOT NULL;

-- CreateTable
CREATE TABLE "Userauth" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "email" TEXT,
    "mobile" TEXT,
    "emailToken" BOOLEAN NOT NULL DEFAULT false,
    "appleToken" BOOLEAN NOT NULL DEFAULT false,
    "authZero" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Userauth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Userauth_sub_key" ON "Userauth"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "Userauth_email_key" ON "Userauth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Userauth_mobile_key" ON "Userauth"("mobile");
