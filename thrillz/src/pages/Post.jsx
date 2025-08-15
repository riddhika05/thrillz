import React from "react";
import musicIcon from "../assets/music.png";
import botIcon from "../assets/bot.png";
import profileAvatar from "../assets/profile.png";
import Whispers from "./Whispers";
import { useNavigate } from "react-router-dom";
import postBackground from "../assets/post.png";
function Post() {
  return (
    <div
      className="w-screen bg-cover bg-no-repeat bg-center bg-fixed min-h-screen m-0"
      style={{ backgroundImage: `url(${postBackground})` }}
    >
      <Header />
    </div>
  );
}

function Header() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/profile");
  }

  function handleClickBot() {
    navigate("/chatbot");
  }

  return (
    <>
      <div className="sticky top-0 left-0 p-8 flex items-center z-10">
        <img
          src={profileAvatar}
          alt="Profile Avatar"
          className="h-16 w-16 md:h-20 md:w-20 cursor-pointer"
          onClick={handleClick}
        />

        <div className="ml-auto flex items-center gap-20 text-[#5a4fcf]">
          <img src={musicIcon} alt="Music" className="h-28 md:h-32" />
          <Explore />
        </div>
      </div>

      <div className="w-full sm:w-3/4 lg:w-1/2 mx-auto mt-12 max-h-[70vh] overflow-y-auto hide-scrollbar">
        <Whispers />
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <img
          src={botIcon}
          alt="Bot"
          className="h-16 w-16 md:h-20 md:w-20 cursor-pointer"
          onClick={handleClickBot}
        />
      </div>
    </>
  );
}

function Explore() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/explore");
  }

  return (
    <div
      className="w-40 h-20 bg-[#D9D9D9] rounded-[40px] flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="font-['Pacifico'] font-normal not-italic text-center">
        Explore Map
      </div>
    </div>
  );
}

export default Post;
