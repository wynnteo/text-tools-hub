'use client';
import { useState } from 'react';

export default function TextReverser() {
  const [input, setInput] = useState('');
  const [reversed, setReversed] = useState('');
  const [options, setOptions] = useState({
    preserveSpacing: true,
    reverseWords: false,
    reverseLines: false,
  });

  const reverseText = () => {
    let result = input;

    if (options.reverseLines) {
      result = result.split('\n').reverse().join('\n');
    }

    if (options.reverseWords) {
      result = result.split(' ').reverse().join(' ');
    }

    if (!options.preserveSpacing) {
      result = result.replace(/\s+/g, '');
    }

    result = result.split('').reverse().join('');
    setReversed(result);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reversed);
      alert('Copied to clipboard!');
    } catch (error) {
      alert('Failed to copy!');
    }
  };

  const resetFields = () => {
    setInput('');
    setReversed('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* How to Use Section */}
      <details className="mb-6 group">
        <summary className="flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700">
          <span className="mr-2">📘 How to Use</span>
          <svg className="w-4 h-4 transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Text Reverser Guide</h3>
          <p className="mb-3">Reverse text in various ways. Common use cases:</p>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 Conversion Options:</p>
              <ul className="list-disc list-inside ml-2">
                <li className="mb-2">
                  <span className="font-semibold">Full Reverse</span>: Reverses all characters.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Word Reverse</span>: Reverses the order of words.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Line Reverse</span>: Reverses the order of lines.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Trim Spaces</span>: Removes all spaces before reversing.
                </li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Note: 
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Supports multiline text and special characters</li>
                <li>Preserves or removes spacing based on settings</li>
                <li>Real-time preview of reversed text</li>
              </ul>
            </div>

            <div className="mt-2">
              <p className="font-medium">Example:</p>
              <code className="block p-2 bg-gray-100 rounded mt-1">
                Original: <span className="text-blue-600">Hello World!</span><br/>
                Full Reverse: <span className="text-green-600">!dlroW olleH</span><br/>
                Word Reverse: <span className="text-green-600">World! Hello</span>
              </code>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">Text Reverser</h2>
      
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to reverse"
        className="w-full p-3 border rounded-lg mb-4 h-32"
      />

      {/* New Conversion Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setOptions(p => ({...p, preserveSpacing: !p.preserveSpacing}))}
          className={`p-2 cursor-pointer rounded ${
            options.preserveSpacing
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.preserveSpacing ? 'Preserve Spaces' : 'Trim Spaces'}
        </button>
        <button
          onClick={() => setOptions(p => ({...p, reverseWords: !p.reverseWords}))}
          className={`p-2 cursor-pointer rounded ${
            options.reverseWords
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.reverseWords ? 'Words Reversed' : 'Reverse Words'}
        </button>
        <button
          onClick={() => setOptions(p => ({...p, reverseLines: !p.reverseLines}))}
          className={`p-2 cursor-pointer rounded ${
            options.reverseLines
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.reverseLines ? 'Lines Reversed' : 'Reverse Lines'}
        </button>
        <button
          onClick={resetFields}
          className="p-2 rounded bg-red-100 cursor-pointer hover:bg-red-200 text-red-600"
        >
          Reset
        </button>
      </div>

      <button
        onClick={reverseText}
        className="w-full bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700 mb-4"
      >
        Reverse Text
      </button>

      {reversed && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-700">Reversed Text:</label>
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 px-4 py-2 cursor-pointer rounded hover:bg-gray-300"
            >
              Copy
            </button>
          </div>
          <textarea
            value={reversed}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-50 h-32"
          />
        </div>
      )}
    </div>
  );
}