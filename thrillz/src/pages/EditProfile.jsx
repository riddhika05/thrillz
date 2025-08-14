import React from 'react'

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
    <div style={styles.container}>
      <button style={styles.logout} onClick={handleLogout}>
        {'->'} log out
      </button>
      <div style={styles.avatarContainer}>
        <div style={styles.avatar}>👤</div>
        <div style={styles.plusIcon}>+</div>
      </div>
      <form style={styles.form} onSubmit={handleSave}>
        <label style={styles.label}>Change nickname</label>
        <input
          style={styles.input}
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="Enter nickname"
        />
        <label style={styles.label}>e-mail</label>
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter e-mail"
        />
        <label style={styles.label}>Change password</label>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="New password"
        />
        <label style={styles.label}>Enter your trigger words</label>
        <div style={styles.triggerWordsSection}>
          {triggerWords.map((word, idx) => (
            <span key={idx} style={styles.triggerWord}>{word}</span>
          ))}
          <input
            style={styles.input}
            type="text"
            value={triggerWordInput}
            onChange={e => setTriggerWordInput(e.target.value)}
            placeholder="Trigger word"
          />
          <button type="button" style={styles.addTriggerButton} onClick={handleAddTriggerWord}>+</button>
        </div>
        <div style={styles.profanitySection}>
          <span style={styles.label}>profanity</span>
          {/* Custom Toggle */}
          <div
            role="switch"
            aria-checked={profanity}
            style={{
              ...styles.toggle,
              ...(profanity ? styles.toggleActive : {})
            }}
            onClick={handleToggleProfanity}
            tabIndex={0}
          >
            <div style={{
              ...styles.toggleKnob,
              ...(profanity ? styles.toggleKnobActive : {})
            }} />
          </div>
        </div>

        <button
          type="submit"
          style={styles.saveButton}
        >
          Save Changes
        </button>
      </form>
    </div>    
  )
}

export default EditProfile