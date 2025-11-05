import { createSubcategoryService, deleteSubcategoryService, getAllSubcatgoryService, getAllSubcatgoryUnderCategoryService, getSubcategoryByitsNameService, updatedsubCategoryService } from "../services/subcategoryServices.js";
import { sendErrorResponse } from "../utils/error.js";

export const createSubcategory = async (req, res) => {
    try {

        const newSubcategory = await createSubcategoryService(req.body);

        if(!newSubcategory) return sendErrorResponse(res, 404, "category not found");

        res.status(201).json({
            success:true,
            message:"Subcategory created",
            subcategory:newSubcategory
        });

    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "Error in  creating in subcategory");
    }
}

export const getAllSubcatgory = async (req, res) => {
    try {
        const subcategories = await getAllSubcatgoryService();
        if (!subcategories)
            return sendErrorResponse(res, 404, "No subcategory found");

        res.status(200).json({
            success:true,
            message:"Subcategory found",
            subcategory: subcategories
        });

    } catch (error) {
        return sendErrorResponse(res, 500, "Error in fetching in Subcategory");
    }
}

export const getAllSubcatgoryUnderCategory = async (req, res) => {
    try {
        const {categoryId:id} = req.params;

        const categoryData = await getAllSubcatgoryUnderCategoryService(id);

        if(!categoryData) return sendErrorResponse(res, 404, "No such category or subcategory found" );

        res.status(200).json({
            success:true,
            message:"Subcategory fetched",
            subcategory:categoryData
        });

    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "Error in fetching subcategory");
    }
}

export const getSubcategoryByitsName = async (req, res) => {
    try {
        const {subcategoryName} = req.query;

        const subcategory = await getSubcategoryByitsNameService(subcategoryName);

        if (!subcategory)
            return sendErrorResponse(res, 404, "No such subcategory found");
        
        res.status(200).json({
            success:true,
            message:"Subcategory found",
            Subcategory:subcategory
        })

    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "Error in fetching subcategory");
    }

}

export const updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedSubcategory = await updatedsubCategoryService(id, updates);

        if (!updatedSubcategory)
            return sendErrorResponse(res, 404, "Subcategory not found");

        res.status(200).json({
            success: true,
            message: "Subcategory updated successfully",
            subcategory: updatedSubcategory
        });

    } catch (error) {
        return sendErrorResponse(res, 500, "Error updating subcategory");
    }
};


export const deleteSubcategory = async (req, res) => {
  try {
    const {id} = req.params;
    const deleteCategory = await deleteSubcategoryService(id);

    if (!deleteCategory)
      return sendErrorResponse(res, 404, "Subcategory not found");
    
    res.status(200).json({
                    success: true,
                    message: "Subcategory deleted successfully",
                    category: deleteCategory
                    });
  } catch (error) {
    console.log(error)
    return sendErrorResponse(res, 500, "error in deleting Subcategory")
  }
};
