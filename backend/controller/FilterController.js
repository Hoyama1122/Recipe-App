import { prisma } from "../lib/prismaClient.js";

export const FilterByCategory = async (req, res) => {
  try {
    const { title } = req.query;
    const filter = prisma.recipe.findMany({
      where: {
        title: {
          contains: title || undefined,
          mode: "insensitive",
        },
       
      },
    });
    return res.status(200).json({ filter: filter });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
