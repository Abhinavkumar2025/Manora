import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import LostAndFound from './pages/Lost_And_Found/Lost_And_Found';
import Contest from './pages/Contest/Contest';
import Winners from './pages/Winners/Winners';
import Reviews from './pages/Reviews/Reviews';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lost-and-found" element={<LostAndFound />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
