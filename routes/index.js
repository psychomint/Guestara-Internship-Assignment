import express from "express";
import categoryRoutes from "./categoryRoutes.js";
import subcategoryRoutes from "./subcategoryRoutes.js";
import itemRoutes from "./itemRoutes.js";

const router = express.Router(); 

router.use("/categories", categoryRoutes);
router.use("/subcategories", subcategoryRoutes);
router.use("/items", itemRoutes);

export default router;