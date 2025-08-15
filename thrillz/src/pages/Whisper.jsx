"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heartIcon from "../assets/heart.png";
import commentIcon from "../assets/comment.png";
import shareIcon from "../assets/share.png";
import uploadIcon from "../assets/upload.png";

const Whisper = ({ whisper, containerRef }) => {
  const user = whisper.users;
  const ref = useRef(null);

  // Track scroll progress for this card
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "center center"], 
  });

  // Create smoother center zoom + fade
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="relative w-[400px] mx-auto rounded-3xl shadow-lg bg-pink-100 py-6 px-8 mb-20 transition-all duration-300"
      initial={{ scale: 0.85, opacity: 0.5 }}
  whileInView={{ scale: 1.1, opacity: 1 }}
  viewport={{ once: false, amount: 0.5 }}
  transition={{ type: "spring", bounce: 0.4 }}
    >
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
              <span className="text-pink-800 font-semibold text-sm">
                {user.username}
              </span>
              <span className="text-pink-500 text-xs">{user.gmail}</span>
            </div>
          </>
        )}
      </div>

      {/* Whisper Content */}
      <div className="mt-2 font-[cursive] text-[16px] text-[#784552] leading-6">
        {whisper.content}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-8 bg-pink-400 rounded-2xl px-6 py-3 mt-6 justify-center shadow-lg">
        {[heartIcon, commentIcon, shareIcon, uploadIcon].map((icon, idx) => (
          <button
            key={idx}
            className="hover:scale-110 transition-transform"
          >
            <img src={icon} alt="Icon" className="w-6 h-6" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default Whisper;
