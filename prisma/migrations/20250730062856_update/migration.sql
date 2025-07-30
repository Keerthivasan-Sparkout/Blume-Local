/*
  Warnings:

  - You are about to drop the column `RenewAt` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `passedDuration` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Program` table. All the data in the column will be lost.
  - Changed the type of `totalDuration` on the `Program` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Program" DROP COLUMN "RenewAt",
DROP COLUMN "passedDuration",
DROP COLUMN "startAt",
DROP COLUMN "totalDuration",
ADD COLUMN     "totalDuration" INTEGER NOT NULL;
