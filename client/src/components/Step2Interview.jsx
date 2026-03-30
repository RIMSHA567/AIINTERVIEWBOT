import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Timer from "./Timer";
import { FaMicrophone } from "react-icons/fa";
import { serverUrl } from "../App";

import femaleVideo from "../assets/videos/female-ai.mp4";
import maleVideo from "../assets/videos/male-ai.mp4";

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [displayedQuestion, setDisplayedQuestion] = useState("");

  const recognitionRef = useRef(null);
  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];
  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  // ================= VOICE LOAD =================
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) setSelectedVoice(voices[0]);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // ================= TYPEWRITER =================
  const typeText = async (text, setTextFunction) => {
    setTextFunction("");
    for (let i = 0; i < text.length; i++) {
      await new Promise((res) => setTimeout(res, 25));
      setTextFunction((prev) => prev + text[i]);
    }
  };

  // ================= SPEAK =================
  const speakText = (text) => {
    return new Promise(async (resolve) => {
      if (!window.speechSynthesis) return resolve();
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.rate = 0.9;

      utterance.onstart = async () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
        await typeText(text, setSubtitle);
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);
        setSubtitle("");
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  // ================= FLOW =================
  useEffect(() => {
    if (!selectedVoice) return;

    const run = async () => {
      if (isIntroPhase) {
        await speakText(`Hi ${userName}, welcome.`);
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        typeText(currentQuestion.question, setDisplayedQuestion);
        await speakText(currentQuestion.question);
      }
    };

    run();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  // ================= TIMER =================
  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;

    setTimeLeft(currentQuestion.timeLimit || 60);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIntroPhase, currentIndex]);

  // ================= AUTO SUBMIT =================
  useEffect(() => {
    if (timeLeft === 0 && !feedback) submitAnswer(true);
  }, [timeLeft]);

  // ================= MIC =================
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setAnswer((prev) => prev + " " + transcript);
    };

    recognition.onerror = (e) => {
      console.log("Mic error:", e);
      if (e.error === "not-allowed") {
        alert("Please allow microphone access");
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    try {
      recognitionRef.current?.start();
    } catch {}
  };

  const stopMic = () => {
    try {
      recognitionRef.current?.stop();
    } catch {}
  };

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (isMicOn) stopMic();
    else startMic();
    setIsMicOn(!isMicOn);
  };

  // ================= SUBMIT ANSWER =================
  const submitAnswer = async (isAuto = false) => {
    if (isSubmitting) return;

    stopMic();
    setIsSubmitting(true);

    let givenAnswer = answer.trim();
    let defaultFeedback = "";

    if (!givenAnswer) {
      givenAnswer = "No answer given";
      defaultFeedback = "You did not submit an answer";
    }

    try {
      const res = await axios.post(
        serverUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer: givenAnswer,
        },
        { withCredentials: true },
      );

      const feedbackText = defaultFeedback || res.data.feedback;
      setFeedback(feedbackText);

      // 🔥 Speak feedback and auto next question
      await speakText(feedbackText);
      handleNext();
    } catch (err) {
      console.log(err);
    }

    setIsSubmitting(false);
  };

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");
    setDisplayedQuestion("");

    if (currentIndex + 1 >= questions.length) return finishInterview();

    await speakText("Next question");
    setCurrentIndex((prev) => prev + 1);
  };

  const finishInterview = async () => {
    stopMic();

    try {
      const res = await axios.post(
        serverUrl + "/api/interview/finish",
        { interviewId },
        { withCredentials: true },
      );
      onFinish(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen flex  mt-10 items-center justify-center bg-gradient-to-br from-[#d9f3e8] to-[#a7e3c4] p-4">
      <div className="w-full max-w-5xl mt-15 bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="bg-[#e6f7ee] p-6 flex flex-col items-center">
          <video
            ref={videoRef}
            src={videoSource}
            className="rounded-xl w-full mb-4 shadow-md"
            muted
          />

          {isAIPlaying && (
            <p className="text-center text-green-800 text-sm mb-3 font-medium">
              {subtitle}
            </p>
          )}

          <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />

          <p className="mt-3 text-green-900 font-semibold bg-green-500 p-3 rounded-2xl">
            Question <span className="text-white">{currentIndex + 1} </span>of{" "}
            <span className="text-white">{questions.length}</span>
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-green-900 mb-3">
              Question {currentIndex + 1}
            </h2>

            <p className="bg-green-50 p-4 rounded-lg shadow-inner text-green-800 font-medium min-h-20">
              {displayedQuestion}|
            </p>
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Speak or type your answer..."
            className="w-full mt-1 p-4 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          {feedback && (
            <p className="mt-2 text-green-700 font-semibold">{feedback}</p>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-full transition-colors duration-300 ${
                isMicOn ? "bg-green-500" : "bg-red-500"
              } text-white hover:scale-105`}
            >
              <FaMicrophone />
            </button>

            <button
              onClick={() => submitAnswer()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2Interview;
