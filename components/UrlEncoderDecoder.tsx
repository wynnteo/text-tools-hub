'use client';
import { useState , useEffect } from 'react';

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [encodeMethod, setEncodeMethod] = useState<'uri' | 'component'>('component');
  const [options, setOptions] = useState({
    autoEncode: false,
    autoDecode: false,
    preserveSpaces: true,
  });

  const urlEncode = () => {
    try {
      let result = input;
      if (!options.preserveSpaces) {
        result = result.replace(/\s+/g, '');
      }
      setOutput(
        encodeMethod === 'uri' 
          ? encodeURI(result) 
          : encodeURIComponent(result)
      );
      setError('');
    } catch (e) {
      setError('Invalid URL input');
    }
  };

  const urlDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError('');
    } catch (e) {
      setError('Invalid URL encoding');
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

  useEffect(() => {
    if (options.autoEncode) {
      urlEncode();
    } else if (options.autoDecode) {
      urlDecode();
    }
  }, [input, options.autoEncode, options.autoDecode]);

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
          <h3 className="font-semibold mb-2">URL Encoder/Decoder Guide</h3>
          <p className="mb-3">Encode and decode URLs with advanced options. Common use cases:</p>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 Conversion Options:</p>
              <ul className="list-disc list-inside ml-2">
                <li className="mb-2">
                  <span className="font-semibold">encodeURI</span>: Encodes full URLs, preserving valid characters.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">encodeURIComponent</span>: Encodes URL components, including special characters.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Auto-Encode/Decode</span>: Automatically encode or decode as you type.
                </li>
                <li className="mb-2">
                  <span className="font-semibold">Space Handling</span>: Preserve or remove spaces during encoding.
                </li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Note: 
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Supports complex URLs with query parameters</li>
                <li>Handles special characters and spaces</li>
                <li>Real-time preview of encoded/decoded URLs</li>
              </ul>
            </div>

            <div className="mt-2">
              <p className="font-medium">Example:</p>
              <code className="block p-2 bg-gray-100 rounded mt-1">
                Original: <span className="text-blue-600">https://example.com?q=hello world</span><br/>
                Encoded: <span className="text-green-600">https://example.com?q=hello%20world</span><br/>
                Decoded: <span className="text-green-600">https://example.com?q=hello world</span>
              </code>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">URL Encoder/Decoder</h2>
      
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter URL to encode/decode..."
        className="w-full p-3 border rounded-lg mb-4 h-48 font-mono"
      />

      {/* New Conversion Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setOptions(p => ({...p, autoEncode: !p.autoEncode, autoDecode: false}))}
          className={`p-2 cursor-pointer rounded ${
            options.autoEncode
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.autoEncode ? 'Auto-Encode On' : 'Auto-Encode'}
        </button>
        <button
          onClick={() => setOptions(p => ({...p, autoDecode: !p.autoDecode, autoEncode: false}))}
          className={`p-2 cursor-pointer rounded ${
            options.autoDecode
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.autoDecode ? 'Auto-Decode On' : 'Auto-Decode'}
        </button>
        <button
          onClick={() => setOptions(p => ({...p, preserveSpaces: !p.preserveSpaces}))}
          className={`p-2 cursor-pointer rounded ${
            options.preserveSpaces
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.preserveSpaces ? 'Preserve Spaces' : 'Remove Spaces'}
        </button>
        <button
          onClick={resetFields}
          className="p-2 cursor-pointer rounded bg-red-100 hover:bg-red-200 text-red-600"
        >
          Reset
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={urlEncode}
            className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Encode
          </button>
          <button
            onClick={urlDecode}
            className="bg-gray-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Decode
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Encode Method:</label>
          <select
            value={encodeMethod}
            onChange={(e) => setEncodeMethod(e.target.value as 'uri' | 'component')}
            className="p-2 border rounded"
          >
            <option value="uri">encodeURI</option>
            <option value="component">encodeURIComponent</option>
          </select>
        </div>
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
              className="bg-gray-200 cursor-pointer px-4 py-2 rounded hover:bg-gray-300"
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