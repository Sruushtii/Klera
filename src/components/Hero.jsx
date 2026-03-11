import React, { PureComponent } from "react";

export class Hero extends PureComponent {
  render() {
    return (
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Bottom Gradient Shadow */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-10 text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight font-monument">
            Welcome to Klera Gaming{" "}
            {/* <span className="text-red-500">Minecraft</span> */}
          </h1>
          <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-2xl">
            We are Klera, a startup, bringing retro games back
            with a rewarding twist—You Play, You Win, You Earn real money!
          </p>

          {/* Buttons */}
          {/* <div className="mt-8 flex gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-3xl hover:bg-red-600 transition"
            >
              Login
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-3xl hover:bg-white hover:text-black transition"
            >
              Register
            </a>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Hero;
