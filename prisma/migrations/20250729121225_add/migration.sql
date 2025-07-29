/*
  Warnings:

  - You are about to drop the `_ProgramToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProgramToUser" DROP CONSTRAINT "_ProgramToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProgramToUser" DROP CONSTRAINT "_ProgramToUser_B_fkey";

-- DropTable
DROP TABLE "_ProgramToUser";

-- CreateTable
CREATE TABLE "UserProgram" (
    "userId" INTEGER NOT NULL,
    "ProgramID" INTEGER NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewAt" TIMESTAMP(3),

    CONSTRAINT "UserProgram_pkey" PRIMARY KEY ("userId","ProgramID")
);

-- AddForeignKey
ALTER TABLE "UserProgram" ADD CONSTRAINT "UserProgram_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgram" ADD CONSTRAINT "UserProgram_ProgramID_fkey" FOREIGN KEY ("ProgramID") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
