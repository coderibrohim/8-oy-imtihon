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

  if (!recipe) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-20">
      <div className="flex gap-3  mb-6">
        {recipe.images?.length > 0 ? (
          recipe.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Recipe ${i}`}
              className="w-[350px] h-50 object-cover rounded-lg shadow-md"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      <h1 className="text-3xl font-bold mb-4 ">{recipe.title}</h1>
      <div className=" p-6 rounded-lg ">
        <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.ingredients?.map((e) => (
            <span
              key={e}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
            >
              {e}
            </span>
          ))}
        </div>

        <p className="text-gray-600 mb-4">
          <strong>Cooking time:</strong> {recipe.cookTime}
        </p>

        <h2 className="text-2xl font-semibold mb-2">Method</h2>
        <p className="text-gray-700 leading-relaxed">{recipe.method}</p>

        <button onClick={() => navigate(-1)} className="btn btn-primary mt-6">
          Back
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
