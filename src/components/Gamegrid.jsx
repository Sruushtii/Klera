import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const games = [
  { title: "Super Mario", image: "/mario.jpg", cost: 100 },
  { title: "Takken", image: "/takken.jpg", cost: 150 },
  { title: "Pac Man", image: "/pacman1.jpg", cost: 80 },
  { title: "Sonic", image: "/sonic-01.jpg", cost: 200 },
  { title: "TopGear", image: "/Topgear.jpg", cost: 200 },
  { title: "PongGame", image: "/pong.webp", cost: 200 },
];

const GameOptions = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userCoins, setUserCoins] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserWallet(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserWallet = async (uid) => {
    try {
      const userRef = doc(db, "user", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserCoins(userSnap.data().coins || 0);
      }
    } catch (err) {
      console.error("Error fetching wallet data:", err);
      setError("Unable to fetch wallet data. Please try again.");
    }
  };

  const handlePlayGame = async () => {
    if (!user || !selectedGame) return;
    setLoading(true);
    setError("");

    try {
      const userRef = doc(db, "user", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const currentCoins = userSnap.data().coins;

        if (currentCoins >= selectedGame.cost) {
          await updateDoc(userRef, {
            coins: currentCoins - selectedGame.cost,
          });
          setUserCoins(currentCoins - selectedGame.cost);
          navigate(`/games/${selectedGame.title.replace(/\s+/g, "").toLowerCase()}`);
        } else {
          setError("Insufficient coins! Redirecting to the store...");
          setTimeout(() => navigate("/store"), 1000);
        }
      }
    } catch (err) {
      console.error("Error processing game play:", err);
      setError("Failed to deduct coins. Please try again later.");
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGame(null);
    setError("");
  };

  return (
    <section className="py-16 bg-black text-white min-h-screen font-sans">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold uppercase text-white drop-shadow-lg font-monument tracking-widest">
          Game Options
        </h2>
        <p className="text-gray-400 mt-2 text-lg">
          Choose your favorite game and start the adventure!
        </p>
        <p className="mt-4 text-lg text-yellow-400">
          Wallet Balance: <span className="font-bold">{userCoins} Coins</span>
        </p>
      </div>

      {/* Game Cards */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {games.map((game) => (
          <div
            key={game.title}
            className="relative border-white border rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden group"
            onClick={() => handleGameClick(game)}
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-80
               object-cover transition-opacity group-hover:opacity-70"
            />
            <div className="absolute bottom-0 left-0 w-full p-2 text-center ">
              <h3 className="text-lg font-semibold text-white">{game.title}</h3>
              <p className="text-yellow-400 text-sm">{game.cost} Coins</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedGame && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-md">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-3xl font-bold mb-4 text-center">
              {selectedGame.title}
            </h3>
            <p className="text-lg mb-4 text-center">
              This game costs{" "}
              <span className="text-yellow-400 font-bold">
                {selectedGame.cost} coins
              </span>{" "}
              to play.
            </p>

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            {userCoins >= selectedGame.cost ? (
              <button
                onClick={handlePlayGame}
                disabled={loading}
                className={`w-full py-2 rounded-full font-semibold ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 transition"
                }`}
              >
                {loading ? "Processing..." : "Play Now"}
              </button>
            ) : (
              <button
                onClick={() => navigate("/store")}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-full font-semibold transition"
              >
                Buy More Coins
              </button>
            )}

            <button
              onClick={handleCloseModal}
              className="mt-4 w-full bg-gray-600 py-2 rounded-full font-semibold hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GameOptions;
