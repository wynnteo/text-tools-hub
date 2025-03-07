'use client';
import { useState, useEffect } from 'react';

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeCase, setActiveCase] = useState<
    'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab' | 'alternating'
  >('upper');
  const [options, setOptions] = useState({
    autoConvert: true,
    preserveSpacing: true,
  });

  useEffect(() => {
    if (!options.autoConvert) return;

    let processedInput = input;
    if (!options.preserveSpacing) {
      processedInput = processedInput.replace(/\s+/g, ' ').trim();
    }

    const convert = () => {
      switch (activeCase) {
        case 'upper':
          return processedInput.toUpperCase();
        case 'lower':
          return processedInput.toLowerCase();
        case 'title':
          return processedInput.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          );
        case 'sentence':
          return processedInput.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => 
            match.toUpperCase()
          );
        case 'camel':
          return processedInput
            .toLowerCase()
            .replace(/ (.)/g, (_, chr) => chr.toUpperCase())
            .replace(/ /g, '');
        case 'snake':
          return processedInput.replace(/ /g, '_').toLowerCase();
        case 'kebab':
          return processedInput.replace(/ /g, '-').toLowerCase();
        case 'alternating':
          return processedInput
            .split('')
            .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
            .join('');
        default:
          return processedInput;
      }
    };

    setOutput(convert());
  }, [input, activeCase, options]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    } catch (error) {
      alert('Failed to copy!');
    }
  };

  const resetFields = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <details className="mb-6 group">
        <summary className="flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700">
          <span className="mr-2">📘 How to Use</span>
          <svg className="w-4 h-4 transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Case Converter Guide</h3>
          <p className="mb-3">Advanced text case conversion with real-time preview</p>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 New Features:</p>
              <ul className="list-disc list-inside ml-2">
                <li className="mb-2">CamelCase, snake_case, and kebab-case support</li>
                <li className="mb-2">Alternating case (e.g., aLtErNaTiNg)</li>
                <li className="mb-2">Auto-conversion toggle</li>
                <li className="mb-2">Space preservation control</li>
                <li className="mb-2">Real-time character/word counts</li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Pro Tip: Use the "Preserve Spacing" option to maintain original formatting 
              when working with code or structured text.
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">Advanced Case Converter</h2>
      
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to convert"
        className="w-full p-3 border rounded-lg mb-4 h-32"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setActiveCase('upper')}
          className={`p-2 cursor-pointer rounded ${activeCase === 'upper' ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          UPPERCASE
        </button>
        <button
          onClick={() => setActiveCase('lower')}
          className={`p-2 cursor-pointer rounded ${activeCase === 'lower' ? 'bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          lowercase
        </button>
        <button
          onClick={() => setActiveCase('title')}
          className={`p-2 cursor-pointer rounded ${activeCase === 'title' ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Title Case
        </button>
        <button
          onClick={() => setActiveCase('sentence')}
          className={`p-2 cursor-pointer rounded ${activeCase === 'sentence' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Sentence
        </button>
        <button
          onClick={() => setActiveCase('camel')}
          className={`p-2 cursor-pointer rounded ${activeCase === 'camel' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          camelCase
        </button>
        <button
          onClick={() => setActiveCase('snake')}
          className={`p-2 cursor-pointer rounded ${activeCase === 'snake' ? 'bg-orange-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          snake_case
        </button>
        <button
          onClick={() => setActiveCase('kebab')}
          className={`p-2 cursor-pointer rounded ${activeCase === 'kebab' ? 'bg-pink-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          kebab-case
        </button>
        <button
          onClick={() => setActiveCase('alternating')}
          className={`p-2 cursor-pointer rounded ${activeCase === 'alternating' ? 'bg-teal-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          AlTeRnAtInG
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={() => setOptions(p => ({...p, autoConvert: !p.autoConvert}))}
          className={`p-2 cursor-pointer rounded ${options.autoConvert ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          {options.autoConvert ? 'Auto Convert ✔' : 'Enable Auto-Convert'}
        </button>
        <button
          onClick={() => setOptions(p => ({...p, preserveSpacing: !p.preserveSpacing}))}
          className={`p-2 cursor-pointer rounded ${options.preserveSpacing ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          {options.preserveSpacing ? 'Preserve Spaces' : 'Trim Spaces'}
        </button>
      </div>

      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="space-y-1">
              <label className="text-gray-700 block">Converted Text:</label>
              <div className="text-sm text-gray-500">
                Characters: {output.length} | Words: {output.split(/\s+/).filter(Boolean).length}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetFields}
                className="bg-red-100 px-4 py-2 cursor-pointer rounded hover:bg-red-200 text-red-600"
              >
                Reset
              </button>
              <button
                onClick={copyToClipboard}
                className="bg-gray-200 px-4 py-2 cursor-pointer rounded hover:bg-gray-300"
              >
                Copy
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full p-3 border cursor-pointer rounded-lg bg-gray-50 h-32"
          />
        </div>
      )}
    </div>
  );
}