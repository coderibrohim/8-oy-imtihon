import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipeError } from "../components/Errorld";
import { useAddRecipe } from "../hooks/useRecipe";

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [method, setMethod] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [localError, setLocalError] = useState(null);

  const { addRecipe, isPending, error, message } = useAddRecipe();
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient]);
      setIngredient("");
    }
  };

  const handleAddImage = () => {
    if (image.trim()) {
      setImages([...images, image]);
      setImage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipe = { title, cookTime, method, ingredients, images };
    const errMsg = getRecipeError(recipe);
    if (errMsg) {
      setLocalError(errMsg);
      setTimeout(() => setLocalError(null), 3000);
      return;
    }

    await addRecipe(recipe);
    setTitle("");
    setCookTime("");
    setMethod("");
    setIngredients([]);
    setImages([]);
  };

  const handlePreview = () => {
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-300 to-gray-500 relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-gray-200 to-gray-400 blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] rounded-full bg-gradient-to-r from-gray-200 to-gray-400 blur-3xl opacity-50"></div>

      <div className="relative mt-20 z-10 bg-gray-200/70 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add New Recipe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Title:</label>
            <input
              type="text"
              placeholder="Enter meal name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Cooking Time:</label>
            <input
              type="text"
              placeholder="Enter preparation time"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Ingredients:</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter ingredient"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="btn btn-primary"
              >
                +
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {ingredients.length ? (
                ingredients.map((e, i) => (
                  <span key={i} className="badge badge-outline">
                    {e}
                  </span>
                ))
              ) : (
                <span className="badge badge-outline">No ingredients yet</span>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Image URL:</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="btn btn-primary"
              >
                +
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {images.length ? (
                images.map((img, i) => (
                  <span key={i} className="badge badge-outline">
                    Image {i + 1}
                  </span>
                ))
              ) : (
                <span className="badge badge-outline">No images yet</span>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Method:</label>
            <textarea
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Enter method of meal"
            />
          </div>

          <div className="flex gap-3">
            {!isPending && (
              <>
                <button type="submit" className="btn btn-primary w-46">
                  Apply
                </button>
                <button
                  type="button"
                  onClick={handlePreview}
                  className="btn btn-success w-46 "
                >
                  Preview
                </button>
              </>
            )}
            {isPending && (
              <button disabled className="btn btn-primary w-full">
                Loading...
              </button>
            )}
          </div>
        </form>
      </div>

      {(localError || error || message) && (
        <div className="toast toast-end z-50 fixed top-15 right-5 animate-slideIn">
          <div
            className={`text-white px-4 py-3 rounded-lg shadow-lg ${
              localError || error ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {localError || error || message}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateRecipe;
