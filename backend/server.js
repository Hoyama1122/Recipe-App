import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import recipeRouter from "./router/RecipeRouter.js";
import userRouter from "./router/UserRouter.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/recipes", recipeRouter);
app.use("/api/", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port`, PORT);
});
