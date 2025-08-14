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

  
  

  return (
    <div>EditProfile</div>
  )
}

export default EditProfile