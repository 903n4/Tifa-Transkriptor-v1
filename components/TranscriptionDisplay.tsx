
import React, { useState } from 'react';
import { Copy, Check } from './Icons';

interface TranscriptionDisplayProps {
  text: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full">
        <h2 className="text-2xl font-bold text-teal-300 mb-4">Transcription Result</h2>
      <div className="bg-gray-900/70 rounded-xl p-4 md:p-6 border border-gray-700 max-h-[50vh] overflow-y-auto">
        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed font-mono text-sm">
          {text}
        </p>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-0 right-0 mt-4 mr-4 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        aria-label="Copy transcription"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-400" />
        ) : (
          <Copy className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default TranscriptionDisplay;
