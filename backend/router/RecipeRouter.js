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
import upload from "../middleware/upload.js";
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
 *         multipart/form-data:
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
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Recipe created
 *
 * /recipes/filter:
 *   get:
 *     summary: ค้นหาสูตรอาหารตามหมวดหมู่
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: หมวดหมู่ของสูตรอาหาร
 *     responses:
 *       200:
 *         description: Success
 *
 * /recipes/{id}:
 *   get:
 *     summary: ดึงสูตรอาหารตาม ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: ไม่พบสูตรอาหารนี้
 *   delete:
 *     summary: ลบสูตรอาหารตาม ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ลบโพสต์สําเร็จ
 *       404:
 *         description: ไม่พบข้อมูลโพสต์
 *       403:
 *         description: ไม่มีสิทธิ์ในการดําเนินการ
 *   patch:
 *     summary: แก้ไขสูตรอาหารตาม ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *         description: Success
 *       404:
 *         description: ไม่พบสูตรอาหาร
 *       403:
 *         description: ไม่มีสิทธิ์ในการดําเนินการ
 */
router.route("/").get(GetAllRecipt);
router.post("/", verifyToken, upload.single("image"), CreateRecipe);
router.get("/filter", FilterByCategory);
router
  .route("/:id")
  .get(GetRecipeById)
  .delete(verifyToken, DeleteRecipe)
  .patch(verifyToken, PatchRecipe);
export default router;
