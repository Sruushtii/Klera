import React from "react";

const Pacman = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-xl">
        <iframe
          src="https://www.retrogames.cc/embed/41802-pac-man.html"
          title="Pacman Game"
          className="w-full h-screen border-0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Pacman;
