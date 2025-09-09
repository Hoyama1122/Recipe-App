import { Router } from "express";
const router = Router();
import { Testreq } from "../controller/testreq.js";


router.route("/").get(Testreq);

export default router;


