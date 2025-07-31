-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('DELIVERY', 'BILLING');

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "houseNo" INTEGER NOT NULL,
    "area" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "addresType" "AddressType" NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
