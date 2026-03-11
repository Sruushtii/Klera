import React from "react";

const FeedbackPage = () => {
  const googleFormLink = "https://forms.gle/ikwfb9jmJjCTvaTU6"; // Replace with your Google Form link

  return (
    <div className="flex items-center justify-center bg-black text-white ">
      {/* Container */}
      <div className="relative flex flex-col lg:flex-row items-stretch max-w-5xl w-full rounded-2xl overflow-hidden shadow-lg mt-10">
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 relative">
          <img
            src="/takken.jpg" // Replace with the actual path to 'long.png'
            alt="Feedback Illustration"
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Math Equation at the Bottom */}
          
        </div>

        {/* Right Side: Content */}
        <div className="absolute top-6 left-6 lg:static lg:w-1/2 p-6 lg:p-8 bg-black/70 lg:bg-transparent rounded-2xl">
          <h1 className="text-4xl font-bold font-monument text-yellow-400 mb-4">
            Share Your Feedback
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-3">
            Help us improve by sharing your thoughts and ideas. Your feedback
            helps us create a better experience for everyone.
          </p>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            Let us know how we’re doing or what we can improve. We are here to
            listen!
          </p>

          {/* Feedback Button */}
          <a
            href={googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            Submit Feedback
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
