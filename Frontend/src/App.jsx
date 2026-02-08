import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
import PageTransition from './components/PageTransition/PageTransition';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/oauth-success" element={<PageTransition><OAuthSuccess /></PageTransition>} />
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/lost-and-found" element={<PageTransition><ProtectedRoute><LostAndFound /></ProtectedRoute></PageTransition>} />
          <Route path="/contest" element={<PageTransition><ProtectedRoute><Contest /></ProtectedRoute></PageTransition>} />
          <Route path="/winners" element={<PageTransition><ProtectedRoute><Winners /></ProtectedRoute></PageTransition>} />
          <Route path="/reviews" element={<PageTransition><ProtectedRoute><Reviews /></ProtectedRoute></PageTransition>} />

          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
