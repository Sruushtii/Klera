import React, { useState } from "react";
import { auth, googleProvider, db } from "../firebase/firebaseConfig";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to save user data to Firestore
  const saveUserData = async (user) => {
    const userRef = doc(db, "user", user.uid);
    await setDoc(userRef, {
      name: user.displayName || "Anonymous",
      email: user.email,
      coins: 100, // Default coins when registering
    }, { merge: true });
  };

  // Handle Signup
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserData(userCredential.user);
      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserData(result.user);
      alert("Google Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login / Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 rounded text-black"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4 hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-2 rounded mb-4 hover:bg-green-600"
        >
          Signup
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
