/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `MedicalInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `MedicalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalInfo" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MedicalInfo_userId_key" ON "MedicalInfo"("userId");

-- AddForeignKey
ALTER TABLE "MedicalInfo" ADD CONSTRAINT "MedicalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
