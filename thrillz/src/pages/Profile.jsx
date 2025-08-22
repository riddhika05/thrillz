import React, { useState, useEffect } from 'react';
import myImage from "../assets/girl.png";
import { supabase } from "../supabaseClient";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import profileBkg from "../assets/profile_bkg.png";
import heartIcon from "../assets/heart.png";
import commentIcon from "../assets/comment.png";
import shareIcon from "../assets/share.png";
import uploadIcon from "../assets/upload.png";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [whispers, setWhispers] = useState([]);
  const [error, setError] = useState(null);
  const [profanityFilter, setProfanityFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => navigate('/post');
  const handleEdit = () => navigate('/edit-profile');

  // ✅ Function to check profanity using ZylaLabs API
  async function checkProfanity(text) {
    try {
      const response = await fetch("https://zylalabs-profanity-api-endpoint.com/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY" // replace with real key
        },
        body: JSON.stringify({ text })
      });

      const result = await response.json();
      // assume API returns: { profanity: true/false }
      return result.profanity === true;
    } catch (err) {
      console.error("Profanity API error:", err);
      return false; // fallback = treat as clean
    }
  }

  // ✅ Fetch whispers with/without profanity filter
  useEffect(() => {
    async function fetchWhispers() {
      setLoading(true);
      const { data, error } = await supabase
        .from('Whispers')
        .select('*')
        .eq('user_id', 2);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      let filteredData = data;

      if (profanityFilter) {
        const cleanData = [];
        for (const whisper of data) {
          const hasProfanity = await checkProfanity(whisper.content);
          if (!hasProfanity) {
            cleanData.push(whisper);
          }
        }
        filteredData = cleanData;
      }

      setWhispers(filteredData);
      setLoading(false);
    }

    fetchWhispers();
  }, [profanityFilter]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${profileBkg})` }}
    >
      {/* Top Bar */}
      <div className="flex justify-between p-4 md:p-6 lg:p-8">
        <FaArrowLeft className="text-pink-300 text-3xl cursor-pointer" onClick={handleContinue} />
        <FaShareAlt className="text-pink-300 text-3xl cursor-pointer" />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center gap-5 mt-5">
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-pink-300">
          <img src={myImage} alt="Profile" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">2k</span>
            <span className="text-sm md:text-base lg:text-lg text-white">points</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">2k</span>
            <span className="text-sm md:text-base lg:text-lg text-white">likes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">4</span>
            <span className="text-sm md:text-base lg:text-lg text-white">whispers</span>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-center mt-5">
        <button
          className="bg-pink-300 text-white font-['Pacifico'] rounded-full px-6 py-2 text-lg md:text-xl lg:text-2xl cursor-pointer"
          onClick={handleEdit}
        >
          Edit Profile
        </button>
      </div>

      {/* Profanity Toggle */}
      <div className="flex justify-center mt-5">
        <button
          className={`px-6 py-2 rounded-full text-lg md:text-xl lg:text-2xl cursor-pointer font-['Pacifico'] ${
            profanityFilter ? "bg-red-400 text-white" : "bg-green-400 text-white"
          }`}
          onClick={() => setProfanityFilter(!profanityFilter)}
        >
          {profanityFilter ? "Profanity: ON" : "Profanity: OFF"}
        </button>
      </div>

      {/* Whispers Section */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mt-6 md:mt-8 text-white font-bold">
        Whispers
      </h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-1 lg:gap-4 mt-4">
        {error && <div className="text-red-500">{error}</div>}
        {loading && <div className="text-white">Checking whispers...</div>}
        {!loading && whispers.length === 0 && !error && (
          <div className="text-white">No whispers found</div>
        )}

        {whispers.map((whisper) => (
          <div
            key={whisper.id}
            className="relative w-11/12 max-w-lg mx-auto rounded-3xl shadow-lg bg-pink-100 py-4 px-6 sm:py-6 sm:px-8 mb-3 sm:mb-4"
          >
            <div className="mt-2 font-[cursive] text-sm sm:text-[16px] text-[#784552] leading-6">
              {whisper.content}
            </div>
            <div className="flex gap-4 sm:gap-6 md:gap-8 bg-pink-400 rounded-2xl px-4 py-2 sm:px-6 sm:py-3 mt-4 sm:mt-6 justify-center shadow-lg">
              {[heartIcon, commentIcon, shareIcon, uploadIcon].map((icon, idx) => (
                <button key={idx} className="hover:scale-110 transition-transform">
                  <img src={icon} alt="Icon" className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
