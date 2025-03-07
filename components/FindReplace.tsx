'use client';
import { useState, useEffect } from 'react';

export default function FindReplace() {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [matches, setMatches] = useState<number>(0);
  const [autoReplace, setAutoReplace] = useState(false);

  // Escape regex special characters if not using regex
  const escapeRegExp = (string: string) => {
    return useRegex ? string : string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Perform find and replace
  const replaceText = () => {
    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(escapeRegExp(find), flags);
      return text.replace(regex, replace);
    } catch (error) {
      return 'Invalid regex pattern!';
    }
  };

  // Count matches
  useEffect(() => {
    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(escapeRegExp(find), flags);
      setMatches((text.match(regex) || []).length);
    } catch (error) {
      setMatches(0);
    }
  }, [text, find, caseSensitive, useRegex]);

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(replaceText());
      alert('Copied to clipboard!');
    } catch (error) {
      alert('Failed to copy text');
    }
  };

  // Download modified text
  const downloadText = () => {
    const blob = new Blob([replaceText()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modified-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Instructions Section */}
      <details className="mb-6 group">
        <summary className="flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700">
          <span className="mr-2">📘 How to Use</span>
          <svg className="w-4 h-4 transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Find & Replace Guide</h3>
          <div className="space-y-3 text-sm">
            <p>Quickly find and replace text with advanced options:</p>
            <ul className="list-disc list-inside ml-2">
              <li>Case-sensitive search</li>
              <li>Regex support</li>
              <li>Real-time preview</li>
              <li>Match counting</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mt-3">🔧 Features:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Auto-replace mode</li>
                  <li>Download modified text</li>
                  <li>Copy to clipboard</li>
                  <li>Match highlighting</li>
                </ul>
              </div>

              <div className="p-3 bg-yellow-50 rounded">
                <p className="font-medium">⚠️ Notes:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Regex patterns must be valid</li>
                  <li>Case-sensitive applies to find only</li>
                  <li>Preserves original formatting</li>
                </ul>
              </div>
            </div>

            <div className="mt-2">
              <p className="font-medium">Example:</p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="p-2 bg-gray-100 rounded">
                  Find: <span className="text-blue-600">world</span><br/>
                  Replace: <span className="text-green-600">planet</span>
                </div>
                <div className="p-2 bg-gray-100 rounded">
                  Input: Hello <span className="text-red-600">world</span><br/>
                  Output: Hello <span className="text-green-600">planet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">Find & Replace</h2>

      {/* Controls Section */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 font-medium">Find:</label>
          <input
            type="text"
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder="Enter text or regex..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Replace:</label>
          <input
            type="text"
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            placeholder="Enter replacement text..."
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="h-4 w-4"
          />
          Case-sensitive
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
            className="h-4 w-4"
          />
          Use Regex
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoReplace}
            onChange={(e) => setAutoReplace(e.target.checked)}
            className="h-4 w-4"
          />
          Auto-replace
        </label>
      </div>

      {/* Text Areas */}
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Original Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            className="w-full p-3 border rounded-lg h-48 font-mono text-sm"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Modified Text:</label>
          <div className="p-3 border rounded-lg bg-gray-50">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {replaceText().split('\n').map((line, i) => (
                <div key={i} className="mb-1">
                  {line.split(new RegExp(escapeRegExp(find), caseSensitive ? 'g' : 'gi')).map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <span className="bg-yellow-200">{find}</span>
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={copyToClipboard}
          className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Copy Modified Text
        </button>
        <button
          onClick={downloadText}
          className="bg-gray-200 px-4 py-2 cursor-pointer rounded hover:bg-gray-300"
        >
          Download
        </button>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-gray-600">Matches:</span>
          <span className="font-semibold">{matches}</span>
        </div>
      </div>
    </div>
  );
}