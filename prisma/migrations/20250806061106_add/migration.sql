/*
  Warnings:

  - You are about to drop the column `medicalInfoId` on the `Allerges` table. All the data in the column will be lost.
  - You are about to drop the `MedicalInfo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Allerges` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Allerges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Allerges" DROP CONSTRAINT "Allerges_medicalInfoId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalInfo" DROP CONSTRAINT "MedicalInfo_userId_fkey";

-- DropIndex
DROP INDEX "Allerges_medicalInfoId_key";

-- AlterTable
ALTER TABLE "Allerges" DROP COLUMN "medicalInfoId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MedicalInfo";

-- CreateTable
CREATE TABLE "MedicalCondition" (
    "id" SERIAL NOT NULL,
    "diabetes" JSONB,
    "hypertension" JSONB,
    "asthma" JSONB,
    "thyroidDisorder" JSONB,
    "heartDisease" JSONB,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MedicalCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentMedication" (
    "id" SERIAL NOT NULL,
    "metformin" JSONB,
    "atorvastalin" JSONB,
    "lisinopril" JSONB,
    "albuterolInhaler" JSONB,
    "levothyroxine" JSONB,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CurrentMedication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalCondition_userId_key" ON "MedicalCondition"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CurrentMedication_userId_key" ON "CurrentMedication"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Allerges_userId_key" ON "Allerges"("userId");

-- AddForeignKey
ALTER TABLE "Allerges" ADD CONSTRAINT "Allerges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCondition" ADD CONSTRAINT "MedicalCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentMedication" ADD CONSTRAINT "CurrentMedication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
