import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../assets/new post.png";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function NewPost() {
  const [text, setText] = useState("Write your Whisper!");
  const [color, setColor] = useState("#784552");
  const [fontSize, setFontSize] = useState("text-base");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [image, setImage] = useState(null); 
  const [file, setFile] = useState(null);  
  const fileInputRef = useRef();
  const textareaRef = useRef(null);

  const navigate = useNavigate();

  
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleContinue = () => {
    navigate("/post");
  };

  const handleColorChange = (event) => setColor(event.target.value);
  const handleFontSize = () =>
    setFontSize(fontSize === "text-base" ? "text-xl" : "text-base");
  const handleBold = () => setIsBold(!isBold);
  const handleItalic = () => setIsItalic(!isItalic);
  const handleClear = () => {
    setText("");
    setImage(null);
    setFile(null);
  };

  
  const handleUpload = async () => {
    try {
      let imageUrl = null;

      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("Post_images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

       
        const { data: urlData } = supabase.storage
          .from("Post_images")
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

   
      const { error: insertError } = await supabase.from("Whispers").insert([
        {
          content: text,
          user_id: 3, 
          Image_url: imageUrl,
        },
      ]);

      if (insertError) throw insertError;
      console.log(insertError)
     
      navigate("/post");
    } catch (err) {
      console.error("Error uploading whisper:", err.message);
      alert("Upload failed: " + err.message);
    }
  };

  
  useEffect(() => {
    if (textareaRef.current) {
      const end = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(end, end);
      textareaRef.current.focus();
    }
  }, [text]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full flex items-center mb-2">
        <FaArrowLeft
          className="text-pink-300 text-3xl cursor-pointer ml-0"
          onClick={handleContinue}
        />
      </div>
      <header className="text-center mb-6">
        <h1 className="font-bold text-4xl mb-2 text-white">New Whisper</h1>
        <p className="text-sm opacity-80 text-white font-bold">
          location - Near Clock Tower, Jaipur, Rajasthan ,pin-332131
        </p>
      </header>

      <section
        className={`w-full max-w-2xl bg-pink-200 border-t border-l border-r border-pink-200 overflow-hidden ${
          image ? "rounded-t-lg" : "rounded-lg"
        } h-30 sm:h-40 md:h-60`}
      >
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
          <div
            className="relative p-2 rounded bg-pink-400 hover:bg-pink-300 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
            title="Upload image"
          >
            🖼️
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              style={{ width: "100%", height: "100%" }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        <div className="relative h-70">
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
            ref={textareaRef}
          />
        </div>
      </section>

      {image && (
        <div className="flex justify-center mt-0 w-full bg-white max-w-2xl border-b border-l border-r border-pink-200 rounded-b-lg">
          <img
            src={image}
            alt="Uploaded"
            className="w-40 h-40 object-cover rounded-lg shadow mb-3"
          />
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={handleUpload}
          className="px-6 py-2 rounded-full bg-pink-400 text-white font-semibold
          transition-all duration-200 hover:shadow-lg active:scale-95"
        >
          UPLOAD
        </button>
      </div>
    </div>
  );
}
