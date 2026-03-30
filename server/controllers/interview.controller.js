import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.service.js";
import Interview from "../models/interview.model.js";
import User from "../models/user.model.js";

// ==============================
// Analyze uploaded resume
// ==============================
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume required" });
    }

    const filepath = req.file.path;
    const fileBuffer = await fs.promises.readFile(filepath);
    const uint8Array = new Uint8Array(fileBuffer);
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let resumeText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join("");
      resumeText += pageText + "\n";
    }

    resumeText = resumeText.replace(/\s+/g, " ").trim();

    // ✅ UPDATED RESUME PROMPT
    const messages = [
      {
        role: "system",
        content: `
Extract structured data from resume.

Return strictly JSON:

{
  "role": "string",
  "experience": "string",
  "projects": ["project1", "project2"],
  "skills": ["skill1", "skill2"]
}
`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    const aiResponse = await askAi(messages);

    let parsed;
    try {
      const cleanResponse = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      parsed = JSON.parse(cleanResponse);
    } catch (err) {
      console.error("AI RAW RESPONSE:", aiResponse);
      return res.status(500).json({ message: "AI returned invalid JSON" });
    }

    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);

    // Safe projects
    let projectsArray = [];
    if (parsed.projects) {
      if (Array.isArray(parsed.projects)) projectsArray = parsed.projects;
      else if (typeof parsed.projects === "object")
        projectsArray = Object.values(parsed.projects).map((v) => v.toString());
      else projectsArray = [parsed.projects.toString()];
    }

    // Safe skills
    let skillsArray = [];
    if (parsed.skills) {
      if (Array.isArray(parsed.skills)) skillsArray = parsed.skills;
      else if (typeof parsed.skills === "object")
        skillsArray = Object.values(parsed.skills).map((v) => v.toString());
      else skillsArray = [parsed.skills.toString()];
    }

    res.json({
      role: parsed.role || "",
      experience: parsed.experience || "",
      projects: projectsArray,
      skills: skillsArray,
      resumeText,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    return res.status(500).json({ message: error.message });
  }
};

// ==============================
// Generate interview questions
// ==============================
export const generateQuestion = async (req, res) => {
  try {
    let { role, experience, mode, resumeText, projects, skills } = req.body;
    console.log(role);
    console.log(experience);
    console.log(mode);
    console.log(resumeText);
    console.log(projects);
    console.log(skills);

    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if (!role || !experience || !mode) {
      return res.status(400).json({
        message: "Role, Experience and Mode are required.",
      });
    }

    const user = await User.findById(req.userId);
    console.log("databse sy user nikala ");
    console.log(user);

    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.credits < 50) {
      return res.status(400).json({
        message: "Not enough credits. Minimum 50 required.",
      });
    }

    const projectText =
      Array.isArray(projects) && projects.length ? projects.join(", ") : "None";

    const skillsText =
      Array.isArray(skills) && skills.length ? skills.join(", ") : "None";

    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
Role:${role}
Experience:${experience}
InterviewMode:${mode}
Projects:${projectText}
Skills:${skillsText},
Resume:${safeResume}
`;

    // ✅ UPDATED QUESTION PROMPT
    const messages = [
      {
        role: "system",
        content: `
You are a real human interviewer conducting a professional interview.

Speak in simple, natural English as if you are directly talking to the candidate.

Generate exactly 5(five) interview questions.

Strict Rules:
- Each question must contain between 15 and 25 words.
- Each question must be a single complete sentence.
- Do NOT number them.
- Do NOT add explanations.
- Do NOT add extra text before or after.
- One question per line only.
- Keep language simple and conversational.
- Questions must feel practical and realistic.

Difficulty progression:
Question 1 → easy
Question 2 → easy
Question 3 → medium
Question 4 → medium
Question 5 → hard

Make questions based on the candidate’s role, experience, interviewMode, projects, skills, and resume details.
`,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const aiResponse = await askAi(messages);
    console.log(aiResponse);
    const questionsArray = aiResponse
      .replace(/\r\n/g, "\n") // normalize Windows line breaks
      .split(/\n+/) // split by one or more newlines
      .map((q) => q.trim()) // trim extra spaces
      .filter((q) => q.length > 0) // remove empty lines
      .slice(0, 5) // max 5 questions
      .map((q, i) => `${i + 1}. ${q}`); // add numbering manually

    console.log(questionsArray);
    if (questionsArray.length === 0) {
      return res.status(500).json({
        message: "AI failed to generate questions.",
      });
    }

    user.credits -= 50;
    await user.save();

    const interview = await Interview.create({
      userId: user._id,
      role,
      experience,
      mode,
      resumeText: safeResume,
      questions: questionsArray.map((q, index) => ({
        question: q,
        difficulty: ["easy", "easy", "medium", "medium", "hard"][index],
        timeLimit: [60, 60, 90, 90, 120][index],
      })),
    });

    res.json({
      interviewId: interview._id,
      creditsLeft: user.credits,
      userName: user.name,
      questions: interview.questions,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to generate questions: ${error}`,
    });
  }
};

// ==============================
// Submit answer
// ==============================
export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, timeTaken } = req.body;

    const interview = await Interview.findById(interviewId);
    const question = interview.questions[questionIndex];

    if (!answer || timeTaken > question.timeLimit) {
      question.score = 0;
      question.feedback = !answer
        ? "You did not submit an answer."
        : "Time limit exceeded.";
      question.answer = answer || "";
      await interview.save();
      return res.json({ feedback: question.feedback });
    }

    // ✅ UPDATED EVALUATION PROMPT
    const messages = [
      {
        role: "system",
        content: `
You are a professional human interviewer evaluating a candidate's answer in a real interview.

Evaluate naturally and fairly, like a real person would.

Score the answer in these areas (0 to 10):

1. Confidence – Does the answer sound clear, confident, and well-presented?
2. Communication – Is the language simple, clear, and easy to understand?
3. Correctness – Is the answer accurate, relevant, and complete?

Rules:
- Be realistic and unbiased.
- Do not give random high scores.
- If the answer is weak, score low.
- If the answer is strong and detailed, score high.
- Consider clarity, structure, and relevance.

Calculate:
finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

Feedback Rules:
- Write natural human feedback.
- 10 to 15 words only.
- Sound like real interview feedback.
- Can suggest improvement if needed.
- Do NOT repeat the question.
- Do NOT explain scoring.
- Keep tone professional and honest.

Return ONLY valid JSON in this format:

{
  "confidence": number,
  "communication": number,
  "correctness": number,
  "finalScore": number,
  "feedback": "short human feedback"
}
`,
      },
      {
        role: "user",
        content: `
Question: ${question.question}
Answer: ${answer}
`,
      },
    ];

    const aiResponse = await askAi(messages);

    let parsed;
    try {
      const cleanResponse = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      parsed = JSON.parse(cleanResponse);
    } catch (err) {
      return res.status(500).json({ message: "Invalid AI response" });
    }

    question.answer = answer;
    question.confidence = parsed.confidence || 0;
    question.communication = parsed.communication || 0;
    question.correctness = parsed.correctness || 0;
    question.score = parsed.finalScore || 0;
    question.feedback = parsed.feedback || "";

    await interview.save();

    return res.status(200).json({ feedback: parsed.feedback });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to submit answer: ${error}`,
    });
  }
};
// ==============================
// Finish interview
// ==============================
export const finishInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(400).json({ message: "Interview not found" });
    }

    const totalQuestions = interview.questions.length;
    const totalScore = interview.questions.reduce(
      (sum, q) => sum + (q.score || 0),
      0,
    );

    const avgConfidence =
      interview.questions.reduce((sum, q) => sum + (q.confidence || 0), 0) /
      totalQuestions;
    const avgCommunication =
      interview.questions.reduce((sum, q) => sum + (q.communication || 0), 0) /
      totalQuestions;
    const avgCorrectness =
      interview.questions.reduce((sum, q) => sum + (q.correctness || 0), 0) /
      totalQuestions;

    interview.finalScore = totalScore / totalQuestions;
    interview.status = "completed";
    await interview.save();

    res.status(200).json({
      finalScore: Number((totalScore / totalQuestions).toFixed(1)),
      confidence: Number(avgConfidence.toFixed(1)),
      communication: Number(avgCommunication.toFixed(1)),
      correctness: Number(avgCorrectness.toFixed(1)),
      questionWiseScore: interview.questions.map((q) => ({
        question: q.question,
        score: q.score || 0,
        feedback: q.feedback || "",
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to finish interview: ${error}` });
  }
};

// ==============================
// Get My Interviews
// ==============================
export const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select("role experience mode finalScore status createdAt");

    return res.status(200).json(interviews);
  } catch (error) {
    return res.status(500).json({
      message: `Failed to find currentUser Interview: ${error}`,
    });
  }
};

// ==============================
// Get Interview Report
// ==============================
export const getInterviewReport = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    const totalQuestions = interview.questions.length;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    const avgConfidence = totalQuestions ? totalConfidence / totalQuestions : 0;
    const avgCommunication = totalQuestions
      ? totalCommunication / totalQuestions
      : 0;
    const avgCorrectness = totalQuestions
      ? totalCorrectness / totalQuestions
      : 0;

    return res.json({
      finalScore: interview.finalScore,
      confidence: Number(avgConfidence.toFixed(1)),
      communication: Number(avgCommunication.toFixed(1)),
      correctness: Number(avgCorrectness.toFixed(1)),
      questionWiseScore: interview.questions,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to find currentUser Interview report: ${error}`,
    });
  }
};
