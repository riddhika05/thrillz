import React from "react";
import musicIcon from "../assets/music.png";
import profileAvatar from "../assets/girl.png";
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

  function handleAddPost() {
    navigate("/newpost");
  }


  return (
    <>
      <div className="sticky top-0 left-0 p-4 sm:p-6 md:p-8 flex items-center z-10">
        <img
          src={profileAvatar}
          alt="Profile Avatar"
          className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 cursor-pointer"
          onClick={handleClick}
        />
        <div className="ml-auto flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-[#5a4fcf]">
          <img src={musicIcon} alt="Music" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
          <Explore />
          <div
            className="w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 bg-[#D9D9D9] rounded-[40px] flex items-center justify-center cursor-pointer text-sm sm:text-base"
            onClick={handleAddPost}
          >
            <div className="font-['Pacifico'] font-normal not-italic text-center">
              Add Post
            </div>
          </div>
        </div>
      </div>
      <div className="w-9/12 mx-auto mt-4 sm:mt-8 md:mt-12 max-h-[70vh] overflow-y-auto hide-scrollbar">
        <Whispers />
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
      className="w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 bg-[#D9D9D9] rounded-[40px] flex items-center justify-center cursor-pointer text-sm sm:text-base"
      onClick={handleClick}
    >
      <div className="font-['Pacifico'] font-normal not-italic text-center">
        Explore Map
      </div>
    </div>
  );
}

export default Post;