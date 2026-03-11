import React from "react";

const Mario = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-xl">
        {/* Embed the Wario's Adventure (Mario) game via iframe */}
        <iframe
          src="https://www.retrogames.cc/embed/41979-warios-adventure.html"
          title="Mario Game - Wario's Adventure"
          className="w-full h-screen border-0"
          allowFullScreen
          scrolling="no"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
        ></iframe>
      </div>
    </div>
  );
};

export default Mario;
