import React from 'react';
import './Post.css';

// Import asset images (update paths as needed)
import heartIcon from '../assets/heart.png';
import commentIcon from '../assets/comment.png';
import shareIcon from '../assets/share.png';
import uploadIcon from '../assets/upload.png';
import musicIcon from '../assets/music.png';
import botIcon from '../assets/bot.png';
import profileAvatar from '../assets/profile.png';
import backgroundImg from '../assets/post.png';

function Post() {
  return (
   <div className='Post_Page'>
    <Header/>
   </div>
  );
}
function Header()
{
  return(
   <div className="Header">
       <img src={profileAvatar} alt="Profile Avatar" className="profile"/>
       <img src={musicIcon} alt="Music" className="music"/>
     
   </div>
  )
}

export default Post;
