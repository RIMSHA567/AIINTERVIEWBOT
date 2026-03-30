import React, { useState } from "react";
import Step1Setup from "../components/Step1SetUp";
import Step2Interview from "../components/Step2Interview";
import Step3Report from "../components/Step3Report";
import Navbar from "../components/Navbar";

function InterviewPage() {
  // Step track karne ke liye
  const [step, setStep] = useState(1);

  // Interview data store karne ke liye
  const [interviewData, setInterviewData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Step 1: Setup */}
      {/* Step1Setup is may sirf ik function pass kar rahy haen,Step1Setup sy data ay ga and dtaa varible my set ho gy ga .. */}
      {step === 1 && (
        <Step1Setup
          onNext={(data) => {
            setInterviewData(data);
            setStep(2);
          }}
        />
      )}

      {/* Step 2: Interview */}
      {step === 2 && interviewData && (
        <Step2Interview
          interviewData={interviewData}
          onFinish={(report) => {
            setInterviewData(report);
            setStep(3);
          }}
        />
      )}

      {/* Step 3: Report */}
      {step === 3 && interviewData && <Step3Report report={interviewData} />}
    </div>
  );
}

export default InterviewPage;
