import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRecipe({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("Recipe not found");
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe)
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat text-gray-200 text-2xl font-semibold animate-pulse relative"
        style={{
          backgroundImage: "url('/mountain-sun-1148778056.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        <p className="relative z-10">Loading recipe...</p>
      </div>
    );

  return (
    <div
      style={{
        backgroundImage: "url('/mountain-sun-1148778056.jpg')",
      }}
      className="min-h-screen bg-cover bg-center bg-no-repeat py-20 px-6 relative text-gray-200"
     
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-4  mb-10">
          {recipe.images?.length > 0 ? (
            recipe.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Recipe ${i}`}
                className="w-[350px] h-[230px] object-cover rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition-all duration-300"
              />
            ))
          ) : (
            <p className="text-gray-400 italic">No images available</p>
          )}
        </div>

        <h1 className="text-4xl font-extrabold mb-6  bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
          {recipe.title}
        </h1>

        <div className=" shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 text-gray-100">
            Ingredients:
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.ingredients?.map((e, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-gray-700/60 border border-gray-600 text-gray-300 rounded-full"
              >
                {e}
              </span>
            ))}
          </div>

          <p className="text-gray-400 mb-6">
            <strong className="text-gray-300">Cooking time:</strong>{" "}
            {recipe.cookTime} minutes
          </p>

          <h2 className="text-2xl font-semibold mb-3 text-gray-100">Method</h2>
          <p className="text-gray-300 leading-relaxed">{recipe.method}</p>

          <div className="text-center">
            <button
              onClick={() => navigate(-1)}
              className="  cursor-pointer mt-10 px-8 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
               Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
