/*
  Warnings:

  - You are about to drop the column `emailOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mobileOtp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `appleToken` on the `Userauth` table. All the data in the column will be lost.
  - You are about to drop the column `googleToken` on the `Userauth` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sub]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('LOW', 'MODERATLY_ACTIVE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Smoking" AS ENUM ('YES', 'No');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailOtp",
DROP COLUMN "isVerified",
DROP COLUMN "mobileOtp",
DROP COLUMN "password",
ADD COLUMN     "Communication" JSONB,
ADD COLUMN     "appleToken" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "emailToken" TEXT,
ADD COLUMN     "googleToken" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "sub" TEXT NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Userauth" DROP COLUMN "appleToken",
DROP COLUMN "googleToken";

-- CreateTable
CREATE TABLE "MedicalInfo" (
    "id" SERIAL NOT NULL,
    "activityLevel" "ActivityLevel" NOT NULL,
    "gender" "Gender" NOT NULL,
    "height" TEXT NOT NULL,
    "goalHeight" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "goalWeight" TEXT NOT NULL,
    "smoking" "Smoking" NOT NULL,
    "surgical" TEXT,
    "algerge" JSONB,
    "conditionName" TEXT NOT NULL,
    "diagnosisDate" TIMESTAMP(3) NOT NULL,
    "conditionStatus" TEXT NOT NULL,
    "currentTreatement" TEXT NOT NULL,
    "currentMedication" JSONB,

    CONSTRAINT "MedicalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "totalDuration" TIMESTAMP(3) NOT NULL,
    "passedDuration" TIMESTAMP(3) NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "RenewAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "mode" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "CardHolder" TEXT NOT NULL,
    "expriy" TIMESTAMP(3) NOT NULL,
    "cvc" INTEGER NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "Paymentmode" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "coupon" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "Total" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "items" TEXT[],
    "billingAddress" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_cardNumber_key" ON "Payment"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_transactionId_key" ON "Invoice"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_key" ON "User"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailToken_key" ON "User"("emailToken");
