import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#111827] mt-10 text-white w-full min-h-screen flex items-center justify-center">
      <div className="px-6 text-center max-w-3xl">
        {/* Heading - 3 lines exact */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold leading-snug md:leading-snug mb-6"
        >
          Master your dream career <br />
          with the <span className="text-[#10B981]">Obsidian</span> <br />
          <span className="text-[#D9E96F]">Architect.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-400 text-sm md:text-base mb-8"
        >
          Experience hyper-realistic interview simulations powered by advanced
          AI. Get real-time feedback, behavioral analysis, and practical deep
          dives. Tailored to your professional goals.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate("/mock-interview")}
            className="bg-[#10B981] hover:bg-[#0f9c6f] transition text-white font-medium px-6 py-3 rounded-lg text-sm md:text-base"
          >
            Start Mock Interview
          </button>
          <button
            onClick={() => navigate("/demo")}
            className="bg-gray-700 hover:bg-gray-600 transition text-white font-medium px-6 py-3 rounded-lg text-sm md:text-base"
          >
            View Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
