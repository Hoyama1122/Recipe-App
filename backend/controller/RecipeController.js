import { prisma } from "../lib/prismaClient.js";

export const GetAllRecipt = async (req, res) => {
  try {
    const recipe = await prisma.recipe.findMany();
    return res.status(200).json({ recipe: recipe });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const GetRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ recipe: recipe });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, imageUrl } = req.body;
    if (!title || !description || !ingredients || !steps) {
      return res.status(400).json({ message: "เปิดกรอกข้อมูลให้ครบ" });
    }
    const authorId = req.user.userId;
    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        ingredients,
        steps,
        imageUrl,
        authorId: Number(authorId),
      },
    });
    return res.status(200).json({ recipe: recipe });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const DeleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!recipe) return res.status(404).json({ message: "ไม่พบข้อมูลโพสต์" });
    // check author id
    // admin can delete any recipe
    if (req.user.role !== "ADMIN" && recipe.authorId !== req.user.userId)
      return res.status(403).json({ message: "ไม่มีสิทธิ์ในการดําเนินการ" });
    await prisma.recipe.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ message: "ลบโพสต์สําเร็จ" });
  } catch (error) {}
};
