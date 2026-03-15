import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaCoins, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);
  const credits = userData?.credits ?? 0;
  const username = userData?.name ?? "";

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setAvatarOpen(false);
      setCreditsOpen(false);
      navigate("/auth");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full bg-[#111827] z-50 text-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-green-500 p-2 rounded font-bold">AI</div>
          <span className="font-semibold text-white text-sm md:text-base">
            AI Interview
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate("/practice")}
            className="hover:text-green-400 transition"
          >
            Practice
          </button>
          <button
            onClick={() => navigate("/history")}
            className="hover:text-green-400 transition"
          >
            History
          </button>
          <button
            onClick={() => navigate("/analytics")}
            className="hover:text-green-400 transition"
          >
            Analytics
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Credits */}
          <div className="relative">
            <div
              className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700 transition"
              onClick={() => setCreditsOpen(!creditsOpen)}
            >
              <FaCoins className="text-yellow-400" />
              <span className="text-sm font-medium">{credits} credits</span>
              <FaPlus className="text-xs text-gray-300" />
            </div>

            <AnimatePresence>
              {creditsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute md:right-0 top-full mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl p-4 text-gray-300 z-50 left-0 md:left-auto md:mx-0 mx-auto"
                >
                  <p className="text-sm mb-3">
                    Need more credits? Upgrade your plan to access advanced AI
                    evaluations.
                  </p>
                  <button
                    onClick={() => navigate("/pricing")}
                    className="w-full bg-green-500 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
                  >
                    Buy More Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar */}
          {userData ? (
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center cursor-pointer"
              >
                {username ? username.charAt(0).toUpperCase() : <FaUserCircle />}
              </motion.div>

              <AnimatePresence>
                {avatarOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute md:right-0 top-full mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden z-50 left-0 md:left-auto md:mx-0 mx-auto"
                  >
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate("/history")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
                    >
                      History
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-600 text-sm text-red-400"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/auth")}
              className="bg-green-500 px-5 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition"
            >
              Sign In
            </motion.button>
          )}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden ml-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded hover:bg-gray-700 transition"
            >
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden w-full bg-[#111827] mt-2 px-6 py-4 flex flex-col gap-3"
            >
              <button
                onClick={() => navigate("/practice")}
                className="text-left hover:text-green-400 transition"
              >
                Practice
              </button>
              <button
                onClick={() => navigate("/history")}
                className="text-left hover:text-green-400 transition"
              >
                History
              </button>
              <button
                onClick={() => navigate("/analytics")}
                className="text-left hover:text-green-400 transition"
              >
                Analytics
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
