import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ChatRole = 'user' | 'model';

type ChatHistoryItem = {
  role: ChatRole;
  content: string;
};

const MODEL_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: 'GEMINI_API_KEY is not configured' }, { status: 500 });
  }

  try {
    const { message, history = [] }: { message?: string; history?: ChatHistoryItem[] } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ message: 'Message is required' }, { status: 400 });
    }

    const sanitizedHistory = Array.isArray(history)
      ? history.filter((item): item is ChatHistoryItem =>
          !!item && (item.role === 'user' || item.role === 'model') && typeof item.content === 'string'
        )
      : [];

    const contents = [...sanitizedHistory, { role: 'user', content: message }].map(item => ({
      role: item.role,
      parts: [{ text: item.content }],
    }));

    const systemInstruction = {
      parts: [
        {
          text: `You are the official InfySkill Assistant. Your sole purpose is to assist users with questions directly related to InfySkill, its courses, workshops, webinars, services, projects, contact information, and history.

Rules you MUST strictly follow:
1. ONLY answer questions that are related to InfySkill, its history, courses, webinars, workshops, team, final-year project guidance, resume building tool, code editor, portfolio generator, or contact details.
2. If a user asks a question that is NOT related to InfySkill (e.g. general programming questions, cooking, general knowledge, history of other topics, math, unrelated coding advice, etc.), you MUST politely decline to answer, explaining that you can only answer questions related to InfySkill and its educational tools and services.
3. Be professional, friendly, and helpful. Guide users to relevant links where appropriate (e.g., /courses, /workshops, /webinars, /projects, /contact, /create-resume, /portfolio-generator, /code).

Here is the context about InfySkill you should use to answer user questions:
- **About InfySkill**: Established in April 2023 (officially registered under the Ministry of Corporate Affairs, MCA). It started in November 2022 as MSP EduTech.
- **Founder & CEO**: V.Samara Simha Reddy.
- **Mission**: Bridge the gap between academic learning and real-world IT careers by providing high-quality, practical, and industry-relevant training, helping students get job-ready before graduation.
- **Recognitions & Certifications**: Recognized by AICTE, Startup India (DPIIT), and MSME. It is also ISO Certified.
- **Statistics**: Trained 7000+ students, placed 500+ students, collaborated with 10+ colleges, partnered with 10+ startups for internship opportunities.
- **Courses Offered**: Master programs in Python, Java, MySQL, MERN Stack Web Development, Data Science, Machine Learning, Artificial Intelligence, Cloud Computing, Ethical Hacking, Front-End Web Development, UI/UX Design, Finance, Digital Marketing, Human Resource Management, Stock Market, Psychology, IoT, Embedded Systems, Hybrid/Electric Vehicles, VLSI, Nano Technology, AutoCAD.
- **Free Telugu Courses (on YouTube)**: Python Programming, Java Programming, HTML & CSS, JavaScript.
- **Workshops Offered (Past)**: Web Development, Python, Machine Learning, Data Science, Android App Development, Cybersecurity, AI with Python, IoT with Arduino, Blockchain, UI/UX Design with Figma.
- **Webinars**: Resume Building Season (ATS-ready resume builder), Placement Guidance Sessions, Digital Presence Mastery.
- **Final Year Projects Support**: End-to-end project development, reports, documentation, source code, research paper inclusion, viva preparation, demo videos, 1-on-1 expert support. Covers CSE, ECE, EEE, Mechanical, Civil, IT, AI/ML, IoT, Web Dev, Cloud, Data Science, Python, Java, Embedded. Over 300+ satisfied students and 100+ projects delivered. Has 4.7 Google rating.
- **Contact Details**: 
  - Location: P822+6W9 Visakhapatnam, Andhra Pradesh, India.
  - Phones: +91 9080087187, +91 9347140822
  - Email: infyskilledutech@gmail.com
- **Website Tools**:
  - Resume Builder: /create-resume
  - Portfolio Builder: /portfolio-generator
  - Code Editor: /code
  - Verify Certificate: /insights`
        }
      ]
    };

    const response = await fetch(`${MODEL_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, systemInstruction }),
    });

    const data = await response.json();

    if (!response.ok) {
      const messageText = typeof data?.error?.message === 'string' ? data.error.message : 'Gemini request failed';
      return NextResponse.json({ message: messageText }, { status: response.status });
    }

    let reply = '';

    if (Array.isArray(data?.candidates)) {
      for (const candidate of data.candidates) {
        if (!candidate || typeof candidate !== 'object') {
          continue;
        }

        const parts = Array.isArray(candidate?.content?.parts) ? candidate.content.parts : [];
        const textPart = parts.find((part: any) => typeof part?.text === 'string' && part.text.trim().length > 0);
        if (textPart?.text) {
          reply = textPart.text.trim();
          break;
        }
      }
    }

    if (!reply && data?.promptFeedback?.blockReason === 'SAFETY') {
      reply = 'I am unable to respond to that request because it may violate safety guidelines.';
    }

    return NextResponse.json({ reply: reply || 'I am still learning. Please try asking in a different way.' });
  } catch (error) {
    console.error('Chatbot error', error);
    return NextResponse.json({ message: 'Unable to process your request right now.' }, { status: 500 });
  }
}
