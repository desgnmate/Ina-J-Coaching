"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/shared/Button";

type Question = {
  id: number;
  text: string;
  options: {
    label: string;
    value: "workshop" | "mastermind";
    description: string;
  }[];
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Where is your photography studio currently at?",
    options: [
      {
        label: "Building the foundations",
        value: "workshop",
        description:
          "I'm shooting and charging, but my positioning feels fuzzy and bookings are unpredictable.",
      },
      {
        label: "Ready for steady growth",
        value: "mastermind",
        description:
          "I have a business running, but I need deep accountability, pricing confidence, and active feedback.",
      },
    ],
  },
  {
    id: 2,
    text: "What is your primary marketing and sales bottleneck?",
    options: [
      {
        label: "No clear roadmap",
        value: "workshop",
        description:
          "I lack a consistent message and a practical 90-day plan I can actually maintain.",
      },
      {
        label: "Needs live feedback & review",
        value: "mastermind",
        description:
          "I need eyes on my sales process, direct feedback on my copy, and real-time strategic support.",
      },
    ],
  },
  {
    id: 3,
    text: "What level of support fits your current calendar?",
    options: [
      {
        label: "A focused, short reset",
        value: "workshop",
        description:
          "I want a 3-session live curriculum to reset my strategy without committing to a multi-month cohort.",
      },
      {
        label: "Deeper accountability container",
        value: "mastermind",
        description:
          "I want a close-knit group, ongoing reviews, and direct advice from Ina to apply systems in real-time.",
      },
    ],
  },
];

export function CoachingQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = intro, 1-3 = questions, 4 = results
  const [answers, setAnswers] = useState<("workshop" | "mastermind")[]>([]);

  const handleStart = () => {
    setCurrentStep(1);
    setAnswers([]);
  };

  const handleOptionSelect = (value: "workshop" | "mastermind") => {
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(QUESTIONS.length + 1); // Go to results
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
  };

  const workshopCount = answers.filter((a) => a === "workshop").length;
  const mastermindCount = answers.filter((a) => a === "mastermind").length;
  const recommendation =
    workshopCount >= mastermindCount ? "workshop" : "mastermind";

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-line bg-cream p-8 md:p-12 shadow-[0_22px_50px_-30px_rgba(68,53,61,0.22)]">
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <span className="eyebrow">Interactive Finder</span>
            <h3 className="display-3 mt-4 text-ink">Find your next step</h3>
            <p className="mt-4 text-ink-soft leading-relaxed max-w-md mx-auto">
              Answer 3 quick questions about your studio and workload, and get a
              tailored recommendation for which support structure fits your
              current season.
            </p>
            <div className="mt-8">
              <Button onClick={handleStart} variant="primary">
                Start the Quiz <span aria-hidden>→</span>
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep > 0 && currentStep <= QUESTIONS.length && (
          <motion.div
            key={`question-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <span className="text-[0.65rem] font-bold tracking-[0.2em] text-terracotta uppercase">
                Question {currentStep} of {QUESTIONS.length}
              </span>
              <div className="flex gap-1">
                {QUESTIONS.map((_, idx) => (
                  <span
                    key={_.id}
                    className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                      idx + 1 <= currentStep ? "bg-terracotta" : "bg-line"
                    }`}
                  />
                ))}
              </div>
            </div>

            <h4 className="font-display text-xl md:text-2xl text-ink leading-snug">
              {QUESTIONS[currentStep - 1].text}
            </h4>

            <div className="mt-8 space-y-4">
              {QUESTIONS[currentStep - 1].options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleOptionSelect(option.value)}
                  className="w-full text-left rounded-2xl border border-line bg-cream-warm/40 p-5 md:p-6 transition-all duration-300 hover:border-terracotta/40 hover:bg-cream-warm/80 hover:shadow-[0_8px_20px_-10px_rgba(68,53,61,0.12)] group"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line bg-cream group-hover:border-terracotta/60 group-hover:bg-cream">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-terracotta/80 transition-colors" />
                    </span>
                    <div>
                      <span className="font-display text-lg text-ink group-hover:text-terracotta transition-colors">
                        {option.label}
                      </span>
                      <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep > QUESTIONS.length && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Success checkmark</title>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <span className="eyebrow mt-5">Recommendation Result</span>
            <h3 className="display-3 mt-3 text-ink">
              We recommend the{" "}
              <span className="italic text-terracotta font-display">
                {recommendation === "workshop"
                  ? "Marketing Workshop"
                  : "Consistent Bookings Mastermind"}
              </span>
            </h3>

            <p className="mt-5 text-ink-soft max-w-md mx-auto leading-relaxed">
              {recommendation === "workshop"
                ? "Based on your focus on clarifying foundations, creating a 90-day plan, and a compact timeframe, the live 3-session Workshop is your ideal starting point."
                : "Since you are looking for long-term growth, active reviews on your materials, and high levels of direct strategy coaching, the Mastermind fits your next season best."}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Button
                href={
                  recommendation === "workshop" ? "/workshop" : "/mastermind"
                }
                variant="primary"
              >
                Explore the{" "}
                {recommendation === "workshop" ? "Workshop" : "Mastermind"}{" "}
                <span aria-hidden>→</span>
              </Button>
              <Button onClick={handleReset} variant="secondary">
                Take Quiz Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
