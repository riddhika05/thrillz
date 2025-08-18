import React from 'react';
import myImage from "../assets/girl.png";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      {/* Top Navigation */}
      <div className="top-bar">
        <FaArrowLeft className="icon" />
        <FaShareAlt className="icon" />
      </div>

      <div className="profile-header">
        <div className="profile-pic">
          <img src={myImage} alt="Profile" />
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-number">2k</span>
            <span className="stat-label">points</span>
          </div>
          <div className="stat">
            <span className="stat-number">2k</span>
            <span className="stat-label">likes</span>
          </div>
          <div className="stat">
            <span className="stat-number">2k</span>
            <span className="stat-label">posts</span>
          </div>
        </div>
      </div>

      <div className="edit-profile">
        <button className="buttoneditprof">Edit Profile</button>
      </div>

      {/* Recently Viewed */}
      <h2 className="section-title">Posts</h2>
      <div className="recently-viewed">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="square-box"></div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
