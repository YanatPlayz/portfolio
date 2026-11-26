"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      className="copy-button"
      aria-label={copied ? "Copied" : `Copy ${label}`}
      title={copied ? "Copied" : `Copy ${label}`}
      onClick={() => {
        navigator.clipboard.writeText(value).then(() => setCopied(true));
      }}
    >
      {copied ? (
        <Check size={14} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Copy size={14} strokeWidth={2} aria-hidden="true" />
      )}
    </button>
  );
}
