import Home from './pages/Home';
import Post from './pages/Post';
import Map from './pages/Map';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Avatar from './pages/Avatar';
import Chatbot from './pages/Chatbot';
import Chat from './pages/Chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<Post />} />
        <Route path='/map' element={<Map />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/avatar' element={<Avatar />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/chat' element={<Chat />} />
        
      </Routes>
     </Router>
    </>
  )
}

export default App
