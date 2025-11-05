import { createItemService, deleteItemService, getAllItemService, getAllItemUnderCategoryService, getAllItemUnderSubcategoryService, itemSearchService, updatedItemService } from "../services/itemServices.js";
import { sendErrorResponse } from "../utils/error.js";

export const createItem = async (req, res) => {
  try {
    const {
      subcategoryId,
    } = req.body;


    if (!subcategoryId)
      return sendErrorResponse(res, 400, "Either subcategory id should be filled");

    let exists;
    if (subcategoryId) {
      exists = await createItemService(req.body)
    } 
    if (!exists)
        return sendErrorResponse(res, 404, "Subcategory or category not found");

    res.status(201).json({
        success:true,
        message:"Created Item",
        item: exists
    });
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, "Error in creating item");
  }
}

export const getAllItem = async (req, res) => {
  try {
    const items = await getAllItemService();

    if (!items) return sendErrorResponse(res, 404, "Items not found");

    res.status(201).json({
        success:true,
        message:"Item fetched",
        item:items
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Error in fetching Items");
  }
}

export const getAllItemUnderCategory = async (req, res) => {
  try {
    const {categoryId} = req.params;
    const allitems = await getAllItemUnderCategoryService(categoryId);

    if (!allitems)
      return sendErrorResponse(res, 404, "Category or subcategory not found");


    res.status(200).json({
        success:true,
        message:"items Found",
        item:allitems
    });
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, "Error in fetching items")
  }
}

export const getAllItemUnderSubcategory = async (req, res) => {
  try {
    const {subcategoryId} = req.params;
    const allitems = await getAllItemUnderSubcategoryService(subcategoryId);

    if (!allitems)
      return sendErrorResponse(res, 404, "subcategory not found");


    res.status(200).json({
        success:true,
        message:"items Found in subcategory",
        item:allitems
    });
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 500, "Error in fetching items")
  }
}

export const itemSearch = async (req, res) => {
    try {
        const {itemName} = req.query;

        const itemData = await itemSearchService(itemName);

        if (!itemData)
            return sendErrorResponse(res, 404, "No such item found");
        
        res.status(200).json({
            success:true,
            message:"Items found",
            Item:itemData
        })

    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "Error in fetching Items");
    }
}

export const updateItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedItem = await updatedItemService(id, updates);

        if (!updatedItem)
            return sendErrorResponse(res, 404, "Item not found");

        res.status(200).json({
            success: true,
            message: "Item updated successfully",
            subcategory: updatedItem
        });

    } catch (error) {
        return sendErrorResponse(res, 500, "Error updating item");
    }
}

export const deleteItemById = async (req, res) => {
  try {
    const {id} = req.params;
    const deleteItem = await deleteItemService(id);

    if (!deleteItem)
      return sendErrorResponse(res, 404, "Item not found");
    
    res.status(200).json({
                    success: true,
                    message: "Item deleted successfully",
                    category: deleteItem
                    });
  } catch (error) {
    console.log(error)
    return sendErrorResponse(res, 500, "error in deleting item")
  }
}