import React, { useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { serverUrl } from "../App.jsx";

function Pricing() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);

  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: 100,
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: 500,
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  // ================= STRIPE PAYMENT =================
  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);

      const res = await axios.post(
        serverUrl + "/api/credits/order",
        {
          planId: plan.id,
          amount: plan.price,
          credits: plan.credits,
        },
        { withCredentials: true },
      );

      // Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-green-50 flex flex-col items-center py-10 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-6 text-gray-600 hover:text-black"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">Choose Your Plan</h1>
      <p className="text-gray-500 mt-2 mb-10 text-center">
        Flexible pricing to match your interview preparation goals.
      </p>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.03 }}
              className={`bg-white rounded-2xl shadow-md p-6 border transition cursor-pointer ${
                isSelected ? "border-emerald-500 shadow-lg" : "border-gray-200"
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              {/* Title */}
              <h2 className="text-xl font-semibold mt-2">{plan.name}</h2>

              {/* Price */}
              <p className="text-3xl font-bold text-emerald-600 mt-2">
                ₹{plan.price}
              </p>

              <p className="text-gray-500 mt-1">{plan.credits} Credits</p>

              {/* Description */}
              <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-500" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              {!plan.default && (
                <button
                  disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!isSelected) {
                      setSelectedPlan(plan.id);
                    } else {
                      handlePayment(plan);
                    }
                  }}
                  className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${
                    isSelected
                      ? "bg-emerald-600 text-white hover:opacity-90"
                      : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
                  }`}
                >
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                      ? "Proceed to Pay"
                      : "Select Plan"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Pricing;
