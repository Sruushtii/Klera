import React from "react";

const Takken = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-xl">
        {/* Embed the Takken 3 game via iframe */}
        <iframe
          src="https://www.retrogames.cc/embed/45379-tekken-3.html"
          title="Takken 3 Game"
          className="w-full h-screen border-0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Takken;
