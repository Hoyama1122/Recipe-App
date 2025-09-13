import { prisma } from "../lib/prismaClient.js";

export const FilterByCategory = async (req, res) => {
  try {
    const { title, ingredient, authorId, name } = req.query;

    const recipes = await prisma.recipe.findMany({
      where: {
        ...(title && { title: { contains: title, mode: "insensitive" } }),
        ...(ingredient && { ingredients: { contains: ingredient, mode: "insensitive" } }),
        ...(authorId && { authorId: Number(authorId) }),
        ...(name && { author: { name: { contains: name, mode: "insensitive" } } }),
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return res.status(200).json({ recipes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
