import { prisma } from "../lib/prismaClient.js";

export const GetAllRecipt = async (req, res) => {
   try {
    // input from query string to int
    const page = parseInt(req.query.page) || 1;  // start page 1
    const limit = parseInt(req.query.limit) || 10; // default 10 
    const skip = (page - 1) * limit;

    // ดึงข้อมูล
    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        skip,
        take: limit,
        include: {
          author: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: "desc" } 
      }),
      prisma.recipe.count()
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
      recipes
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const GetRecipeById = async (req, res) => {
  try {
    const { id } = req.params; 
    const recipe = await prisma.recipe.findUnique({
      where: { id: Number(id) }, 
    });

    if (!recipe) {
      return res.status(404).json({ message: "ไม่พบสูตรอาหารนี้" });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps } = req.body;
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      // If file uploaded, set imageUrl to the file path (relative to backend root)
      imageUrl = `/uploads/${req.file.filename}`;
    }
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
export const PatchRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, steps, imageUrl } = req.body;
    // find recipe
    const recipe = await prisma.recipe.findUnique({
      where: { id: Number(id) },
    });
    if (!recipe) return res.status(404).json({ message: "ไม่พบสูตรอาหาร" });
    // Check Role and author id
    if (req.user.role !== "ADMIN" && recipe.authorId !== req.user.userId)
      return res.status(403).json({ message: "ไม่มีสิทธิ์ในการดําเนินการ" });

    // Update recipt ที่ส่งมา
    const updateRecipt = await prisma.recipe.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(ingredients && { ingredients }),
        ...(steps && { steps }),
        ...(imageUrl && { imageUrl }),
      },
    });
    return res.status(200).json({ recipe: updateRecipt });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
