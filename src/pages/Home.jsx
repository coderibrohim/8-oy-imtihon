import React from "react";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

function Home() {
  const { data: recipes, loading } = useCollection("recipes");
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Bu retseptni o‘chirmoqchimisiz?")) {
      try {
        await deleteDoc(doc(db, "recipes", id));
        alert("Recipe muvaffaqiyatli o‘chirildi");
      } catch (error) {
        console.error("O‘chirishda xatolik:", error);
        alert("Xatolik yuz berdi");
      }
    }
  };

  if (!recipes.length)
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative"
        style={{
          backgroundImage: "url('mountain-sun-1148778056.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <p className="relative z-10 text-gray-300 text-lg font-semibold">
          Hozircha hech qanday retsept yo‘q
        </p>
      </div>
    );

  if (loading)
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('mountain-sun-1148778056.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <p className="relative z-10 text-3xl font-semibold text-gray-300 animate-pulse">
          Loading recipes...
        </p>
      </div>
    );


  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-20 px-6 relative"
      style={{
        backgroundImage: "url('mountain-sun-1148778056.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-14 bg-gradient-to-r from-gray-200 via-white to-gray-400 bg-clip-text text-transparent tracking-tight">
          Recipe Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipes.map((recipe) => (
            <div
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            
              key={recipe.id}
              className=" cursor-pointer rounded-2xl p-1 bg-gradient-to-br bg-transparent from-gray-800/40 to-gray-900/60 hover:from-gray-800/40 hover:to-gray-900/70 shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-300 overflow-hidden"
            >
              <div>
                {recipe.images && recipe.images[0] ? (
                  <img
                    src={recipe.images[0]}
                    alt={recipe.title}
                    className="w-full h-56 object-cover rounded-t-2xl opacity-90 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <div className="h-56 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-gray-500 text-sm">
                    No image
                  </div>
                )}

                <div className="p-5">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-3">
                    {recipe.cookTime} minutes
                  </p>
                  <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                    {recipe.method}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {recipe.ingredients?.map((ing, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-gray-800/60 text-gray-300 border border-gray-700"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute top-3 right-3 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    e.preventDefault(); 
                    handleDelete(recipe.id);
                  }}
                  className=" btn-xs text-white cursor-pointer transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-red-500 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute inset-0 border border-transparent hover:border-gray-700/60 rounded-2xl transition-all duration-500"></div>
            </div>
          ))}
        </div>

        <footer className="text-center mt-16 text-gray-500 text-sm tracking-wide">
          © {new Date().getFullYear()} Recipe UI
        </footer>
      </div>
    </div>
  );
}

export default Home;
