import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar";

function InterviewHistory() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/interview/get-Interview`,
          { withCredentials: true },
        );
        setInterviews(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getInterviews();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-600";
      case "incomplete":
        return "bg-yellow-300 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen  bg-gradient-to-br from-green-50 to-blue-50  sm:px-6 lg:px-20 py-8">
        {/* Back Button */}
        <button
          className="flex items-center mt-20 md:mt-12 text-gray-600 mb-6 pl-2  hover:text-green-600 transition-colors"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2 " />
          Back
        </button>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl pl-4 font-bold text-gray-900 mb-2">
          Interview History
        </h1>
        <p className="text-gray-500 mb-7 pl-4 text-sm sm:text-base">
          Track your past interviews and performance reports
        </p>

        {/* List */}
        {interviews.length === 0 ? (
          <div className="bg-white pl-6 rounded-2xl shadow-lg text-center text-gray-500 font-medium">
            No interviews found. Start your first interview.
          </div>
        ) : (
          <div className="grid gap-6">
            {interviews.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/report/${item._id}`)}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col md:flex-row md:justify-between gap-4 items-start"
              >
                {/* LEFT */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg sm:text-xl font-semibold text-blue-800">
                    {item.role}
                  </p>

                  <p className="text-gray-500 text-sm sm:text-base">
                    {item.experience}
                  </p>

                  <p className="text-gray-400 text-xs sm:text-sm">
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-start md:items-end gap-2">
                  <p className="text-sm sm:text-sm font-bold text-green-600">
                    {item.finalScore}/10 Overall Score
                  </p>

                  <span
                    className={`px-4 py-1 rounded-full font-sm text-sm ${getStatusBadgeClass(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default InterviewHistory;
