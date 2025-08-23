import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import musicIcon from "../assets/music.png";
import profileAvatar from "../assets/girl.png";
import chatbkg from "../assets/profile_bkg.png";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { whisper } = location.state || {};

  const [comments, setComments] = useState([
    { id: 1, user: "crazypanda_11", text: "nicee pretty! can we talk in private chat?", likes: 4 },
    { id: 2, user: "kittycat12", text: "woww awesome post!", likes: 2 },
    { id: 3, user: "cake_lover5", text: "amazing work!", likes: 7 },
    { id: 4, user: "pookie11", text: "keep going!", likes: 1 },
    { id: 5, user: "lovepizza19", text: "this is great!", likes: 5 },
  ]);

  const toggleLike = (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
              liked: !c.liked,
            }
          : c
      )
    );
  };

  const handleClick = () => navigate("/profile");
  const handleClickBot = () => navigate("/chatbot");
  const handleExploreClick = () => navigate("/explore");

  const PostCard = () => {
    if (!whisper) {
      return (
        <div className="w-full bg-white/80 rounded-2xl p-4 shadow-md text-center text-gray-700">
          No post selected.
        </div>
      );
    }
    return (
      <div className="w-full bg-white/80 rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={whisper.users.profilepic}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <div className="font-semibold text-pink-800">
              {whisper.users.username}
            </div>
          </div>
        </div>
        <p className="mt-2 font-[cursive] text-sm sm:text-[16px] text-[#784552] leading-6">
          {whisper.content}
        </p>
        {whisper.Image_url && (
        <div className="mt-2 flex justify-center">
          <img
            src={whisper.Image_url}
            alt="Whisper"
            className="w-40 h-40 object-cover rounded-lg shadow"
          />
        </div>
      )}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center bg-fixed m-0"
      style={{ backgroundImage: `url(${chatbkg})` }}
    >
      {/* Main Content Wrapper for Responsiveness */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Sticky header */}
        <div className="sticky top-0 left-0 flex items-center z-10 w-full py-4 bg-transparent">
          {/* Profile */}
          <img
            src={profileAvatar}
            alt="Profile Avatar"
            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 cursor-pointer"
            onClick={handleClick}
          />
          {/* Right side icons */}
          <div className="ml-auto flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-[#5a4fcf]">
            <img
              src={musicIcon}
              alt="Music"
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 cursor-pointer"
              onClick={handleClickBot}
            />
            {/* Explore button */}
            <div
              className="w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 bg-[#D9D9D9] rounded-[40px] flex items-center justify-center cursor-pointer text-sm sm:text-base"
              onClick={handleExploreClick}
            >
              <div className="font-['Pacifico'] font-normal not-italic text-center">
                Explore Map
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Container with reduced max-width and margin */}
        <div className="max-w-xl mx-auto">
          {/* Dynamic Post Card - now with mt-8 to prevent overlap */}
          <div className="mt-8">
            <PostCard />
          </div>
          
          {/* Comments Section */}
          <div className="w-full mt-6 bg-gray-200/50 backdrop-blur-sm rounded-2xl p-4 shadow-md sm:pt-14">
            <h3 className="font-bold text-lg mb-3">Comments</h3>
            {/* Scrollable container with max height */}
            <div className="max-h-[30rem] overflow-y-auto pr-2 hide-scrollbar">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3 mb-4">
                  <img src={profileAvatar} alt="Comment" className="h-8 w-8 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-pink-800">
                      {c.user} <span className="ml-2 text-xs text-gray-500">6w</span>
                    </p>
                    <p className="text-sm text-gray-700 mt-1">{c.text}</p>
                    <span
                      className="text-xs text-gray-600 cursor-pointer"
                      onClick={() => toggleLike(c.id)}
                    >
                      {c.likes} likes {c.liked ? "❤️" : "🤍"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;