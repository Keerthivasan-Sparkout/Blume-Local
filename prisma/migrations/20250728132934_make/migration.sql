/*
  Warnings:

  - A unique constraint covering the columns `[googleToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appleToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_googleToken_key" ON "User"("googleToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_appleToken_key" ON "User"("appleToken");
