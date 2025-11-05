import express from "express";
import { createCategory, deleteCategory, getAllCategory, getAllCategoryByitsName, getCategoryById, updateCategory } from "../controllers/categoryControllers.js";


const router = express.Router();
// create new category
router.post("/", createCategory);

// API request to get a category by its name
router.get("/search", getAllCategoryByitsName);

// API to get categories by id
router.get("/:id", getCategoryById);

// API to get all categories
router.get("/", getAllCategory);

// put request to update attributes of a category
router.put("/:id", updateCategory);

// API request to delete a category by its name
router.delete("/:id", deleteCategory);

export default router;
