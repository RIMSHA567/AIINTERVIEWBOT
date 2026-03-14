// src/pages/Auth.jsx

import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {
  FaUser,
  FaRobot,
  FaMicrophone,
  FaComment,
  FaFileAlt,
} from "react-icons/fa";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.js";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

import { serverUrl } from "../App";

export default function Auth() {
  const dispatch = useDispatch();

  // =========================
  // GOOGLE AUTH LOGIC
  // =========================
  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        `${serverUrl}/api/auth/google`,
        {
          name: user.displayName,
          email: user.email,
        },
        { withCredentials: true },
      );

      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="relative w-screen h-screen overflow-hidden bg-linear-to-br from-green-900 via-teal-900 to-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Floating Icons */}
      <motion.div
        className="absolute top-20 left-10 text-white/20 text-4xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <FaMicrophone />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-16 text-white/10 text-5xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <FaComment />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-1/4 text-white/10 text-5xl"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      >
        <FaFileAlt />
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 text-white/10 text-6xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      >
        <FaRobot />
      </motion.div>

      {/* Top Navigation */}
      <div className="absolute top-8 left-8 flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="text-white font-semibold text-lg">
          AI Interview Bot
        </span>
      </div>

      {/* Glassmorphism Authentication Card */}
      <motion.div
        className="relative w-full max-w-md p-8 rounded-3xl bg-black/50 backdrop-blur-md border border-white/10 shadow-xl flex flex-col items-center text-center space-y-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Icon Row */}
        <div className="flex space-x-6">
          <motion.div
            className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <FaUser className="text-green-400 text-xl" />
          </motion.div>

          <motion.div
            className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            <FaMicrophone className="text-green-400 text-xl" />
          </motion.div>

          <motion.div
            className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <FaRobot className="text-green-400 text-xl" />
          </motion.div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Master Your Next Interview
        </h1>

        {/* Subheading */}
        <h2 className="text-green-400 text-md md:text-lg font-medium">
          The Ultimate AI-Powered Simulator
        </h2>

        {/* Description */}
        <p className="text-white/70 text-sm md:text-base">
          Step into your dream role with confidence. Practice high-stakes
          scenarios and get personalized expert feedback in real-time.
        </p>

        {/* Google Sign-in Button */}
        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center space-x-3 py-3 px-6 bg-white rounded-full shadow-md text-black font-medium hover:shadow-lg transition-all duration-200"
        >
          <FcGoogle size={24} />
          <span>Continue with Google</span>
        </motion.button>

        {/* Security Text */}
        <p className="text-white/50 text-xs flex items-center space-x-1">
          <span>🔒</span>
          <span>Secure Authentication</span>
        </p>

        {/* Footer Quote */}
        <p className="text-green-400/70 italic text-sm mt-2">
          "Practice makes permanent. Smart practice makes perfect."
        </p>
      </motion.div>
    </motion.div>
  );
}
