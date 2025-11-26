import React from "react";

const GlobalStyles = () => (
  <style>{`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }
    .animate-scaleIn {
      animation: scaleIn 0.3s ease-out forwards;
    }

    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
  `}</style>
);

export default GlobalStyles;
