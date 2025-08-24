"use client";
import React from "react";
import { Heart, Navigation, MapPin, MessageCircle, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function Map() {
  const dots = Array.from({ length: 28 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() > 0.7 ? 6 : 3,
    opacity: Math.random() * 0.5 + 0.15,
  }));

  const Button = ({ children, icon: Icon, onClick, className = "" }) => (
    <motion.button
      whileHover={{ y: -1, boxShadow: "0 8px 28px rgba(0,0,0,0.18)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold tracking-wide text-white shadow-lg backdrop-blur-md transition ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      <span>{children}</span>
    </motion.button>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden ">
      {/* soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_60%)]" />

      {/* floating sparkles */}
      <div className="pointer-events-none absolute inset-0">
        {dots.map((d) => (
          <span
            key={d.id}
            style={{ top: d.top, left: d.left, width: d.size, height: d.size, opacity: d.opacity }}
            className="absolute rounded-full bg-white"
          />
        ))}
      </div>

      {/* top glass nav */}
      <div className="mx-auto mt-8 w-[92%] max-w-6xl">
        <div className="flex items-center justify-between rounded-3xl border border-white/20 bg-white/10 p-3 pl-4 shadow-[0_12px_48px_rgba(0,0,0,0.15)] backdrop-blur-xl">
          {/* left buttons */}
          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-br from-white/30 to-white/20 text-slate-800 hover:from-white/40 hover:to-white/30">
              Explore Map
            </Button>
            <Button className="bg-gradient-to-br from-white/30 to-white/20 text-slate-800 hover:from-white/40 hover:to-white/30">
              Go to Wizgram
            </Button>
          </div>

          {/* right buttons */}
          <div className="flex items-center gap-3 pr-2">
            <button className="p-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-lg shadow-md">
              <Music className="w-5 h-5 text-gray-700" />
            </button>
             <button className="rounded-full bg-blue-10 shadow-md ">
    <img src="/src/assets/profile.png" alt="profile" className=" h-full w-full object-cover" />
  </button>
          </div>
        </div>
      </div>

      {/* center bigger map card */}
      <div className="mx-auto mt-10 w-[72%] max-w-5xl">
        <div className="relative h-[530px] rounded-[28px] bg-white shadow-[0_30px_120px_rgba(0,0,0,0.25)]">
          {/* subtle grid overlay only (no markers) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[28px] opacity-40 
            [background-image:linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
            [background-size:28px_28px]"
          />
          {/* intentionally empty for map */}
        </div>
      </div>

      {/* bottom action bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex w-full justify-center">
        <div className="pointer-events-auto flex items-center gap-6 rounded-3xl border border-white/20 bg-white/15 px-4 py-3 shadow-[0_12px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <Button icon={Navigation} className="bg-violet-500/80 hover:bg-violet-500/90">
            Locate Me
          </Button>
          <Button icon={MapPin} className="bg-violet-500/80 hover:bg-violet-500/90">
            Select Location
          </Button>
        </div>
      </div>

      {/* chat bubble */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 grid h-14 w-14 place-items-center rounded-2xl border border-white/30 bg-violet-500 text-white shadow-[0_18px_50px_rgba(99,102,241,0.65)]"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
