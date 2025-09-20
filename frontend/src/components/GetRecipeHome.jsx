import React, { useState, useEffect } from "react";
import customFetch from "../../config/axios";
import Loader from "./Loader";

const GetRecipeHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchRecipes = async () => {
    try {
      const res = await customFetch.get("/recipes");
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      setError(err.message || "Error fetching recipes");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
    
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-red-500  text-center py-10">เกิดข้อผิดพลาด: {error}</p>
    );

  return (
    <div>
      <h1 className="py-6 text-4xl text-center ">สูตรอาหาร</h1>
      <div className=" grid grid-cols-3  gap-4 p-4">
        {data.recipes?.map((recipe) => (
          <div
            key={recipe.id}
            className="p-4 h-64 shadow rounded flex flex-col items-center justify-between"
          >
            {recipe.imageUrl && (
              <img
                src={`http://localhost:3000${recipe.imageUrl}`}
                alt={recipe.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <strong>{recipe.title}</strong>
            <span>{recipe.description}</span>
            <p className="text-sm text-gray-500">{recipe.author.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetRecipeHome;
