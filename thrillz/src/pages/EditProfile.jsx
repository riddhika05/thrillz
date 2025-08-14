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
      
  )
}

export default EditProfile