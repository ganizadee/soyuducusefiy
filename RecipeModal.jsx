import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  ChefHat,
  Check,
  Clock,
  Gauge,
  Loader2,
  Share2,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";

function RecipeModal({ recipe, onClose, showNotification }) {
  const [aiTip, setAiTip] = useState("");
  const [isTipLoading, setIsTipLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const getAiTip = async () => {
    setIsTipLoading(true);
    setAiTip("");

    const apiKey = ""; // buraya da eyni qaydada açar verəcəksən

    const prompt = `
      Mənə "${recipe.name}" yeməyi haqqında qısa, faydalı bir mətbəx sirri və ya bu yeməyi daha dadlı etmək üçün bir tövsiyə ver.
      Azərbaycan dilində, səmimi və qısa olsun (maksimum 2 cümlə).
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (result) setAiTip(result);
    } catch (e) {
      setAiTip("Bağışlayın, məsləhət ala bilmədim.");
    } finally {
      setIsTipLoading(false);
    }
  };

  const handleShareRecipe = async () => {
    const text = `🍳 ${recipe.name}\n\n📝 Tərkibi: ${recipe.ingredients.join(
      ", "
    )}\n\n👩‍🍳 Hazırlanması:\n${
      recipe.instructions
    }\n\n"Soyuducu Şefi" tətbiqi ilə tapıldı.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.name,
          text,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      showNotification("Resept kopyalandı! Dostlarına göndər 😋");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
        <div
          className={`relative h-48 flex items-center justify-center text-6xl ${
            recipe.isAiGenerated ? "bg-indigo-100" : "bg-emerald-100"
          }`}
        >
          {recipe.image}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleShareRecipe}
              className="bg-white/50 hover:bg-white p-2 rounded-full transition-colors text-gray-700"
              title="Resepti Paylaş"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button
              onClick={onClose}
              className="bg-white/50 hover:bg-white p-2 rounded-full transition-colors text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
            <h2 className="text-3xl font-bold">{recipe.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {recipe.time}
              </span>
              <span className="flex items-center gap-1">
                <Gauge className="w-4 h-4" /> {recipe.difficulty}
              </span>
              <span>{recipe.category}</span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col gap-4">
            {!recipe.isAiGenerated && (
              <div
                className={`p-4 rounded-xl border ${
                  recipe.matchPercentage === 100
                    ? "bg-green-50 border-green-200"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-70">
                  Vəziyyət
                </div>
                <div className="text-lg font-medium">
                  {recipe.matchPercentage === 100 ? (
                    <span className="flex items-center gap-2 text-green-700">
                      <Check className="w-5 h-5" /> Hər şeyiniz var!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-orange-700">
                      <AlertCircle className="w-5 h-5" /> Bəzi ərzaqlar çatmır
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-indigo-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> AI Məsləhəti
                </h4>
                {!aiTip && !isTipLoading && (
                  <button
                    onClick={getAiTip}
                    className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    Məsləhət Al
                  </button>
                )}
              </div>

              {isTipLoading ? (
                <div className="flex items-center gap-2 text-indigo-500 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" /> Şef düşünür...
                </div>
              ) : aiTip ? (
                <p className="text-indigo-700 text-sm italic">"{aiTip}"</p>
              ) : (
                <p className="text-indigo-400 text-xs">
                  Bu yeməyi daha ləzzətli etmək üçün AI Şefdən sirr soruşun.
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-600" />
                Tərkibi
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, idx) => {
                  let isMissing = false;
                  if (!recipe.isAiGenerated && recipe.matchingIngredients) {
                    const hasIt = recipe.matchingIngredients.some(
                      (m) => ing.includes(m) || m.includes(ing)
                    );
                    isMissing = !hasIt;
                  }

                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-2 rounded hover:bg-gray-50"
                    >
                      <div
                        className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                          isMissing ? "bg-red-400" : "bg-emerald-500"
                        }`}
                      />
                      <span
                        className={
                          isMissing
                            ? "text-gray-500 line-through decoration-red-300"
                            : "text-gray-800 font-medium"
                        }
                      >
                        {ing}
                      </span>
                      {isMissing && (
                        <span className="text-xs text-red-500 font-medium ml-auto">
                          Yoxdur
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-emerald-600" />
                Hazırlanması
              </h3>
              <div className="space-y-4">
                {recipe.instructions.split("\n").map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 text-gray-700 text-sm leading-relaxed"
                  >
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
            >
              Bağla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;

