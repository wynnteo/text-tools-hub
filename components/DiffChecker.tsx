'use client';
import { useState, useEffect } from 'react';
import { diffChars, diffLines } from 'diff';

export default function DiffChecker() {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [diffs, setDiffs] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'inline' | 'side-by-side'>('inline');
  const [diffMethod, setDiffMethod] = useState<'chars' | 'lines'>('chars');
  const [autoCheck, setAutoCheck] = useState(true);

  // Real-time comparison with debounce
  useEffect(() => {
    if (!autoCheck) return;
    const timer = setTimeout(() => compareTexts(), 300);
    return () => clearTimeout(timer);
  }, [leftText, rightText, diffMethod]);

  const compareTexts = () => {
    const diffFunction = diffMethod === 'chars' ? diffChars : diffLines;
    setDiffs(diffFunction(leftText, rightText));
  };

  const swapTexts = () => {
    [leftText, rightText].reverse();
    setLeftText(rightText);
    setRightText(leftText);
  };

  const countChanges = () => {
    return diffs.reduce((acc, diff) => ({
      added: acc.added + (diff.added ? 1 : 0),
      removed: acc.removed + (diff.removed ? 1 : 0)
    }), { added: 0, removed: 0 });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (error) {
      alert('Failed to copy!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
      {/* Instructions Section */}
      <details className="mb-6 group">
        <summary className="flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700">
          <span className="mr-2">📘 How to Use</span>
          <svg className="w-4 h-4 transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Diff Checker Guide</h3>
          <div className="space-y-3 text-sm">
            <p>Compare two text versions to see differences. Ideal for:</p>
            <ul className="list-disc list-inside ml-2">
              <li>Code changes</li>
              <li>Document revisions</li>
              <li>Content updates</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mt-3">🔧 Features:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Character/line level comparison</li>
                  <li>Real-time updates</li>
                  <li>Side-by-side view</li>
                  <li>Change statistics</li>
                </ul>
              </div>

              <div className="p-3 bg-yellow-50 rounded">
                <p className="font-medium">⚠️ Notes:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Green = Added content</li>
                  <li>Red = Removed content</li>
                  <li>Case-sensitive comparison</li>
                </ul>
              </div>
            </div>

            <div className="mt-2">
              <p className="font-medium">Example:</p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="p-2 bg-gray-100 rounded">
                  Original:<br/>
                  <span className="text-red-600">Hello</span> world
                </div>
                <div className="p-2 bg-gray-100 rounded">
                  Modified:<br/>
                  <span className="text-green-600">Hi</span> world
                </div>
              </div>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">Difference Checker</h2>

      {/* Controls Section */}
      <div className="flex flex-wrap gap-4 items-center">
        <button
          onClick={compareTexts}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={autoCheck}
        >
          {autoCheck ? 'Auto Comparing...' : 'Compare Texts'}
        </button>
        
        <button
          onClick={swapTexts}
          className="bg-gray-200 px-4 py-2 cursor-pointer rounded hover:bg-gray-300"
          title="Swap texts"
        >
          ↔️ Swap
        </button>

        <div className="flex items-center gap-2">
          <select
            value={diffMethod}
            onChange={(e) => setDiffMethod(e.target.value as 'chars' | 'lines')}
            className="p-2 border rounded"
          >
            <option value="chars">Character-level</option>
            <option value="lines">Line-level</option>
          </select>

          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'inline' | 'side-by-side')}
            className="p-2 border rounded"
          >
            <option value="inline">Inline View</option>
            <option value="side-by-side">Side-by-Side</option>
          </select>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoCheck}
            onChange={(e) => setAutoCheck(e.target.checked)}
            className="h-4 w-4"
          />
          Auto Compare
        </label>
      </div>

      {/* Text Areas */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Original Text</label>
          <textarea
            value={leftText}
            onChange={(e) => setLeftText(e.target.value)}
            className="w-full p-3 border rounded-lg h-64 font-mono text-sm"
            placeholder="Paste original text here..."
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Modified Text</label>
          <textarea
            value={rightText}
            onChange={(e) => setRightText(e.target.value)}
            className="w-full p-3 border rounded-lg h-64 font-mono text-sm"
            placeholder="Paste modified text here..."
          />
        </div>
      </div>

      {/* Diff Results */}
      {diffs.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Changes ({countChanges().added} additions, {countChanges().removed} deletions)
            </h3>
            <button
              onClick={() => copyToClipboard(leftText + '\n' + rightText)}
              className="bg-gray-200 px-4 py-2 cursor-pointer rounded hover:bg-gray-300"
            >
              Copy All
            </button>
          </div>

          {viewMode === 'inline' ? (
            <div className="border rounded p-4 bg-gray-50 font-mono whitespace-pre-wrap">
              {diffs.map((diff, i) => (
                <span
                  key={i}
                  className={
                    diff.added ? 'bg-green-200 p-0.5' : 
                    diff.removed ? 'bg-red-200 p-0.5 line-through' : ''
                  }
                >
                  {diff.value}
                </span>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded p-4 bg-gray-50">
                <div className="text-red-600 font-mono whitespace-pre-wrap">
                  {diffs.filter(d => d.removed).map((d, i) => (
                    <div key={i} className="bg-red-100 p-1 mb-1">- {d.value}</div>
                  ))}
                </div>
              </div>
              <div className="border rounded p-4 bg-gray-50">
                <div className="text-green-600 font-mono whitespace-pre-wrap">
                  {diffs.filter(d => d.added).map((d, i) => (
                    <div key={i} className="bg-green-100 p-1 mb-1">+ {d.value}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}