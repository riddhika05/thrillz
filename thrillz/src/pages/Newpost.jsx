import React, { useState } from "react";
// You'll need to have this image file in the correct path.
// For example, if 'assets' is a folder in your 'src' directory.
import backgroundImage from "../assets/new post.png";
import { supabase } from "../supabaseClient";
export default function NewPost() {
  const [text, setText] = useState("");
  // Removed uploadedImages state as image upload functionality is removed

  // formatting states
  const [color, setColor] = useState("#784552");
  const [fontSize, setFontSize] = useState("text-base");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const handleColorChange = (event) => {
    // event.target.value contains the new hex color string from the picker
    setColor(event.target.value);
  };

  const handleFontSize = () => {
    setFontSize(fontSize === "text-base" ? "text-xl" : "text-base");
  };

  const handleBold = () => setIsBold(!isBold);
  const handleItalic = () => setIsItalic(!isItalic);
  const handleClear = () => {
    setText("");
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="text-center mb-6">
        <h1 className="font-bold text-4xl mb-2 text-white">New Whisper</h1>
        <p className="text-sm opacity-80 text-white">
          location - Near Clock Tower, Jaipur, Rajasthan ,pin-332131
        </p>
      </header>

      <section className="w-full max-w-2xl bg-pink-100 rounded-lg border border-pink-200 overflow-hidden">
        <div className="flex gap-3 p-3 border-b border-pink-200 bg-pink-400">
          <div className="relative p-2 rounded bg-pink-400 hover:bg-pink-300">
            🎨
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <button
            onClick={handleFontSize}
            className="p-2 rounded bg-pink-400 hover:bg-pink-300 text-white"
          >
            Aa
          </button>
          <button
            onClick={handleBold}
            className={`p-2 rounded ${
              isBold ? "bg-pink-300" : "bg-pink-400"
            } text-white`}
          >
            B
          </button>
          <button
            onClick={handleItalic}
            className={`p-2 rounded ${
              isItalic ? "bg-pink-300" : "bg-pink-400"
            } text-white`}
          >
            I
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded bg-pink-400 hover:bg-pink-300 text-white"
          >
            ⌫
          </button>
        </div>

        <div className="relative h-96">
          <div
  className={`absolute inset-0 overflow-auto whitespace-pre-wrap p-4 pointer-events-none ${fontSize} ${
    isBold ? "font-bold" : "font-medium"
  } ${isItalic ? "italic" : ""} leading-relaxed`}
  style={{ color: color, lineHeight: "1.5" }}
>
  {text.split("\n").map((line, idx) => (
    <p key={idx} className="my-1">
      {line}
    </p>
  ))}
</div>

<textarea
  className={`absolute inset-0 w-full h-full resize-none caret-pink-500 p-4 outline-none selection:bg-pink-200 bg-white font-[cursive] text-sm ${fontSize} leading-6 ${
    isBold ? "font-bold" : "font-medium"
  } ${isItalic ? "italic" : ""}`}
  value={text}
  onChange={(e) => setText(e.target.value)}
  spellCheck="true"
  aria-label="Post text"
  style={{ color: color, lineHeight: "1.5" }}
/>
          
          
        </div>
      </section>

      <div className="mt-6">
        <button
          className="px-6 py-2 rounded-full bg-pink-400 text-white font-semibold
          transition-all duration-200 hover:shadow-lg active:scale-95"
        >
          UPLOAD
        </button>
      </div>
    </div>
  );
}
