'use client';
import { useState } from 'react';

export default function HtmlEncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [options, setOptions] = useState({
    encodeAll: false,
    minify: false,
    beautify: false,
  });

  const htmlEncode = () => {
    try {
      const encoded = options.encodeAll
        ? input.replace(/[^\w\s]/g, (char) => `&#${char.charCodeAt(0)};`)
        : input.replace(/[\u00A0-\u9999<>&]/g, (char) => `&#${char.charCodeAt(0)};`);
      setOutput(encoded);
      setError('');
    } catch (e) {
      setError('Invalid HTML input');
    }
  };

  const htmlDecode = () => {
    try {
      const textArea = document.createElement('textarea');
      textArea.innerHTML = input;
      setOutput(textArea.value);
      setError('');
    } catch (e) {
      setError('Invalid HTML entities');
    }
  };

  const formatHtml = () => {
    try {
      let formatted = input
        .replace(/(>)(<)(\/*)/g, '$1\n$2$3') // Add newlines between tags
        .replace(/^\s+|\s+$/g, ''); // Trim whitespace

      if (options.minify) {
        formatted = formatted.replace(/\s+/g, ' ').replace(/\s?>\s?</g, '><');
      } else if (options.beautify) {
        formatted = formatted
          .replace(/(<[^>]+>)/g, '\n$1\n') // Add newlines around tags
          .replace(/\n+/g, '\n') // Remove extra newlines
          .trim();
      }

      setOutput(formatted);
      setError('');
    } catch (e) {
      setError('Invalid HTML for formatting');
    }
  };

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
    setError('');
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
          <h3 className="font-semibold mb-2">HTML Encoder/Decoder Guide</h3>
          <p className="mb-3">Encode, decode, and format HTML. Common use cases:</p>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 Conversion Options:</p>
              <ul className="list-disc list-inside ml-2">
                <li className="mb-2">
                  <span className="font-semibold">Encode</span>: Convert special characters to HTML entities.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Decode</span>: Convert HTML entities back to text.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Format</span>: Beautify or minify HTML code.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Advanced Encoding</span>: Encode all non-alphanumeric characters.
                </li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Note: 
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Supports multiline HTML and complex structures</li>
                <li>Preserves or removes spacing based on settings</li>
                <li>Real-time preview of encoded/decoded HTML</li>
              </ul>
            </div>

            <div className="mt-2">
              <p className="font-medium">Example:</p>
              <code className="block p-2 bg-gray-100 rounded mt-1">
                Original: <span className="text-blue-600">&lt;div&gt;Hello World!&lt;/div&gt;</span><br/>
                Encoded: <span className="text-green-600">&amp;lt;div&amp;gt;Hello World!&amp;lt;/div&amp;gt;</span><br/>
                Decoded: <span className="text-green-600">&lt;div&gt;Hello World!&lt;/div&gt;</span>
              </code>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">HTML Encoder/Decoder</h2>
      
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter HTML to encode/decode..."
        className="w-full p-3 border rounded-lg mb-4 h-48 font-mono"
      />

      {/* New Conversion Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setOptions(p => ({...p, encodeAll: !p.encodeAll}))}
          className={`p-2 rounded ${
            options.encodeAll
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.encodeAll ? 'Encode All' : 'Basic Encode'}
        </button>
        <button
          onClick={() => setOptions(p => ({...p, minify: !p.minify, beautify: false}))}
          className={`p-2 rounded ${
            options.minify
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Minify HTML
        </button>
        <button
          onClick={() => setOptions(p => ({...p, beautify: !p.beautify, minify: false}))}
          className={`p-2 rounded ${
            options.beautify
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Beautify HTML
        </button>
        <button
          onClick={resetFields}
          className="p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={htmlEncode}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Encode
        </button>
        <button
          onClick={htmlDecode}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Decode
        </button>
        <button
          onClick={formatHtml}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Format HTML
        </button>
      </div>

      {error && (
        <div className="bg-red-100 p-4 rounded-lg mb-4 text-red-700">
          {error}
        </div>
      )}

      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-700">Result:</label>
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-50 h-48 font-mono"
          />
        </div>
      )}
    </div>
  );
}