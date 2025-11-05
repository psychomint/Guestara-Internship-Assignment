/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `subcategoryName` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "categoryName",
DROP COLUMN "subcategoryName",
DROP COLUMN "tax",
ADD COLUMN     "taxNumber" TEXT NOT NULL DEFAULT '0';
