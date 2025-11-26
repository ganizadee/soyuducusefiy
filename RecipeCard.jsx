import React from "react";
import {
  AlertCircle,
  ArrowRight,
  Clock,
  Gauge,
} from "lucide-react";

function RecipeCard({ recipe, onViewRecipe }) {
  const isHighMatch = recipe.matchPercentage >= 75;
  const isMediumMatch =
    recipe.matchPercentage >= 40 && recipe.matchPercentage < 75;
  const isAi = recipe.isAiGenerated;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full ${
        isAi ? "border-indigo-200 ring-2 ring-indigo-100" : "border-gray-100"
      }`}
    >
      <div
        className={`relative h-32 flex items-center justify-center text-4xl cursor-pointer ${
          isAi ? "bg-indigo-50" : "bg-emerald-50"
        }`}
        onClick={onViewRecipe}
      >
        {recipe.image}
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold text-white shadow-sm ${
            isAi
              ? "bg-indigo-500"
              : isHighMatch
              ? "bg-green-500"
              : isMediumMatch
              ? "bg-yellow-500"
              : "bg-gray-400"
          }`}
        >
          {isAi ? "✨ AI Özəl" : `${recipe.matchPercentage}% Uyğunluq`}
        </div>
        <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-600 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {recipe.time} • {recipe.difficulty}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div
          className={`mb-1 text-xs font-bold uppercase tracking-wide ${
            isAi ? "text-indigo-600" : "text-emerald-600"
          }`}
        >
          {recipe.category}
        </div>
        <h3
          className="text-lg font-bold text-gray-900 mb-3 leading-tight cursor-pointer hover:text-emerald-700"
          onClick={onViewRecipe}
        >
          {recipe.name}
        </h3>

        {!isAi &&
          recipe.missingIngredients &&
          recipe.missingIngredients.length > 0 &&
          recipe.matchPercentage > 0 && (
            <div className="mb-4 bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm">
              <div className="flex items-center gap-1.5 text-orange-700 font-semibold mb-1">
                <AlertCircle className="w-4 h-4" />
                Çatışmayanlar:
              </div>
              <div className="text-gray-600 leading-snug">
                {recipe.missingIngredients.join(", ")}
              </div>
            </div>
          )}

        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
          {recipe.instructions}
        </p>

        <button
          onClick={onViewRecipe}
          className={`w-full mt-auto py-2.5 rounded-lg text-sm font-medium border transition-colors flex items-center justify-center gap-2 group ${
            isAi
              ? "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200"
              : "bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 border-gray-200 hover:border-emerald-200"
          }`}
        >
          Tam Reseptə Bax
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;

