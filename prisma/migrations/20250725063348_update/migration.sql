/*
  Warnings:

  - You are about to drop the column `authZero` on the `Userauth` table. All the data in the column will be lost.
  - You are about to drop the column `emailToken` on the `Userauth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Userauth" DROP COLUMN "authZero",
DROP COLUMN "emailToken",
ADD COLUMN     "googleToken" TEXT,
ALTER COLUMN "appleToken" DROP NOT NULL,
ALTER COLUMN "appleToken" DROP DEFAULT,
ALTER COLUMN "appleToken" SET DATA TYPE TEXT;
