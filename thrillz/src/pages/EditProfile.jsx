import React from 'react'
import {useState} from 'react';

import './EditProfile.css';

const EditProfile = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [triggerWordInput, setTriggerWordInput] = useState('');
  const [triggerWords, setTriggerWords] = useState([]);
  const [profanity, setProfanity] = useState(true);
  
  const handleAddTriggerWord = () => {
    if (triggerWordInput.trim() && !triggerWords.includes(triggerWordInput.trim())) {
      setTriggerWords([...triggerWords, triggerWordInput.trim()]);
      setTriggerWordInput('');
    }
  };

  const handleToggleProfanity = () => setProfanity(!profanity);

  const handleSave = (e) => {
    e.preventDefault();
    // Do actual save logic here
    alert('Changes Saved!');
  };

  const handleLogout = () => {
    // Implement logout logic
    alert('Logged Out');
  };
  

  return (
    <div className="edit-profile-container">
      <button className="logout-btn" onClick={handleLogout}>
        {'->'} log out
      </button>

      <div className="avatar-container">
        <div className="avatar">👤</div>
        <div className="plus-icon">+</div>
      </div>

      <form className="edit-profile-form" onSubmit={handleSave}>
        <label className="edit-label">Change nickname</label>
        <input
          className="edit-input"
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="Enter nickname"
        />

        <label className="edit-label">e-mail</label>
        <input
          className="edit-input"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter e-mail"
        />

        <label className="edit-label">Change password</label>
        <input
          className="edit-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="New password"
        />

        <label className="edit-label">Enter your trigger words</label>
        <div className="trigger-words-section">
          {triggerWords.map((word, idx) => (
            <span key={idx} className="trigger-word">{word}</span>
          ))}
          <input
            className="edit-input"
            type="text"
            value={triggerWordInput}
            onChange={e => setTriggerWordInput(e.target.value)}
            placeholder="Trigger word"
          />
          <button
            type="button"
            className="add-trigger-btn"
            onClick={handleAddTriggerWord}
          >
            +
          </button>
        </div>

        <div className="profanity-section">
          <span className="edit-label">profanity</span>
          <div
            role="switch"
            aria-checked={profanity}
            className={`toggle ${profanity ? 'active' : ''}`}
            onClick={handleToggleProfanity}
            tabIndex={0}
          >
            <div
              className={`toggle-knob ${profanity ? 'active' : ''}`}
            />
          </div>
        </div>

        <button
          type="submit"
          className="save-btn"
        >
          Save Changes
        </button>
      </form>
    </div>    
  );
}

export default EditProfile