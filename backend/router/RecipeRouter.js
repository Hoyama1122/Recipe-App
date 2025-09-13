import { Router } from "express";
const router = Router();
import {
  CreateRecipe,
  DeleteRecipe,
  GetAllRecipt,
  GetRecipeById,
  PatchRecipe,
} from "../controller/RecipeController.js";
import { verifyToken } from "../middleware/middleware.js";
import { FilterByCategory } from "../controller/FilterController.js";
/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: ดึงสูตรอาหารทั้งหมด
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 *
 *   post:
 *     summary: สร้างสูตรอาหารใหม่
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               steps:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipe created
 *
 */
router.route("/").get(GetAllRecipt);
router.post("/", verifyToken, CreateRecipe);
router.get("/filter", FilterByCategory);
router
  .route("/:id")
  .get(GetRecipeById)
  .delete(verifyToken, DeleteRecipe)
  .patch(verifyToken, PatchRecipe);
export default router;
