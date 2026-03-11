import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Gamegrid from "./components/Gamegrid";
import Footer from "./components/Footer";
import WalletPage from "./pages/Walletpage";
import Pacman from "./games/Pacman";
import Takken from "./games/Takken";
import SuperMario from "./games/SuperMario";
import Sonic from "./games/Sonic";
import TopGear from "./games/TopGear";
import PongGame from "./games/PongGame";
import LoginSignup from "./pages/LoginSignup";
import Feedback from "./components/Feedback";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Gamegrid />
              <Feedback/>
              <Footer />
            </>
          }
        />
        <Route path="/store" element={<WalletPage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/games/pacman" element={<Pacman />} />
        <Route path="/games/supermario" element={<SuperMario />} />
        <Route path="/games/takken" element={<Takken />} />
        <Route path="/games/sonic" element={<Sonic />} />
        <Route path="/games/topgear" element={<TopGear />} />
        <Route path="/games/ponggame" element={<PongGame />} />

      </Routes>
    </Router>
  );
}

export default App;
