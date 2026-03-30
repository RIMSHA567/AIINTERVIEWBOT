// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import {
// //   FaUserTie,
// //   FaBriefcase,
// //   FaFileUpload,
// //   FaMicrophoneAlt,
// //   FaChartLine,
// // } from "react-icons/fa";
// // import axios from "axios";
// // import { serverUrl } from "../App";

// // function Step1SetUp({ onStart }) {
// //   const [role, setRole] = useState("");
// //   const [experience, setExperience] = useState("");
// //   const [mode, setMode] = useState("Technical");
// //   const [resumeFile, setResumeFile] = useState(null);
// //   const [projects, setProjects] = useState([]);
// //   const [skills, setSkills] = useState([]);
// //   const [resumeText, setResumeText] = useState("");
// //   const [analysisDone, setAnalysisDone] = useState(false);
// //   const [analyzing, setAnalyzing] = useState(false);

// //   const handleUploadResume = async () => {
// //     if (!resumeFile || analyzing) return;

// //     try {
// //       setAnalyzing(true);
// //       const formData = new FormData();
// //       formData.append("resume", resumeFile);

// //       const res = await axios.post(
// //         serverUrl + "/api/interview/resume",
// //         formData,
// //         {
// //           withCredentials: true,
// //         },
// //       );
// //       console.log(res);
// //       setRole(res.data.role || "");
// //       setExperience(res.data.experience || "");
// //       setProjects(res.data.projects || []);
// //       setSkills(res.data.skills || []);
// //       setResumeText(res.data.resumeText || "");
// //       setAnalysisDone(true);
// //       setAnalyzing(false);
// //     } catch (error) {
// //       console.log(error);
// //       setAnalyzing(false);
// //     }
// //   };

// //   const handleStart = () => {
// //     if (!role || !experience) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     onStart({ role, experience, mode, projects, skills, resumeText });
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       transition={{ duration: 0.6 }}
// //       className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f3d2e] via-[#0b2f25] to-black px-4 "
// //     >
// //       <div className="w-full max-w-4xl mx-auto bg-[#0b2f25]/80 backdrop-blur-xl rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden border border-green-900 items-stretch md:mt-17 mt-30">
// //         {/* LEFT SIDE */}
// //         <motion.div
// //           initial={{ x: 80, opacity: 0 }}
// //           animate={{ x: 0, opacity: 1 }}
// //           transition={{ duration: 0.7 }}
// //           className="p-3 md:p-5 flex flex-col rounded-2xl border justify-center text-white h-full"
// //         >
// //           <h2 className="text-1xl md:text-2xl font-bold mb-6 leading-tight">
// //             Master Your Next Interview
// //           </h2>
// //           <p className="text-green-300 mb-10 text-sm md:text-base">
// //             Practice smarter with AI-driven mock interviews. Get real-time
// //             feedback and boost your confidence.
// //           </p>

// //           <div className="space-y-5">
// //             {[
// //               {
// //                 icon: <FaUserTie className="text-green-400 text-xl" />,
// //                 text: "Personalized Role-Based Practice",
// //               },
// //               {
// //                 icon: <FaMicrophoneAlt className="text-green-400 text-xl" />,
// //                 text: "Real-Time Voice Interaction",
// //               },
// //               {
// //                 icon: <FaChartLine className="text-green-400 text-xl" />,
// //                 text: "Detailed Performance Insights",
// //               },
// //             ].map((item, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ y: 30, opacity: 0 }}
// //                 animate={{ y: 0, opacity: 1 }}
// //                 transition={{ delay: 0.3 + index * 0.15 }}
// //                 whileHover={{ scale: 1.03 }}
// //                 className="flex items-center space-x-4 bg-[#0f3d2e]/60 p-4 rounded-xl border border-green-800"
// //               >
// //                 {item.icon}
// //                 <span className="text-sm md:text-base">{item.text}</span>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </motion.div>

// //         {/* RIGHT SIDE */}
// //         <div className="p-3 md:p-5 space-y-2 border rounded-2xl text-white h-full flex flex-col justify-center">
// //           <div className="relative">
// //             <FaUserTie className="absolute top-4 left-4 text-green-400" />
// //             <input
// //               type="text"
// //               placeholder="Target Role (e.g. Frontend Developer)"
// //               className="w-full pl-12 pr-4 py-2 rounded-xl bg-[#0f3d2e] border border-green-800 focus:outline-none"
// //               value={role}
// //               onChange={(e) => setRole(e.target.value)}
// //             />
// //           </div>

// //           <div className="relative">
// //             <FaBriefcase className="absolute top-4 left-4 text-green-400" />
// //             <input
// //               type="text"
// //               placeholder="Experience Level (e.g. 2 years)"
// //               className="w-full pl-12 pr-4 py-2 rounded-xl bg-[#0f3d2e] border border-green-800 focus:outline-none"
// //               value={experience}
// //               onChange={(e) => setExperience(e.target.value)}
// //             />
// //           </div>

// //           <select
// //             value={mode}
// //             onChange={(e) => setMode(e.target.value)}
// //             className="w-full py-3 px-4 rounded-xl bg-[#0f3d2e] border border-green-800"
// //           >
// //             <option value="Technical">Technical Interview</option>
// //             <option value="HR">HR Interview</option>
// //           </select>

// //           {!analysisDone && (
// //             <motion.div
// //               whileHover={{ scale: 1.02 }}
// //               onClick={() => document.getElementById("resumeUpload").click()}
// //               className="border-2 border-dashed border-green-800 rounded-xl p-3 text-center cursor-pointer hover:bg-[#0f3d2e]/60 transition"
// //             >
// //               <FaFileUpload className="text-3xl mx-auto text-green-400 mb-3" />
// //               <input
// //                 type="file"
// //                 accept="application/pdf"
// //                 id="resumeUpload"
// //                 className="hidden"
// //                 onChange={(e) => setResumeFile(e.target.files[0])}
// //               />
// //               <p className="text-sm text-green-200">
// //                 {resumeFile ? resumeFile.name : "Upload your resume (optional)"}
// //               </p>

// //               {resumeFile && (
// //                 <motion.button
// //                   whileHover={{ scale: 1.02 }}
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     handleUploadResume();
// //                   }}
// //                   className="mt-4 bg-green-600 px-5 py-2 rounded-full hover:bg-green-700 transition text-sm"
// //                 >
// //                   {analyzing ? "Analyzing..." : "Analyze Resume"}
// //                 </motion.button>
// //               )}
// //             </motion.div>
// //           )}

// //           {analysisDone && (
// //             <motion.div
// //               style={{ maxHeight: "200px", overflowY: "auto" }}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="bg-[#0f3d2e] border border-green-800 rounded-xl p-3 space-y-2"
// //             >
// //               <h3 className="text-sm font-semibold text-green-300">
// //                 AI Resume Insights
// //               </h3>

// //               {projects.length > 0 && (
// //                 <div>
// //                   <p className="font-medium text-green-200 mb-1">Projects:</p>
// //                   <ul className="list-disc list-inside text-green-300 space-y-1 text-sm">
// //                     {projects.map((p, i) => (
// //                       <li key={i}>
// //                         <strong>{p.name}</strong>
// //                         <br />
// //                         <span>{p.techUsed}</span>
// //                         <br />
// //                         <small>{p.description}</small>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}

// //               {skills.length > 0 && (
// //                 <div>
// //                   <p className="font-medium text-green-200 mb-1">Skills:</p>
// //                   <div className="flex flex-wrap gap-2">
// //                     {skills.map((s, i) => (
// //                       <span
// //                         key={i}
// //                         className="bg-green-700/30 text-green-300 px-3 py-1 rounded-full text-xs"
// //                       >
// //                         {s}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </motion.div>
// //           )}

// //           <motion.button
// //             whileHover={{ scale: 1.03 }}
// //             onClick={handleStart}
// //             className={`w-full py-3 rounded-full font-semibold shadow-md transition text-sm md:text-base
// //               ${!analysisDone ? "bg-gray-600 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
// //             disabled={!analysisDone}
// //           >
// //             Launch Interview Session
// //           </motion.button>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // }

// // export default Step1SetUp;
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaUserTie,
//   FaBriefcase,
//   FaFileUpload,
//   FaMicrophoneAlt,
//   FaChartLine,
// } from "react-icons/fa";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserData } from "../redux/userSlice"; // adjust path if needed
// import { serverUrl } from "../App";

// function Step1SetUp({ onStart }) {
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.user);

//   const [role, setRole] = useState("");
//   const [experience, setExperience] = useState("");
//   const [mode, setMode] = useState("Technical");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [resumeText, setResumeText] = useState("");
//   const [analysisDone, setAnalysisDone] = useState(false);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ==============================
//   // Resume Upload
//   // ==============================
//   const handleUploadResume = async () => {
//     if (!resumeFile || analyzing) return;

//     try {
//       setAnalyzing(true);

//       const formData = new FormData();
//       formData.append("resume", resumeFile);

//       const res = await axios.post(
//         serverUrl + "/api/interview/resume",
//         formData,
//         { withCredentials: true },
//       );
//       console.log(res); // pdf sy exrtracteddaa milay ga

//       setRole(res.data.role || "");
//       setExperience(res.data.experience || "");
//       setProjects(res.data.projects || []);
//       setSkills(res.data.skills || []);
//       setResumeText(res.data.resumeText || "");
//       setAnalysisDone(true);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   // ==============================
//   // ✅ FINAL HANDLE START (API CALL)
//   // ==============================
//   const handleStart = async () => {
//     if (!role || !experience) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const result = await axios.post(
//         serverUrl + "/api/interview/generate-questions",
//         {
//           role,
//           experience,
//           mode,
//           resumeText,
//           projects,
//           skills,
//         },
//         { withCredentials: true },
//       );

//       console.log(result.data); // questions wla data milay ga

//       // ✅ Update credits in Redux
//       if (userData) {
//         dispatch(
//           setUserData({
//             ...userData,
//             credits: result.data.creditsLeft,
//           }),
//         );
//       }

//       // ✅ Start interview
//       onStart(result.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f3d2e] via-[#0b2f25] to-black px-4"
//     >
//       <div className="w-full max-w-4xl bg-[#0b2f25]/80 rounded-3xl grid md:grid-cols-2 border border-green-900">
//         {/* LEFT */}
//         <div className="p-5 text-white">
//           <h2 className="text-xl font-bold mb-6">Master Your Next Interview</h2>

//           <div className="space-y-4">
//             <div className="flex gap-3">
//               <FaUserTie /> <span>Role-Based Practice</span>
//             </div>
//             <div className="flex gap-3">
//               <FaMicrophoneAlt /> <span>Voice Interaction</span>
//             </div>
//             <div className="flex gap-3">
//               <FaChartLine /> <span>Performance Insights</span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="p-5 space-y-3 text-white">
//           <input
//             type="text"
//             placeholder="Role"
//             className="w-full p-2 rounded bg-[#0f3d2e]"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="Experience"
//             className="w-full p-2 rounded bg-[#0f3d2e]"
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//           />

//           <select
//             value={mode}
//             onChange={(e) => setMode(e.target.value)}
//             className="w-full p-2 rounded bg-[#0f3d2e]"
//           >
//             <option value="Technical">Technical</option>
//             <option value="HR">HR</option>
//           </select>

//           {/* Upload */}
//           {!analysisDone && (
//             <div
//               onClick={() => document.getElementById("resumeUpload").click()}
//               className="border p-3 text-center cursor-pointer"
//             >
//               <input
//                 type="file"
//                 id="resumeUpload"
//                 hidden
//                 onChange={(e) => setResumeFile(e.target.files[0])}
//               />
//               <p>{resumeFile ? resumeFile.name : "Upload Resume"}</p>

//               {resumeFile && (
//                 <button onClick={handleUploadResume}>
//                   {analyzing ? "Analyzing..." : "Analyze"}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Start Button */}
//           <button
//             onClick={handleStart}
//             disabled={!analysisDone || loading}
//             className="w-full bg-green-600 py-2 rounded"
//           >
//             {loading ? "Starting..." : "Start Interview"}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default Step1SetUp;
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

function Step1SetUp({ onNext }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==============================
  // Resume Upload
  // ==============================
  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;

    try {
      setAnalyzing(true);

      const formData = new FormData();
      formData.append("resume", resumeFile);

      const res = await axios.post(
        serverUrl + "/api/interview/resume",
        formData,
        { withCredentials: true },
      );

      console.log(res);

      setRole(res.data.role || "");
      setExperience(res.data.experience || "");
      setProjects(res.data.projects || []);
      setSkills(res.data.skills || []);
      setResumeText(res.data.resumeText || "");
      setAnalysisDone(true);
    } catch (error) {
      console.log(error);
    } finally {
      setAnalyzing(false);
    }
  };

  // ==============================
  // HANDLE START
  // ==============================
  const handleStart = async () => {
    if (!role || !experience) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      // console.log(role);
      // console.log(experience);
      // console.log(mode);
      // console.log(resumeText);
      // console.log(projects);
      // console.log(skills);

      const result = await axios.post(
        serverUrl + "/api/interview/generate-questions",
        {
          role,
          experience,
          mode,
          resumeText,
          projects,
          skills,
        },
        { withCredentials: true },
      );

      console.log(result.data);

      if (userData) {
        dispatch(
          setUserData({
            ...userData,
            credits: result.data.creditsLeft,
          }),
        );
      }

      onNext(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f3d2e] via-[#0b2f25] to-black "
    >
      <div className="w-full max-w-4xl px-4 bg-[#0b2f25]/80 rounded-3xl grid md:grid-cols-2 border border-green-900">
        {/* LEFT */}
        <div className="p-5  text-white">
          <h2 className="text-xl font-bold mb-6">Master Your Next Interview</h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <FaUserTie /> <span>Role-Based Practice</span>
            </div>
            <div className="flex gap-3">
              <FaMicrophoneAlt /> <span>Voice Interaction</span>
            </div>
            <div className="flex gap-3">
              <FaChartLine /> <span>Performance Insights</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-5 space-y-3 text-white">
          <input
            type="text"
            placeholder="Role"
            className="w-full p-2 rounded bg-[#0f3d2e]"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            type="text"
            placeholder="Experience"
            className="w-full p-2 rounded bg-[#0f3d2e]"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full p-2 rounded bg-[#0f3d2e]"
          >
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
          </select>

          {/* Upload */}
          {!analysisDone && (
            <div
              onClick={() => document.getElementById("resumeUpload").click()}
              className="border p-3 text-center cursor-pointer"
            >
              <input
                type="file"
                id="resumeUpload"
                hidden
                onChange={(e) => setResumeFile(e.target.files[0])}
              />

              <p>{resumeFile ? resumeFile.name : "Upload Resume"}</p>

              {resumeFile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ FIX
                    handleUploadResume();
                  }}
                >
                  {analyzing ? "Analyzing..." : "Analyze"}
                </button>
              )}
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={!analysisDone || loading}
            className="w-full bg-green-600 py-2 rounded"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Step1SetUp;
