import React, { useState } from "react";
// You'll need to have this image file in the same directory as your component.
import backgroundImage from "../assets/new post.png"; 

export default function NewPost() {
  const [text, setText] = useState(
    ""
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

  const handleImageUpload = (event) => {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Append the base64-encoded image data as a Markdown image
        setText((prev) => prev + `\n![](data:${file.type};base64,${reader.result.split(',')[1]})`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="font-bold text-4xl mb-2 text-white">New POST</h1>
        <p className="text-sm opacity-80 text-white">
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
          <label className="p-2 rounded bg-pink-200 hover:bg-pink-300 cursor-pointer">
            🖼
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Paper area */}
        <div className="relative h-96">
          {/* Preview overlay */}
          <div
            className={`absolute inset-0 overflow-auto whitespace-pre-wrap p-4 pointer-events-none ${color} ${fontSize} ${
              isBold ? "font-bold" : "font-medium"
            } ${isItalic ? "italic" : ""} leading-relaxed`}
            style={{ lineHeight: '1.5' }}
          >
            {text.split("\n").map((line, idx) => {
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
             caret-pink-500 p-4 outline-none selection:bg-pink-200
             ${color} ${fontSize} ${isBold ? "font-bold" : "font-medium"} ${
              isItalic ? "italic" : ""
            } leading-relaxed`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck="true"
            aria-label="Post text"
            style={{ lineHeight: '2' }}
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