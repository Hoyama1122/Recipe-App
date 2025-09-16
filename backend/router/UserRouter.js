import { Router } from "express";
const router = Router();
import { LoginUser, logout, RegisterUser } from "../controller/UserController.js";
import { verifyToken } from "../middleware/middleware.js";


router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.post("/logout", verifyToken, logout);
router.get("/me", verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});
export default router;
