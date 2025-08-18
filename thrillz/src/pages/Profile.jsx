import React from 'react';
import myImage from "../assets/girl.png";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import "./Profile.css";
import profileBkg from "../assets/profile_bkg.png";


const Profile = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${profileBkg})` }}
    >
      <div className="flex justify-between p-4 md:p-6 lg:p-8">
        <FaArrowLeft className="text-pink-300 text-3xl cursor-pointer" />
        <FaShareAlt className="text-pink-300 text-3xl cursor-pointer" />
      </div>

      <div className="flex flex-col items-center gap-5 mt-5">
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-pink-300">
          <img src={myImage} alt="Profile" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col items-center">
            <span className="font-sans text-2xl md:text-3xl lg:text-4xl font-bold  text-white">2k</span>
            <span className="font-sans text-sm md:text-base lg:text-lg text-white ">points</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans text-2xl md:text-3xl lg:text-4xl font-bold  text-white">2k</span>
            <span className="font-sans text-sm md:text-base lg:text-lg text-white ">likes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans text-2xl md:text-3xl lg:text-4xl font-bold  text-white">4</span>
            <span className="font-sans text-sm md:text-base lg:text-lg text-white">whispers</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <button className="bg-pink-300 text-white font-['Pacifico'] rounded-full px-6 py-2 text-lg md:text-xl lg:text-2xl cursor-pointer">
          Edit Profile
        </button>
      </div>

      {/* Recently Viewed */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mt-6 md:mt-8  text-white">Whispers</h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-5 lg:gap-6 mt-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-40 h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 bg-gray-300 rounded-2xl flex-shrink-0"></div>
        ))}
      </div>
    </div>
    
  );
};

export default Profile;