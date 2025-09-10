import { Router } from "express";
const router = Router();
import {
  CreateRecipe,
  DeleteRecipe,
  GetAllRecipt,
  GetRecipeById,
} from "../controller/RecipeController.js";
import { verifyToken } from "../middleware/middleware.js";

router.route("/").get(GetAllRecipt);
router.post("/", verifyToken, CreateRecipe);
router.route("/:id").get(GetRecipeById).delete(verifyToken, DeleteRecipe);
export default router;
