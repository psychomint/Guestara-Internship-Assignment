import express from 'express';
import { createSubcategory, deleteSubcategory, getAllSubcatgory, getAllSubcatgoryUnderCategory, getSubcategoryByitsName, updateSubcategory } from '../controllers/subcategoryControllers.js';

const router = express.Router();

router.post("/", createSubcategory);

//Get request to get all subcategories
router.get("/", getAllSubcatgory);

// get request to get a subcategory by its name
router.get("/search", getSubcategoryByitsName);

// Get request to get all subcategories under a category
router.get("/:categoryId", getAllSubcatgoryUnderCategory);



//put request to update attributes of subcategory
router.put("/:id", updateSubcategory);

//delete request to delete a subcategory
router.delete("/:id",deleteSubcategory);

export default router;