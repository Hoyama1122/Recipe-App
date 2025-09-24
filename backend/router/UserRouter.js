import { Router } from "express";
const router = Router();
import {
  LoginUser,
  logout,
  RegisterUser,
} from "../controller/UserController.js";
import { verifyToken } from "../middleware/middleware.js";

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.post("/logout", verifyToken, logout);
router.get("/me", verifyToken, (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
export default router;
