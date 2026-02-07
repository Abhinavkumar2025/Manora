import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import LostAndFound from './pages/Lost_And_Found/Lost_And_Found';
import Contest from './pages/Contest/Contest';
import Winners from './pages/Winners/Winners';
import Reviews from './pages/Reviews/Reviews';
import Footer from './components/Footer/Footer';
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import OAuthSuccess from "./pages/OAuthSuccess/OAuthSuccess";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/" element={<Home />} />
        <Route path="/lost-and-found" element={<ProtectedRoute><LostAndFound /></ProtectedRoute>} />
        <Route path="/contest" element={<ProtectedRoute><Contest /></ProtectedRoute>} />
        <Route path="/winners" element={<ProtectedRoute><Winners /></ProtectedRoute>} />
        <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
