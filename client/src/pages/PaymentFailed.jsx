import React, { useEffect } from "react";
import { motion } from "motion/react";
import { FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate("/pricing"); // retry page
    }, 5000);

    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 via-white to-red-200 p-4">
      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-lg bg-white/70 shadow-2xl rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center gap-4"
      >
        {/* ❌ Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-red-500 text-5xl sm:text-6xl"
        >
          <FiXCircle />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl font-bold text-red-600"
        >
          Payment Failed!
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-sm sm:text-base"
        >
          Something went wrong while processing your payment.
        </motion.p>

        {/* Reason Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-xs sm:text-sm"
        >
          Please check your payment details or try again.
        </motion.p>

        {/* Redirect Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 text-xs sm:text-sm"
        >
          Redirecting to pricing in 5 seconds...
        </motion.p>

        {/* Buttons */}
        <div className="flex gap-3 mt-4 flex-wrap justify-center">
          {/* Retry */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/pricing")}
            className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base shadow-md"
          >
            Try Again
          </motion.button>

          {/* Home */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm sm:text-base"
          >
            Go Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentFailed;
