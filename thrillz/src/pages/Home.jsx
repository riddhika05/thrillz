import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/post');
  };

  return (
    <section className="home-container">
      <div className="overlay"></div>
      <div className="title">Whisper Walls</div>
      <p className="subtitle">Where whispers shape hearts...</p>
      <div className="left-copy">
        <div>WANDER,</div>
        <div>WONDER,</div>
        <div>REPEAT</div>
      </div>
      <button
        type="button"
        className="cta"
        onClick={handleContinue}
        aria-label="Continue"
      >
        click here to continue →
      </button>
    </section>
  );
};

export default Home;
