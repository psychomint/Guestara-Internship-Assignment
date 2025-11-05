/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `taxType` on the `Subcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "categoryName",
DROP COLUMN "tax",
DROP COLUMN "taxType",
ADD COLUMN     "taxNumber" TEXT DEFAULT '0';
