import React from "react";
import "./Post.css";

// Import asset images (update paths as needed)
import heartIcon from "../assets/heart.png";
import commentIcon from "../assets/comment.png";
import shareIcon from "../assets/share.png";
import uploadIcon from "../assets/upload.png";
import musicIcon from "../assets/music.png";
import botIcon from "../assets/bot.png";
import profileAvatar from "../assets/profile.png";
import backgroundImg from "../assets/post.png";
import { useNavigate } from "react-router-dom";

function Post() {
  return (
    <div className="Post_Page">
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
    <div className="Header">
      <img src={profileAvatar} alt="Profile Avatar" className="profile"  onClick={handleClick}/>
      <div className="right">
        <img src={musicIcon} alt="Music" className="music" />
        <Explore />
      </div>
      <div className="bottom">
         <img src={botIcon} alt="Bot" className="bot"  onClick={handleClickBot} />
      </div>
    </div>
  );
}

function Explore() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/explore");
  }
  return (
    <div className="explore" onClick={handleClick}>
      <div className="explore_text">Explore Map</div>
    </div>
  );
}

export default Post;
