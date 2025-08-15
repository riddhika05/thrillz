import React from "react";
import heartIcon from "../assets/heart.png";
import commentIcon from "../assets/comment.png";
import shareIcon from "../assets/share.png";
import uploadIcon from "../assets/upload.png";
const Whisper = ({ whisper }) => {
  const user = whisper.users; // Comes from join

  return (
    <>
    <div className="relative w-[400px] mx-auto rounded-3xl shadow-lg bg-pink-100 py-6 px-8 mb-20">
      {/* Profile Bar */}
      <div className="flex items-center gap-3 pb-2">
        {user && (
          <>
            <img
              src={user.profilepic}
              alt={user.username}
              className="w-10 h-10 rounded-full border-2 border-pink-300"
            />
            <div className="flex flex-col">
              <span className="text-pink-800 font-semibold text-sm">{user.username}</span>
              <span className="text-pink-500 text-xs">{user.gmail}</span>
            </div>
          </>
        )}
      </div>

      {/* Whisper Content */}
      <div className="mt-2 font-[cursive] text-[16px] text-[#784552] leading-6">
        {whisper.content}
      </div>

      {/* Icon bar - optional */}
       <div className="absolute left-8  flex gap-8">
        <button className="text-pink-400 text-lg hover:scale-110 transition-transform">{/* ♥️ */}♥️</button>
        <button className="text-pink-400 text-lg hover:scale-110 transition-transform">{/* 💬 */}💬</button>
        <button className="text-pink-400 text-lg hover:scale-110 transition-transform">{/* 🔗 */}🔗</button>
        <button className="text-pink-400 text-lg hover:scale-110 transition-transform">{/* ⬇️ */}⬇️</button>
      </div>
    </div>
      </>
  );
};

export default Whisper;
