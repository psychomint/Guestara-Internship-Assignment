/*
  Warnings:

  - Made the column `image` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `taxType` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "taxNumber" SET DATA TYPE TEXT,
ALTER COLUMN "taxType" SET NOT NULL;
