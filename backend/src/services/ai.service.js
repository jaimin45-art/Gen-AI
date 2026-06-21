const OpenAI = require("openai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100)
        .describe("A score between 0 to 100 indicating how well the candidate's profile matches the job description"),
    techincalQuestion: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("At least 5 technical questions covering DSA, system design, coding etc."),
    behavioralQuestion: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("At least 5 behavioral questions covering communication, teamwork, leadership etc."),
    skillsGap: z.array(z.object({
        skill: z.string().describe("The skill that candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("How much this gap impacts selection chances")
    })).describe("At least 5 skill gaps based on job description vs resume"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("Day number of the preparation plan, starting from 1"),
        focus: z.string().describe("Main focus area for this day"),
        tasks: z.array(z.string()).describe("List of specific tasks to do on this day")
    })).describe("A day-wise preparation roadmap, at least 5 days, helping candidate prepare for this interview")
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate based on the following information:
    Job Description: ${jobDescription}
    Resume: ${resume}
    Self Description: ${selfDescription}
    
    You MUST return a JSON object with EXACTLY these fields and no other fields:
    - matchScore: number between 0-100
    - techincalQuestion: array of objects with fields: question, intention, answer (minimum 5)
    - behavioralQuestion: array of objects with fields: question, intention, answer (minimum 5)
    - skillsGap: array of objects with fields: skill, severity (low/medium/high) (minimum 5)
    - preparationPlan: array of objects with fields: day (number), focus (string), tasks (array of strings) (minimum 5 days)
    
    Do NOT add any extra fields. Do NOT return a schema. Return actual data only.
    `;

    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `You are an expert technical interviewer. 
                Return ONLY a valid JSON object with actual interview data.
                Do NOT return a JSON schema.
                Do NOT include $schema, type, properties, or required fields.
                Return real values, not schema definitions.
                Field names must be exactly: matchScore, techincalQuestion, behavioralQuestion, skillsGap, preparationPlan.`
            },
            {
                role: "user",
                content: prompt
            }
        ],
        response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
}

const PDFDocument = require("pdfkit");

async function generateResumePdf({ resume, jobDescription, selfDescription }) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const buffers = [];

            doc.on("data", (chunk) => buffers.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(buffers)));
            doc.on("error", reject);

            doc.fontSize(20).text("Tailored Resume", { align: "center" });
            doc.moveDown();

            doc.fontSize(12).fillColor("black").text(resume, {
                align: "left"
            });

            doc.end();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { generateInterviewReport, generateResumePdf };