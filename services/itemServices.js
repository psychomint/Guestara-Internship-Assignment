import prisma from "../config/prismaClient.js";
import { v4 as uuidv4 } from 'uuid';

export const createItemService = async (itemData) => {
    const {
      subcategoryId,
      baseAmount,
      discount,
    } = itemData

    const totalAmount = baseAmount - discount;

    const response = await prisma.subcategory.findFirst({
        where:{
            id:subcategoryId
        }
    });

    if(!response) return null;

    const itemRes = await prisma.item.create({
        data:{
            id:uuidv4(),
            totalAmount,
            ...itemData
        }
    });
    return itemRes;
}

export const getAllItemService = async () => {
    const response = await prisma.item.findMany({});
    return response;
}

export const getAllItemUnderCategoryService = async (categoryId) => {

    const categoryData = await prisma.category.findFirst({
        where:{
            id:categoryId
        }
    })

    if(!categoryData) return null;

    const subcategoryData = await prisma.subcategory.findMany({
        where:{
            categoryId
        }
    })

    if(!subcategoryData) return null;

    /* A category can have subcategories which in turn can has multiples items
        below is the logic to retrieve those items which fall under a category */

        const itemsData = (
        await Promise.all(
            subcategoryData.map((subcate) =>
            prisma.item.findMany({ where: { subcategoryId: subcate.id } })
            )
        )
        ).flat();


    return itemsData;
}

export const getAllItemUnderSubcategoryService = async (subcategoryId) => {

    const subcategoryData = await prisma.subcategory.findFirst({
        where:{
            id:subcategoryId
        }
    })

    if(!subcategoryData) return null;

    const itemsData = await prisma.item.findMany({
        where:{
            subcategoryId
        }
    })

    if(!itemsData) return null;

    /* A category can have subcategories which in turn can has multiples items
        below is the logic to retrieve those items which fall under a category */

        // const itemsData = (
        // await Promise.all(
        //     subcategoryData.map((subcate) =>
        //     prisma.item.findMany({ where: { subcategoryId: subcate.id } })
        //     )
        // )
        // ).flat();


    return itemsData;
}


export const itemSearchService = async (itemName) => {

    const response = await prisma.item.findMany({
      where: {
        itemName: {
          contains: itemName, // supports partial match
          mode: "insensitive",    // case-insensitive search
        },
      },
    });

    if (response.length === 0) {
        return false;
    }

    return response;
}

export const updatedItemService = async (id, updates) => {
  const isExist = await prisma.item.findFirst({
    where:{
      id
    }
  });

  if(!isExist){
    return null;
  }

  const updateItemRes = await prisma.item.update({
    where:{
      id
    },
    data:{
      ...updates
    }
  })

  return updateItemRes;
}

export const deleteItemService = async (id) => {

  const isExist = await prisma.item.findFirst({
    where:{
      id
    }
  });

  if(!isExist) return null;

  const deleteRes = await prisma.item.delete({
    where:{
      id
    }
  })

  return deleteRes;
}