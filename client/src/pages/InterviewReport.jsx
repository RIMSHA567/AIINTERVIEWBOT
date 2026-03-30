import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App"; // Make sure ServerUrl is exported from App.js
import Step3Report from "../components/Step3Report"; // Import your Step3Report component
import Navbar from "../components/Navbar";
function InterviewReport() {
  const { id } = useParams(); // Get interview ID from URL
  const [report, setReport] = useState(null); // State to store report data

  // Fetch report data from server
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/interview/report/${id}`,
          { withCredentials: true },
        );
        console.log(result.data);
        setReport(result.data); // Save report in state
      } catch (error) {
        console.log(error);
      }
    };

    fetchReport();
  }, [id]);

  // Loading state
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }

  // Render Step3Report with the fetched report
  return (
    <>
      <Navbar />
      <Step3Report report={report} />;
    </>
  );
}

export default InterviewReport;
