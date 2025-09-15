import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import recipeRouter from "./router/RecipeRouter.js";
import userRouter from "./router/UserRouter.js";

import { swaggerDocs } from "./config/swagger.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));

app.use(cookieParser());




app.use("/api/recipes", recipeRouter);
app.use("/api", userRouter);
swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Server running on port`, PORT);
});
