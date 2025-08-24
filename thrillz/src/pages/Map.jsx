import React, { useState, useEffect, useRef } from "react";
import { Navigation, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom whisper marker
const whisperIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Center updater
function MapUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [map, position]);
  return null;
}

// ✅ Marker with always-open popup + place name
function MyLocationMarker({ position, placeName }) {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [position]);

  return (
    <Marker position={position} ref={markerRef}>
      <Popup>
        📍 {placeName || "My Location"} <br />
        Lat: {position[0].toFixed(5)}, Lon: {position[1].toFixed(5)}
      </Popup>
    </Marker>
  );
}

// Dummy whispers
const generateWhispers = (lat, lon) => {
  const whispers = [];
  for (let i = 0; i < 3; i++) {
    const randomLat = lat + (Math.random() - 0.5) * 0.005;
    const randomLon = lon + (Math.random() - 0.5) * 0.005;
    whispers.push({
      id: i,
      lat: randomLat,
      lon: randomLon,
      content: `A whisper from a nearby spot! #${i + 1}`,
    });
  }
  return whispers;
};

export default function Map() {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [placeName, setPlaceName] = useState("Loading...");
  const [loaded, setLoaded] = useState(false);
  const [relevantPlaces, setRelevantPlaces] = useState([]);
  const [whispers, setWhispers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPlaceName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      setPlaceName(response.data.display_name);
    } catch (err) {
      console.error("Error fetching place name:", err);
      setPlaceName("Unknown Location");
    }
  };

  const fetchAndSetPlaces = async (lat, lon) => {
    try {
      const query = `
        [out:json];
        ( node["amenity"="cafe"](around:500,${lat},${lon}); );
        out center;
      `;
      const response = await axios.post(
        "https://overpass-api.de/api/interpreter",
        query,
        { headers: { "Content-Type": "text/plain" } }
      );
      const places = response.data.elements.filter(
        (el) => el.tags && el.tags.name
      );
      setRelevantPlaces(places);
      setWhispers(generateWhispers(lat, lon));
    } catch (error) {
      console.error("Error fetching places or whispers:", error);
    }
  };

  const locateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPosition);
          fetchPlaceName(newPosition[0], newPosition[1]); // fetch actual place
          fetchAndSetPlaces(newPosition[0], newPosition[1]);
          setLoaded(true);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLoaded(true);
        }
      );
    } else {
      setLoaded(true);
    }
  };

  // 🔍 Search for a place by name
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&limit=1`
      );

      if (response.data.length > 0) {
        const place = response.data[0];
        const newPosition = [parseFloat(place.lat), parseFloat(place.lon)];
        setPosition(newPosition);
        setPlaceName(place.display_name);
        fetchAndSetPlaces(newPosition[0], newPosition[1]);
        setLoaded(true);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    locateMe();
  }, []);

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

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/new post.png')" }}
    >
      <div className="absolute top-4 left-4 z-20" onClick={() => navigate("/post")}>
        <FaArrowLeft className="text-pink-300 text-3xl cursor-pointer" />
      </div>

      {/* 🔍 Search bar */}
      <form
        onSubmit={handleSearch}
        className="mx-auto mt-6 w-[90%] max-w-2xl flex items-center rounded-full border border-gray-300 bg-white shadow-md px-4 py-2"
      >
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a place..."
          className="flex-1 outline-none text-gray-700"
        />
        <button
          type="submit"
          className="ml-3 rounded-full bg-violet-500 text-white px-4 py-2"
        >
          Go
        </button>
      </form>

      {/* Map */}
      <div className="mx-auto mt-6 w-[90%] max-w-5xl">
        <div className="relative h-[530px] rounded-[28px] shadow-lg overflow-hidden">
          {loaded && (
            <MapContainer
              center={position}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
              className="rounded-[28px]"
            >
              <MapUpdater position={position} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={18}
              />

              {/* ✅ User Location Marker with Place Name */}
              <MyLocationMarker position={position} placeName={placeName} />

              {/* Cafés */}
              {relevantPlaces.map((place) => (
                <Marker key={place.id} position={[place.lat, place.lon]}>
                  <Popup>{place.tags.name}</Popup>
                </Marker>
              ))}

              {/* Whispers */}
              {whispers.map((whisper) => (
                <Marker
                  key={whisper.id}
                  position={[whisper.lat, whisper.lon]}
                  icon={whisperIcon}
                >
                  <Popup>{whisper.content}</Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex w-full justify-center">
        <div className="pointer-events-auto flex items-center gap-6 rounded-3xl border border-white/20 bg-white/15 px-4 py-3 shadow-xl backdrop-blur-xl">
          <Button
            icon={Navigation}
            onClick={locateMe}
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
