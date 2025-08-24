"use client";
import React, { useState, useEffect } from "react";
import { Heart, Navigation, MapPin, MessageCircle, Music } from "lucide-react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Map() {
  const [position, setPosition] = useState([51.505, -0.09]); // default: London
  const [loaded, setLoaded] = useState(false);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoaded(true);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLoaded(true); // still render with default
        }
      );
    } else {
      setLoaded(true);
    }
  }, []);

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

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/post");
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/new post.png')" }}
    >
      <div className="absolute top-4 left-4 z-20" onClick={handleClick}>
        <FaArrowLeft className="text-pink-300 text-3xl cursor-pointer" />
      </div>

      {/* floating sparkles */}
      <div className="pointer-events-none absolute inset-0">
        {dots.map((d) => (
          <span
            key={d.id}
            style={{
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
            }}
            className="absolute rounded-full bg-white"
          />
        ))}
      </div>

      {/* top glass nav */}
      <div className="mx-auto mt-8 w-[92%] max-w-6xl">
        <div className="flex items-center justify-between rounded-3xl border border-white/20 bg-white/10 p-3 pl-4 shadow-[0_12px_48px_rgba(0,0,0,0.15)] backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-br from-white/30 to-white/20 text-slate-800">
              Explore Map
            </Button>
            <Button className="bg-gradient-to-br from-white/30 to-white/20 text-slate-800">
              Go to Wizgram
            </Button>
          </div>
          <div className="flex items-center gap-3 pr-2">
            <button className="p-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-lg shadow-md">
              <Music className="w-5 h-5 text-gray-700" />
            </button>
            <button className="rounded-full bg-blue-10 shadow-md ">
              <img
                src="/src/assets/profile.png"
                alt="profile"
                className="h-full w-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>

      {/* center bigger map card */}
      <div className="mx-auto mt-10 w-[72%] max-w-5xl">
        <div className="relative h-[530px] rounded-[28px] shadow-[0_30px_120px_rgba(0,0,0,0.25)] overflow-hidden">
          {loaded && (
            <MapContainer
              center={position}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
              className="rounded-[28px]"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={18}
              />
              <Marker position={position}>
                <Popup>You are here 📍</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>

      {/* bottom action bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex w-full justify-center">
        <div className="pointer-events-auto flex items-center gap-6 rounded-3xl border border-white/20 bg-white/15 px-4 py-3 shadow-[0_12px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <Button
            icon={Navigation}
            className="bg-violet-500/80 hover:bg-violet-500/90"
          >
            Locate Me
          </Button>
          <Button
            icon={MapPin}
            className="bg-violet-500/80 hover:bg-violet-500/90"
          >
            Select Location
          </Button>
        </div>
      </div>
    </div>
  );
}
