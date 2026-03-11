import React from "react";

const TopGear = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-xl">
        {/* Embed the Top Gear USA game via iframe */}
        <iframe
          src="https://www.retrogames.cc/embed/23881-top-gear-usa.html"
          title="Top Gear USA Game"
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

export default TopGear;
