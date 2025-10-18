import React from "react";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

function Home() {
  const { data: recipes, loading } = useCollection("recipes");
  const navigate = useNavigate();

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    if (window.confirm("Bu retseptni o‘chirmoqchimisiz?")) {
      try {
        await deleteDoc(doc(db, "recipes", id));
        alert("Recipe muvaffaqiyatli o‘chirildi ✅");
        navigate("/");
      } catch (error) {
        console.error("O‘chirishda xatolik:", error);
        alert("Xatolik yuz berdi ❌");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;


  if (!recipes.length)
    return (
      <p className="text-center mt-20 text-gray-500 text-xl font-semibold">
         No recipes 
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          onClick={() => navigate(`/recipe/${recipe.id}`)}
          className="card bg-base-100 shadow-xl border border-gray-200 cursor-pointer hover:shadow-2xl transition-all duration-200"
        >
          <figure>
            {recipe.images && recipe.images[0] ? (
              <img
                src={recipe.images[0]}
                alt={recipe.title}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title">{recipe.title}</h2>
            <p>{recipe.cookTime} minutes</p>
            <p>{recipe.method}</p>
            <div className="mt-2">
              {recipe.ingredients?.map((ing, i) => (
                <span key={i} className="badge badge-outline mr-1">
                  {ing}
                </span>
              ))}
            </div>
            <div className="card-actions justify-end mt-3">
              <button
                onClick={(e) => handleDelete(recipe.id, e)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
