import prisma from "../config/prismaClient.js";
import { v4 as uuidv4 } from 'uuid';

export const create_Category = async (categoryData) => {
    const id = uuidv4();
    
    const [newCategory] = await prisma.$transaction([
      prisma.category.create({
        data: {
          id,
          ...categoryData,
        },
      }),
    ]);
    return newCategory;
};

export const getCategoryBy_Id =  async (id) => {
  const getRes = await prisma.category.findFirst({
    where:{
      id
    }
  })
  if(!getRes) return null;
  return getRes;
}

export const getAll_Category = async () => {
    const categories = await prisma.category.findMany({});

    // handle empty results gracefully
    if (!categories || categories.length === 0) {
      return null;
    }

    return categories;
};

export const getAll_Category_By_its_Name = async (categoryName) => {

    const categories = await prisma.category.findMany({
      where: {
        categoryName: {
          contains: categoryName, // supports partial match
          mode: "insensitive",    // case-insensitive search
        },
      },
    });

    if (categories.length === 0) {
        return false;
    }

    return categories;
};

export const update_Category = async (id, updates) => {
  const isExist = await prisma.category.findFirst({
    where:{
      id
    }
  });

  if(!isExist){
    return null;
  }

  const updateCategoryRes = await prisma.category.update({
    where:{
      id
    },
    data:{
      ...updates
    }
  })

  return updateCategoryRes;
}

export const delete_Category = async (id) => {
  const isExist = await prisma.category.findFirst({
    where:{
      id
    }
  });

  if(!isExist) return null;

  const deleteRes = await prisma.category.delete({
    where:{
      id
    }
  })

  return deleteRes;
}