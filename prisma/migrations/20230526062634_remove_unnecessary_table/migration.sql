/*
  Warnings:

  - You are about to drop the `PublicChat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PublicRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PublicChat" DROP CONSTRAINT "PublicChat_roomId_fkey";

-- DropTable
DROP TABLE "PublicChat";

-- DropTable
DROP TABLE "PublicRoom";
