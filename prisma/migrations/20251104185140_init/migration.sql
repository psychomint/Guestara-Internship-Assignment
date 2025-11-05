-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "taxApplicability" BOOLEAN NOT NULL DEFAULT false,
    "taxNumber" DOUBLE PRECISION,
    "taxType" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" TEXT NOT NULL,
    "subcategoryName" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "taxApplicability" BOOLEAN NOT NULL DEFAULT false,
    "taxType" TEXT,
    "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "categoryId" TEXT,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "categoryName" TEXT,
    "subcategoryName" TEXT,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "taxApplicability" BOOLEAN NOT NULL DEFAULT false,
    "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "baseAmount" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "subcategoryId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
