import { motion } from "framer-motion";
import React from "react";
import { FiTarget, FiCpu, FiShield } from "react-icons/fi";

const intelligenceModes = [
  {
    id: 1,
    title: "H.R. & Behavioral Mode",
    description:
      "For non-technical skills, behavioral principles, and cultural fit using the AI-driven behavioral analysis.",
    code: "HREDUC-01",
    icon: <FiTarget className="w-5 h-5 text-green-400" />,
  },
  {
    id: 2,
    title: "Technical Deep Dive",
    description:
      "Rigorous clear-cut technical questioning for engineers, designers, and product leads.",
    code: "KZNT-23DC",
    icon: <FiCpu className="w-5 h-5 text-green-400" />,
  },
  {
    id: 3,
    title: "Confidence Detection",
    description:
      "Real-time analysis of vocal & body, filler words, and professional presence.",
    code: "BIOETIC-44",
    icon: <FiShield className="w-5 h-5 text-green-400" />,
  },
];

const IntelligenceModelsSection = () => {
  return (
    <section className="py-12 px-6 md:px-12 bg-[#111827] w-full">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl md:text-2xl font-semibold mb-6"
        >
          Specialized Intelligence Modes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 text-sm md:text-base mb-8"
        >
          Tailor the AI’s guidance to your specific preparation needs. Each mode
          utilizes dedicated evaluation algorithms for expert feedback.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {intelligenceModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#1F2937] rounded-xl p-6 flex flex-col justify-between hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center mb-4">
                {mode.icon}
                <h3 className="ml-3 text-white font-semibold text-lg">
                  {mode.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm md:text-base mb-4">
                {mode.description}
              </p>
              <span className="text-yellow-400 font-semibold text-sm">
                {mode.code}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntelligenceModelsSection;
