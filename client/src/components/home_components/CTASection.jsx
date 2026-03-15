import { motion } from "framer-motion";
import React from "react";

const CTASection = () => {
  return (
    <section className="bg-[#111827] py-16 px-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-[#1F2937] rounded-xl p-8  py-15 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* Left Text */}
        <div className="flex-1">
          <h3 className="text-yellow-400 font-semibold text-2xl md:text-3xl mb-3">
            Fuel Your Ambition
          </h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Our simple credit system lets you pay only for what you practice.{" "}
            <br />
            No subscriptions, just focused growth.
          </p>
        </div>

        {/* Right Circle + Button */}
        <div className="flex flex-col items-center gap-2 bg-[#636970] rounded-2xl p-3">
          <span className="text-white font-bold text-2xl md:text-3xl">100</span>

          <button className="bg-yellow-400 text-black font-semibold px-4 py-1 rounded-md hover:brightness-110 transition-all">
            Top-Up Now
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
