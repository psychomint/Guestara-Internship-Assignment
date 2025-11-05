import { create_Category, delete_Category, getAll_Category, getAll_Category_By_its_Name, getCategoryBy_Id, update_Category } from "../services/categoryServices.js";
import { sendErrorResponse } from "../utils/error.js";

export const createCategory = async (req, res) => {
  try {
    const {name, image, description, taxApplicability, taxNumber, taxType} = req.body;
    
    if (!name || !description) {
      return sendErrorResponse(res, 400, "Name and description are required.");
    }
    const categoryData = {
        categoryName:name,
        image:image,
        description:description,
        taxApplicability:taxApplicability,
        taxNumber:taxNumber,
        taxType:taxType
    }

    const saveCategory = await create_Category(categoryData);

    if (!saveCategory)
        return sendErrorResponse(res, 404, "Error creating category");

    res.status(201).json({
                    success: true,
                    message: "Category created",
                    category: saveCategory
                    });
  } catch (error) {
    console.log(error)
    return sendErrorResponse(res,500, "An error occurred during category creation.")
  }
};

export const getCategoryById = async (req, res) => {
    try{
        const {id} = req.params;
        const response = await getCategoryBy_Id(id);
        if(!response) 
            return sendErrorResponse(res, 404, "category not found");
        return res.status(200).json({
            success:true,
            message:"Category found",
            category:response
        })
    }
    catch(err){
        return sendErrorResponse(res, 500, "error in fetching category");
    }
}

export const getAllCategory = async (req, res) => {
  try {
    const categories = await getAll_Category();

    if (!categories)
      return sendErrorResponse(res, 404, "No categories found");

    res.status(200).json({
                    success: true,
                    message: "Category found",
                    count: categories.length,
                    category: categories
                    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Error while fetching category");
  }
};

export const getAllCategoryByitsName = async (req, res) => {
  try {
    const {categoryName} = req.query;
    const category = await getAll_Category_By_its_Name(categoryName);

    if (!category)
      return sendErrorResponse(res, 404, "No such category found");

    res.status(200).json({
                    success: true,
                    message: "Category found",
                    count: category.length,
                    category: category
                    });
  } catch (error) {
    return sendErrorResponse(res, 500, "No category found of this name");
  }
};

export const updateCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const {name:categoryName, ...updates} = req.body;

    const userData = {
        categoryName,
        ...updates
    }

    const updatedCategory = await update_Category(id,userData);

    if (!updatedCategory)
      return sendErrorResponse(res, 404, "Category not found");

    res.status(200).json({
                    success: true,
                    message: "Category updated",
                    category: updatedCategory
                    });
  } catch (error) {
    console.error("Error updating items:", error);
    return sendErrorResponse(res, 500, "Error updating category");
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const {id} = req.params;
    const deleteCategory = await delete_Category(id);

    if (!deleteCategory)
      return sendErrorResponse(res, 404, "category not found");
    
    res.status(200).json({
                    success: true,
                    message: "category deleted successfully",
                    category: deleteCategory
                    });
  } catch (error) {
    console.log(error)
    return sendErrorResponse(res, 500, "error in deleting category")
  }
};

