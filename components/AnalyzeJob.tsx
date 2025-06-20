'use client';
import { useState } from 'react';

export default function AnalyzeJob() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [isMocked, setIsMocked] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const analyze = async () => {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ description }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setResult(data.result);
    setIsMocked(data.mocked);
    setShowAlert(true); // Reset alert on new analysis
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <textarea
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Paste job description here..."
      />
      <button
        onClick={analyze}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mt-3 rounded-md transition-colors"
      >
        Analyze
      </button>

      {result && (
        <div className="mt-6 p-4 border bg-gray-50 rounded-md shadow-sm">
          <h2 className="font-semibold text-lg mb-3">AI Analysis</h2>

          {isMocked && showAlert && (
            <div className="relative bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-4">
              <span className="block sm:inline">
                ⚠️ This is a <strong>mocked response</strong>. The OpenAI API quota was exceeded.
              </span>
              <button
                onClick={() => setShowAlert(false)}
                className="absolute top-1 right-2 text-yellow-700 hover:text-yellow-900"
              >
                ×
              </button>
            </div>
          )}

          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">{result}</pre>
        </div>
      )}
    </div>
  );
}
