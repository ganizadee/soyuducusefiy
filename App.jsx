import React, { useState } from "react";
import {
  ChefHat,
  Plus,
  Search,
  Share2,
  Sparkles,
  Utensils,
  Loader2,
  Check,
  X,
} from "lucide-react";

import GlobalStyles from "./styles/GlobalStyles";
import { RECIPE_DATABASE, COMMON_INGREDIENTS } from "./data/recipes";
import { callGemini } from "./lib/callGemini";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

export default function App() {
  const [myIngredients, setMyIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("match");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState("");

  const [notification, setNotification] = useState("");

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const addIngredient = (ing) => {
    const formattedIng = ing.toLowerCase().trim();
    if (formattedIng && !myIngredients.includes(formattedIng)) {
      setMyIngredients([...myIngredients, formattedIng]);
    }
    setInputValue("");
  };

  const removeIngredient = (ing) => {
    setMyIngredients(myIngredients.filter((i) => i !== ing));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addIngredient(inputValue);
    }
  };

  const handleShareApp = async () => {
    const shareText =
      "Soyuducu Şefi - Bu gün nə bişirim dərdi yoxdur! 🍳\nEvdəki ərzaqları yaz, sənə uyğun resepti tap.";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Soyuducu Şefi",
          text: shareText,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      showNotification("Tətbiq haqqında məlumat kopyalandı! 📋");
    }
  };

  const generateAiRecipe = async () => {
    if (myIngredients.length === 0) {
      setAiError("Zəhmət olmasa ən azı bir ərzaq seçin.");
      setTimeout(() => setAiError(""), 3000);
      return;
    }

    setIsAiGenerating(true);
    setAiError("");

    const prompt = `
      Mən bir "Soyuducu Şefi" tətbiqiyəm. İstifadəçinin əlində bu ərzaqlar var: ${myIngredients.join(
        ", "
      )}.
      Bu ərzaqlardan istifadə edərək (və ya evdə tapılması asan olan əlavələrlə) yaradıcı və dadlı bir yemək resepti fikirləş.

      Cavabı YALNIZ aşağıdakı JSON formatında ver, başqa heç bir mətn yazma. JSON valid olmalıdır.

      {
        "id": "ai-${Date.now()}",
        "name": "Yeməyin Adı",
        "category": "AI Şefin Tövsiyəsi ✨",
        "ingredients": ["ərzaq 1", "ərzaq 2"],
        "instructions": "1. Addım 1\\n2. Addım 2...",
        "difficulty": "Asan/Orta/Çətin",
        "time": "XX dəq",
        "image": "🥘",
        "matchPercentage": 100,
        "isAiGenerated": true,
        "matchingIngredients": ${JSON.stringify(myIngredients)},
        "missingIngredients": []
      }
    `;

    try {
      const result = await callGemini(prompt);
      if (result) {
        const cleanJson = result.replace(/```json|```/g, "").trim();
        const recipe = JSON.parse(cleanJson);
        setSelectedRecipe(recipe);
      } else {
        throw new Error("Resept alına bilmədi");
      }
    } catch (e) {
      console.error(e);
      setAiError("AI Şef hal-hazırda məşğuldur, bir az sonra yenidən yoxlayın.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const analyzeRecipes = () => {
    return RECIPE_DATABASE.map((recipe) => {
      const matchingIngredients = recipe.ingredients.filter((rIng) =>
        myIngredients.some(
          (myIng) => rIng.includes(myIng) || myIng.includes(rIng)
        )
      );

      const missingIngredients = recipe.ingredients.filter(
        (rIng) =>
          !myIngredients.some(
            (myIng) => rIng.includes(myIng) || myIng.includes(rIng)
          )
      );

      const matchPercentage = Math.round(
        (matchingIngredients.length / recipe.ingredients.length) * 100
      );

      return {
        ...recipe,
        matchPercentage,
        matchingIngredients,
        missingIngredients,
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const results = analyzeRecipes();
  const displayResults =
    activeTab === "match"
      ? results.filter((r) => r.matchPercentage > 0)
      : results;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <GlobalStyles />

      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-xl z-50 animate-fadeIn flex items-center gap-2">
          <Check className="w-4 h-4 text-green-400" />
          {notification}
        </div>
      )}

      <header className="bg-emerald-600 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-full">
              <ChefHat className="text-emerald-600 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Soyuducu Şefi{" "}
                <span className="text-xs bg-emerald-500 px-2 py-0.5 rounded-full border border-emerald-400">
                  AI Powered ✨
                </span>
              </h1>
              <p className="text-emerald-100 text-sm hidden sm:block">
                Bu gün nə bişirim dərdi yoxdur!
              </p>
            </div>
          </div>
          <button
            onClick={handleShareApp}
            className="bg-emerald-700 hover:bg-emerald-800 p-2.5 rounded-full transition-colors"
            title="Tətbiqi Paylaş"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
        {/* Ingredient input */}
        <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <label className="block text-gray-700 font-medium mb-3">
            Soyuducuda nələr var?
          </label>

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Məsələn: Yumurta, Pomidor..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={() => addIngredient(inputValue)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Əlavə et</span>
            </button>
          </div>

          <div className="mb-6">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">
              Tez seçim:
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_INGREDIENTS.map((ing) => (
                <button
                  key={ing}
                  onClick={() => addIngredient(ing)}
                  disabled={myIngredients.includes(ing.toLowerCase())}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                    myIngredients.includes(ing.toLowerCase())
                      ? "bg-emerald-100 border-emerald-200 text-emerald-700 opacity-50 cursor-default"
                      : "bg-gray-50 border-gray-200 hover:border-emerald-400 hover:text-emerald-600"
                  }`}
                >
                  {ing}
                </button>
              ))}
            </div>
          </div>

          {myIngredients.length > 0 && (
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex justify-between items-start">
              <div className="flex flex-wrap gap-2">
                {myIngredients.map((ing, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-white text-emerald-800 px-3 py-1.5 rounded-full shadow-sm text-sm border border-emerald-100 font-medium animate-fadeIn"
                  >
                    {ing}
                    <button
                      onClick={() => removeIngredient(ing)}
                      className="hover:text-red-500 ml-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                Axtardığınız resepti tapa bilmədiniz?
              </h2>
              <p className="text-indigo-100 text-sm max-w-md">
                AI Şef sizin seçdiyiniz ərzaqlara (və ya evdə ola biləcək
                əlavələrə) uyğun tamamilə unikal resept hazırlaya bilər.
              </p>
            </div>
            <button
              onClick={generateAiRecipe}
              disabled={isAiGenerating}
              className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAiGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Düşünürəm...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> AI Resept Yarat
                </>
              )}
            </button>
          </div>
          {aiError && (
            <div className="mt-4 bg-red-500/20 border border-red-200/30 text-white p-3 rounded-lg text-sm animate-fadeIn">
              {aiError}
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-emerald-600" />
              Təklif Edilən Reseptlər
            </h2>

            <div className="flex bg-gray-200 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("match")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "match"
                    ? "bg-white shadow-sm text-emerald-700"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Mümkün olanlar
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-white shadow-sm text-emerald-700"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Bütün Menyu
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayResults.length > 0 ? (
              displayResults.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onViewRecipe={() => setSelectedRecipe(recipe)}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white rounded-xl border-2 border-dashed border-gray-200">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  Hələ ki, standart resept tapılmadı
                </h3>
                <p className="text-gray-500 mt-1">
                  Siyahını artırın və ya yuxarıdakı{" "}
                  <span className="font-bold text-indigo-600">AI Şef</span>{" "}
                  düyməsini yoxlayın!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          showNotification={showNotification}
        />
      )}
    </div>
  );
}

