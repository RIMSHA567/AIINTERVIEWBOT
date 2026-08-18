import React, { useEffect } from "react";
import { motion } from "motion/react";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/api";

function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser(dispatch);

    const t = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(t);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 via-white to-green-200 p-4">
      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-lg bg-white/70 shadow-2xl rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center gap-4"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-green-500 text-5xl sm:text-6xl"
        >
          <FiCheckCircle />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl font-bold text-green-600"
        >
          Payment Successful!
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-sm sm:text-base"
        >
          Your credits have been added successfully.
        </motion.p>

        {/* Redirect Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 text-xs sm:text-sm"
        >
          Redirecting to home in 5 seconds...
        </motion.p>

        {/* Button (optional UX improvement) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-4 px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base shadow-md"
        >
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;
