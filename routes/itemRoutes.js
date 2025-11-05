import express from "express";
import { createItem, deleteItemById, getAllItem, getAllItemUnderCategory, getAllItemUnderSubcategory, itemSearch, updateItemById } from "../controllers/itemControllers.js";

const router = express.Router();
//post request to insert and item into the collection
router.post("/", createItem);

//Get Request to retrieve all items
router.get("/", getAllItem);

// Get Request to retrieve all items under a category
router.get("/category/:categoryId", getAllItemUnderCategory);

// Get Request to get items under a subcategory with the help of 'populate'
router.get("/subcategory/:subcategoryId", getAllItemUnderSubcategory);

//Api request search items by Name with partial match
router.get("/search", itemSearch);

//put request to update attributes of an item
router.put("/:id", updateItemById);

//delete request to delete item
router.delete("/:id", deleteItemById);

export default router;
