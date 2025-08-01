/*
  Warnings:

  - The `activityLevel` column on the `MedicalInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gender` column on the `MedicalInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `smoking` column on the `MedicalInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MedicalInfo" DROP COLUMN "activityLevel",
ADD COLUMN     "activityLevel" "ActivityLevel",
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender",
DROP COLUMN "smoking",
ADD COLUMN     "smoking" "Smoking";
