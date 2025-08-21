import React, { useState } from "react";

export default function NewPost() {
  const [text, setText] = useState(
    "heyy !!\nWelcome to wonderland\nmust try blueberry cheesecake present in vending\nmachine."
  );

  // formatting states
  const [color, setColor] = useState("text-pink-500");
  const [fontSize, setFontSize] = useState("text-base");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const handleColor = () => {
    setColor(color === "text-pink-500" ? "text-blue-500" : "text-pink-500");
  };

  const handleFontSize = () => {
    setFontSize(fontSize === "text-base" ? "text-xl" : "text-base");
  };

  const handleBold = () => setIsBold(!isBold);
  const handleItalic = () => setIsItalic(!isItalic);
  const handleClear = () => setText("");

  const handleImageInsert = () => {
    const url = prompt("Enter image URL:");
    if (url) setText((prev) => prev + `\n${url}`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 bg-gradient-to-b from-[#6c7fb6] via-[#8ea2d1] to-[#f8c7b3]">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="font-bold text-4xl mb-2">New POST</h1>
        <p className="text-sm opacity-80">
          location - Near Clock Tower, Jaipur, Rajasthan ,pin-332131
        </p>
      </header>

      {/* Note */}
      <section className="w-full max-w-2xl bg-pink-100 rounded-lg border border-pink-200 overflow-hidden">
        {/* Toolbar */}
        <div className="flex gap-3 p-3 border-b border-pink-200 bg-pink-50">
          <button
            onClick={handleColor}
            className="p-2 rounded bg-pink-200 hover:bg-pink-300"
          >
            🎨
          </button>
          <button
            onClick={handleFontSize}
            className="p-2 rounded bg-pink-200 hover:bg-pink-300"
          >
            Aa
          </button>
          <button
            onClick={handleBold}
            className={`p-2 rounded ${
              isBold ? "bg-pink-300" : "bg-pink-200"
            }`}
          >
            B
          </button>
          <button
            onClick={handleItalic}
            className={`p-2 rounded ${
              isItalic ? "bg-pink-300" : "bg-pink-200"
            }`}
          >
            I
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded bg-pink-200 hover:bg-pink-300"
          >
            ⌫
          </button>
          <button
            onClick={handleImageInsert}
            className="p-2 rounded bg-pink-200 hover:bg-pink-300"
          >
            🖼
          </button>
        </div>

        {/* Paper area */}
        <div className="relative h-96">
          {/* Preview overlay */}
          <div
            className={`absolute inset-0 overflow-auto whitespace-pre-wrap p-4 pointer-events-none ${color} ${fontSize} ${
              isBold ? "font-bold" : "font-medium"
            } ${isItalic ? "italic" : ""}`}
          >
            {text.split("\n").map((line, idx) => {
              // check markdown image
              const mdMatch = line.match(/!\[.*?\]\((.*?)\)/);
              if (mdMatch) {
                return (
                  <img
                    key={idx}
                    src={mdMatch[1]}
                    alt="inserted"
                    className="max-w-full my-2 rounded"
                  />
                );
              }

              // check plain image URL
             // check if it's a URL (any type, not just .jpg/.png)
if (line.trim().startsWith("http")) {
  return (
    <img
      key={idx}
      src={line.trim()}
      alt="inserted"
      className="max-w-full my-2 rounded"
      onError={(e) => {
        // if not a real image, just show the text fallback
        e.target.outerHTML = `<p class="my-1">${line}</p>`;
      }}
    />
  );
}

              return (
                <p key={idx} className="my-1">
                  {line}
                </p>
              );
            })}
          </div>

          {/* Editable textarea */}
          <textarea
            className={`absolute inset-0 w-full h-full resize-none 
             bg-[repeating-linear-gradient(white,white_31px,#ddd_31px,#ddd_32px)]
             caret-pink-500 p-4 outline-none selection:bg-pink-200
             ${color} ${fontSize} ${isBold ? "font-bold" : "font-medium"} ${
              isItalic ? "italic" : ""
            }`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck="false"
            aria-label="Post text"
          />
        </div>
      </section>

      {/* Upload button with hover shadow */}
      <div className="mt-6">
        <button
          className="px-6 py-2 rounded-full bg-pink-200 text-gray-700 font-semibold
          transition-all duration-200 hover:shadow-lg active:scale-95"
        >
          UPLOAD
        </button>
      </div>
    </div>
  );
}
