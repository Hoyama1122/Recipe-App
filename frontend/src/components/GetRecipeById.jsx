// src/components/recipes/GetRecipeById.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import customFetch from "../../config/axios";
import Loader from "./Loader";

const GetRecipeById = () => {
  const { id } = useParams(); // ดึง id จาก URL เช่น /recipes/1
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipe = async () => {
    try {
      const res = await customFetch.get(`/recipes/${id}`);
      setRecipe(res.data); 
      console.log(res.data);
    } catch (err) {
      setError(err.message || "Error fetching recipe");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-red-500 text-center py-10">เกิดข้อผิดพลาด: {error}</p>
    );
  if (!recipe) return <p className="text-center py-10">ไม่พบสูตรอาหาร</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {recipe.imageUrl && (
        <img
          src={`http://localhost:3000${recipe.imageUrl}`}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
      <p className="text-gray-700 mb-4">{recipe.description}</p>
      <p className="text-sm text-gray-500">โดย {recipe.author?.name}</p>
    </div>
  );
};

export default GetRecipeById;
