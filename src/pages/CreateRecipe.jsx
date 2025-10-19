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
    <div
      className="min-h-screen flex items-center justify-center 
      bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1470&q=80')] 
      bg-cover bg-center bg-no-repeat relative"
    >
      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className=" mt-20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/40">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-wide">
          🍳 Add New Recipe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter meal name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg text-white border border-gray-300 px-4 py-2 focus:ring-2  outline-none"
            />
          </div>

          {/* Cook time */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Cooking Time
            </label>
            <input
              type="text"
              placeholder="Enter preparation time"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 text-white outline-none"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Ingredients
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter ingredient"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="flex-1 text-white rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 outline-none"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                +
              </button>
            </div>

            {/* Ingredient list */}
            <div className="mt-3 flex flex-wrap gap-2">
              {ingredients.length ? (
                ingredients.map((e, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                  >
                    {e}
                    <button
                      type="button"
                      onClick={() =>
                        setIngredients(
                          ingredients.filter((_, index) => index !== i)
                        )
                      }
                      className="text-red-500 hover:text-red-700 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm italic">
                  No ingredients yet
                </span>
              )}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Image URLs
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 text-white outline-none"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                +
              </button>
            </div>

            {/* Image list */}
            <div className="mt-3 flex flex-wrap gap-2">
              {images.length ? (
                images.map((img, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-yellow-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                  >
                    Image {i + 1}
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, index) => index !== i))
                      }
                      className="text-red-500 hover:text-red-700 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm italic">
                  No images yet
                </span>
              )}
            </div>
          </div>

          {/* Method */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Method
            </label>
            <textarea
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="Describe how to cook the meal..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 text-white outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {!isPending ? (
              <>
                <button
                  type="submit"
                  className="w-1/2 cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={handlePreview}
                  className="w-1/2 cursor-pointer bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Preview
                </button>
              </>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 text-white py-2 rounded-lg"
              >
                Loading...
              </button>
            )}
          </div>
        </form>
      </div>

      {(localError || error || message) && (
        <div className="toast toast-end z-50 fixed top-10 right-5 animate-slideIn">
          <div
            className={`text-white px-5 py-3 rounded-lg shadow-lg ${
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
