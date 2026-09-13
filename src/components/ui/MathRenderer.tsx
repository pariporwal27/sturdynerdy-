'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  formula: string;
  block?: boolean;
  className?: string;
}

export function MathRenderer({ formula, block = false, className = '' }: MathRendererProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (err) {
      console.warn('KaTeX render error:', err);
      return formula;
    }
  }, [formula, block]);

  return (
    <span
      className={`inline-math font-mono ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * TextWithMath: Parses text containing $...$ or $$...$$ and renders with KaTeX
 */
export function TextWithMath({ text, className = '' }: { text: string; className?: string }) {
  const parts = useMemo(() => {
    if (!text) return [];
    // Split by $$...$$ or $...$
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    const tokens = text.split(regex);

    return tokens.map((part, idx) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const raw = part.slice(2, -2).trim();
        return <MathRenderer key={idx} formula={raw} block={true} className="my-2 block text-center" />;
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const raw = part.slice(1, -1).trim();
        return <MathRenderer key={idx} formula={raw} block={false} />;
      } else {
        return <span key={idx}>{part}</span>;
      }
    });
  }, [text]);

  return <div className={`leading-relaxed ${className}`}>{parts}</div>;
}
