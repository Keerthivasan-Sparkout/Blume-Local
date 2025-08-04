/*
  Warnings:

  - You are about to drop the column `activityLevel` on the `MedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `algerge` on the `MedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `MedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `goalHeight` on the `MedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `goalWeight` on the `MedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `MedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `smoking` on the `MedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `surgical` on the `MedicalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `MedicalInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MedicalInfo" DROP COLUMN "activityLevel",
DROP COLUMN "algerge",
DROP COLUMN "gender",
DROP COLUMN "goalHeight",
DROP COLUMN "goalWeight",
DROP COLUMN "height",
DROP COLUMN "smoking",
DROP COLUMN "surgical",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "Allerges" (
    "id" SERIAL NOT NULL,
    "peanutAllerge" JSONB,
    "dustAllerge" JSONB,
    "pollenAllerge" JSONB,
    "petDanderAllerge" JSONB,
    "soyAllerge" JSONB,
    "medicalInfoId" INTEGER NOT NULL,

    CONSTRAINT "Allerges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Allerges_medicalInfoId_key" ON "Allerges"("medicalInfoId");

-- AddForeignKey
ALTER TABLE "Allerges" ADD CONSTRAINT "Allerges_medicalInfoId_fkey" FOREIGN KEY ("medicalInfoId") REFERENCES "MedicalInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
