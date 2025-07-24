/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" DROP COLUMN "passwordHash",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq'),
ALTER COLUMN "isVerified" DROP NOT NULL,
ALTER COLUMN "isVerified" SET DEFAULT false;
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";
