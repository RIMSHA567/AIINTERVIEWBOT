import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaArrowLeft } from "react-icons/fa";

function Step3Report({ report }) {
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <p className="text-gray-500 text-lg font-medium">Loading Report...</p>
      </div>
    );
  }

  const {
    confidence = 0,
    finalScore = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const percentage = (finalScore / 10) * 100;

  const questionScoreData = questionWiseScore.map((q, i) => ({
    name: `Q${i + 1}`,
    score: q.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }
  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let currentY = 25;

    // --- HEADER ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); // Green heading
    doc.text("AI Interview Report", pageWidth / 2, currentY, {
      align: "center",
    });

    currentY += 12;

    // --- FINAL SCORE BOX ---
    doc.setFillColor(16, 185, 129); // Green background
    doc.setDrawColor(0, 0, 0); // Border color black
    doc.rect(margin, currentY, pageWidth - 2 * margin, 15, "F"); // Filled rectangle
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255); // White text
    doc.text(`Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 11, {
      align: "center",
    });

    currentY += 25;

    // --- SKILLS ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(34, 34, 34); // Dark text
    doc.text("Skill Evaluation", margin, currentY);

    currentY += 8;

    const skillLabels = [
      { label: "Confidence", value: confidence },
      { label: "Communication", value: communication },
      { label: "Correctness", value: correctness },
    ];

    skillLabels.forEach((s) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(34, 34, 34);
      doc.text(`${s.label}: ${s.value}/10`, margin, currentY);

      // Skill bar background
      doc.setFillColor(220, 220, 220);
      doc.rect(margin, currentY + 2, 100, 5, "F");

      // Skill bar value
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, currentY + 2, s.value * 10, 5, "F");

      currentY += 12;
    });

    currentY += 5;

    // --- QUESTION TABLE ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(34, 34, 34);
    doc.text("Question Breakdown", margin, currentY);
    currentY += 5;

    autoTable(doc, {
      startY: currentY,
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        i + 1,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [16, 185, 129],
        textColor: 255,
        halign: "center",
      },
      bodyStyles: {
        textColor: 34,
        fontSize: 12,
      },
      alternateRowStyles: {
        fillColor: [240, 255, 240], // Light green for alternate rows
      },
      margin: { left: margin, right: margin },
    });

    // --- FOOTER ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 290, {
        align: "center",
      });
    }

    // Save PDF
    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className="min-h-screen  mx-8 bg-linear-to-br from-green-50 to-blue-50 px-4 sm:px-6 lg:px-10 py-8">
      {/* HEADER */}
      <div className="mb-8 mt-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/history")}
            className="p-3 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            <FaArrowLeft className="text-green-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Interview Report</h1>
        </div>

        <button
          onClick={downloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Download PDF
        </button>
      </div>

      {/* SCORE + SKILLS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SCORE */}
        <div className="bg-white p-6 rounded-xl shadow text-center flex flex-col items-center">
          <div className="w-32 h-32 sm:w-28 sm:h-28">
            <CircularProgressbar
              value={percentage}
              text={`${finalScore}/10`}
              styles={buildStyles({
                pathColor: "#10b981",
                textColor: "#111",
                trailColor: "#d1fae5",
              })}
            />
          </div>
          <p className="mt-4 font-semibold text-gray-800">{performanceText}</p>
          <p className="text-sm text-gray-500">{shortTagline}</p>
        </div>

        {/* SKILLS */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h3 className="font-semibold mb-4 text-gray-800">Skill Evaluation</h3>
          {skills.map((s, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between text-sm mb-1 text-gray-700">
                <span>{s.label}</span>
                <span>{s.value}/10</span>
              </div>
              <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${s.value * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white mt-6 p-6 rounded-xl shadow h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={questionScoreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#22c55e"
              fill="#bbf7d0"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* QUESTION FEEDBACK */}
      <div className="bg-white mt-6 p-6 rounded-xl shadow-2xl">
        <h3 className="font-semibold mb-4 text-gray-800">Question Breakdown</h3>
        {questionWiseScore.map((q, i) => (
          <div
            key={i}
            className="mb-4  p-3 rounded-lg hover:bg-green-50 transition shadow-2xl"
          >
            <p className="text-sm text-gray-500">Question {i + 1}</p>
            <p className="font-medium text-gray-800">{q.question}</p>
            <p className="text-sm mt-2 text-green-600">
              {q.feedback || "No feedback available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step3Report;
