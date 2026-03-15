import { motion } from "framer-motion";
import React from "react";
import { FiBarChart2, FiFileText, FiFile, FiDownload } from "react-icons/fi";

const features = [
  {
    id: 1,
    title: "AI Powered Evaluation",
    description:
      "In real-time, fully flexible, feedback on every impression. Our AI guides better, faster & accurately, with interactive delivery in real-time.",
    icon: <FiBarChart2 className="w-6 h-6 text-green-400" />,
    bgColor: "bg-[#1F2937]",
  },
  {
    id: 2,
    title: "Resume-Based Evaluation",
    description:
      "Harness your CV to run real-time simulations, summarizing insights from your past experience and skills.",
    icon: <FiFileText className="w-6 h-6 text-yellow-400" />,
    bgColor: "bg-[#1F2937]",
  },
  {
    id: 3,
    title: "History & Analytics",
    description:
      "Visualize your growth, track your past interviews and performance trends over time.",
    icon: <FiFile className="w-6 h-6 text-green-400" />,
    bgColor: "bg-[#111827]",
  },
  {
    id: 4,
    title: "Detailed PDF Reports",
    description:
      "Get a comprehensive report generated automatically to analyze and refine your performance in offline mode.",
    icon: <FiDownload className="w-6 h-6 text-green-500" />,
    bgColor: "bg-gradient-to-r from-green-600 to-green-700",
  },
];

const FeaturesCards = () => {
  return (
    <section className="py-12 px-6 md:px-12 bg-[#111827] w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`${feature.bgColor} rounded-xl p-6 md:p-8 flex flex-col justify-between hover:shadow-lg hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="ml-3 text-white text-lg md:text-xl font-semibold">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              {feature.description}
            </p>
            {feature.title === "Detailed PDF Reports" && (
              <div className="mt-4 flex justify-end">
                <span className="text-white font-medium text-sm md:text-base">
                  PDF
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesCards;
