"use client";

import { useSyncExternalStore } from "react";

type Period = "morning" | "afternoon" | "evening" | "night";

const GREETINGS: Record<Period, [en: string, es: string, hi: string]> = {
  morning: ["good morning", "buenos días", "सुप्रभात"],
  afternoon: ["good afternoon", "buenas tardes", "नमस्ते"],
  evening: ["good evening", "buenas tardes", "नमस्ते"],
  night: ["zzz", "a mimir", "so jao"],
};

const LANGS = ["en", "es", "hi"] as const;

function getPeriod(): Period {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 23) return "evening";
  return "night";
}

const subscribe = () => () => {};

export function Greeting({ style }: { style?: React.CSSProperties }) {
  const period = useSyncExternalStore(subscribe, getPeriod, () => null);
  const words = period ? GREETINGS[period] : null;

  return (
    <div className="home-greeting appear" aria-label="Greetings" style={style}>
      {words?.map((word, i) => (
        <span key={LANGS[i]} lang={LANGS[i]}>
          {word}
          {i < words.length - 1 && ","}
        </span>
      ))}
    </div>
  );
}
