import { v4 as uuidv4 } from "uuid";
import prisma from "../config/prismaClient.js";


export const createSubcategoryService = async (subCategoryData) => {
    
    const {
        taxApplicability,
        taxNumber,
    } = subCategoryData;


    const categoryRes = await prisma.category.findFirst({
        where:{
            id:subCategoryData.categoryId
        }
    });

    if(!categoryRes) return null;



  // Create subcategory in DB
    const newSubcategory = await prisma.subcategory.create({
        data: {
        id: uuidv4(),
        taxNumber: subCategoryData.taxNumber ?? categoryRes.taxNumber,
        taxApplicability: subCategoryData.taxApplicability ?? categoryRes.taxApplicability,
        ...subCategoryData
        },
    });

  return newSubcategory;
};


export const getAllSubcatgoryService = async () => {
    const response = await prisma.subcategory.findMany({});
    if(response.length === 0) return null;
    return response;
}

export const getAllSubcatgoryUnderCategoryService = async (id) => {
    const response = await prisma.category.findFirst({
        where:{
            id
        }
    })

    if(!response) return null;

    const subcategoiresRes = await prisma.subcategory.findMany({
        where:{
            categoryId:id
        }
    })

    return subcategoiresRes;
}

export const getSubcategoryByitsNameService = async (subcategoryName) => {

    const categories = await prisma.subcategory.findMany({
      where: {
        subcategoryName: {
          contains: subcategoryName, // supports partial match
          mode: "insensitive",    // case-insensitive search
        },
      },
    });

    if (categories.length === 0) {
        return false;
    }

    return categories;
}

export const updatedsubCategoryService = async (id, updates) => {
  const isExist = await prisma.subcategory.findFirst({
    where:{
      id
    }
  });

  if(!isExist){
    return null;
  }

  const updateSubCategoryRes = await prisma.subcategory.update({
    where:{
      id
    },
    data:{
      ...updates
    }
  })

  return updateSubCategoryRes;
}

export const deleteSubcategoryService = async (id) => {

  const isExist = await prisma.subcategory.findFirst({
    where:{
      id
    }
  });

  if(!isExist) return null;

  const deleteRes = await prisma.subcategory.delete({
    where:{
      id
    }
  })

  return deleteRes;
}