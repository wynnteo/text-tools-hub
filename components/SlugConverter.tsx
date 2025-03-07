'use client';
import { useState, useEffect } from 'react';

export default function SlugConverter() {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');
  const [options, setOptions] = useState({
    separator: '-',
    preserveCase: false,
    trim: true
  });

  const convertToSlug = (text: string) => {
    return text
      .normalize("NFD") // Normalize diacritics
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .replace(/[^\w\s-]/g, '') // Remove special characters
      [options.preserveCase ? 'toString' : 'toLowerCase']() // Conditional case
      .replace(/[\s_]+/g, options.separator) // Replace spaces/underscores with separator
      .replace(/-+/g, options.separator) // Replace multiple separators
      .replace(options.trim ? /^-+|-+$/g : /$/g, ''); // Conditional trim
  };

  useEffect(() => {
    setSlug(convertToSlug(input));
  }, [input, options]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(slug);
      alert('Copied to clipboard!');
    } catch (error) {
      alert('Failed to copy!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* New Instructions Section */}
      <details className="mb-6 group">
        <summary className="flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700">
          <span className="mr-2">📘 How to Use</span>
          <svg className="w-4 h-4 transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Slug Converter Guide</h3>
          <p className="mb-3">Create SEO-friendly URL slugs. Common use cases:</p>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 Conversion Features:</p>
              <ul className="list-disc list-inside ml-2">
                <li className="mb-2">
                  <span className="font-semibold">Smart Formatting</span>: Handles special characters, spaces, and diacritics
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Custom Separators</span>: Choose between hyphens or underscores
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Case Options</span>: Preserve original case or force lowercase
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Trim Control</span>: Optionally keep leading/trailing separators
                </li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Note: 
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Supports multilingual text and special characters</li>
                <li>Maintains URL-safe formatting</li>
                <li>Real-time conversion as you type</li>
              </ul>
            </div>

            <div className="mt-2">
              <p className="font-medium">Example:</p>
              <code className="block p-2 bg-gray-100 rounded mt-1">
                Original: <span className="text-blue-600">Hello Wörld! 2024 Report</span><br/>
                Slug: <span className="text-green-600">hello-world-2024-report</span><br/>
                With Underscores: <span className="text-green-600">hello_world_2024_report</span>
              </code>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">Slug Converter</h2>
      
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to convert"
        className="w-full p-3 border rounded-lg mb-4"
      />

      {/* New Conversion Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setOptions(p => ({...p, separator: '-'}))}
          className={`p-2 cursor-pointer rounded ${
            options.separator === '-' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Hyphen Separator
        </button>
        <button
          onClick={() => setOptions(p => ({...p, separator: '_'}))}
          className={`p-2 cursor-pointer rounded ${
            options.separator === '_' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Underscore Separator
        </button>
        <button
          onClick={() => setOptions(p => ({...p, preserveCase: !p.preserveCase}))}
          className={`p-2 cursor-pointer rounded ${
            options.preserveCase 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.preserveCase ? 'Case Preserved' : 'Force Lowercase'}
        </button>
        <button
          onClick={() => setOptions(p => ({...p, trim: !p.trim}))}
          className={`p-2 cursor-pointer rounded ${
            options.trim 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.trim ? 'Trimming Enabled' : 'Trimming Disabled'}
        </button>
      </div>

      {slug && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-700">Generated Slug:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setInput(slug)}
                className="bg-gray-200 cursor-pointer px-4 py-2 rounded hover:bg-gray-300"
              >
                Edit Slug
              </button>
              <button
                onClick={copyToClipboard}
                className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Copy
              </button>
            </div>
          </div>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-50"
          />
          <div className="mt-2 text-sm text-gray-500">
            Character Count: {slug.length} | Word Count: {slug.split(options.separator).filter(Boolean).length}
          </div>
        </div>
      )}
    </div>
  );
}