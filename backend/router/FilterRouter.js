import { Router } from "express";
import { FilterByCategory } from "../controller/FilterController.js";
const router = Router();

router.get("/recipes/filter", FilterByCategory);
export default router;