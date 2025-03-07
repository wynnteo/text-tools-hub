'use client';
import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver'; // For file downloads

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [file, setFile] = useState<File | null>(null);
  const [encodingType, setEncodingType] = useState<'utf-8' | 'ascii'>('utf-8');

  // Real-time conversion
  useEffect(() => {
    try {
      if (mode === 'encode') {
        const text = encodingType === 'utf-8' 
          ? unescape(encodeURIComponent(input)) 
          : input;
        setOutput(btoa(text));
      } else {
        const decoded = atob(input);
        setOutput(encodingType === 'utf-8' 
          ? decodeURIComponent(escape(decoded)) 
          : decoded);
      }
      setError('');
    } catch (e) {
      setError(`Invalid ${mode === 'encode' ? 'input' : 'Base64 string'}`);
    }
  }, [input, mode, encodingType]);

  // File-to-Base64 conversion
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size limiter (2MB)
    if (file.size > 2_000_000) {
      setError('File size exceeds 2MB limit');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result?.toString().split(',')[1] || '';
      setInput(base64);
      setMode('decode');
    };
    reader.readAsDataURL(file);
    setFile(file);
  };

  // Copy with feedback
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setError('Copied to clipboard!');
      setTimeout(() => setError(''), 2000);
    } catch {
      setError('Failed to copy');
    }
  };

  // Download decoded file or encoded result
  const downloadResult = () => {
    if (mode === 'encode') {
      const blob = new Blob([output], { type: 'text/plain' });
      saveAs(blob, 'encoded.txt');
    } else {
      const blob = new Blob([output], { type: 'application/octet-stream' });
      saveAs(blob, file ? file.name : 'decoded');
    }
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
          <h3 className="font-semibold mb-2">Base64 Converter Guide</h3>
          <p className="mb-3">Convert between text/files and Base64 encoding. Common use cases:</p>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 Encoding:</p>
              <ol className="list-decimal list-inside ml-2">
                <li className="mb-2">Type text or upload a file</li>
                <li className="mb-2">Select encoding type (UTF-8 for special characters)</li>
                <li>Copy/download the Base64 result</li>
              </ol>
            </div>

            <div>
              <p className="font-medium">🔍 Decoding:</p>
              <ol className="list-decimal list-inside ml-2">
                <li className="mb-2">Paste a Base64 string</li>
                <li className="mb-2">Verify encoding matches original format</li>
                <li>Copy/download the decoded result</li>
              </ol>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Note: 
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Max file size: 2MB</li>
                <li>Only decode trusted content</li>
              </ul>
            </div>

            <div className="mt-2">
              <p className="font-medium">Example:</p>
              <code className="block p-2 bg-gray-100 rounded mt-1">
                Encoded: <span className="text-blue-600">SGVsbG8gV29ybGQh</span><br/>
                Decoded: <span className="text-green-600">Hello World!</span>
              </code>
            </div>
          </div>
        </div>
      </details>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">Base64 Converter</h2>
          <p className="text-sm text-gray-600 mt-1">
            Encode text/files to Base64 or decode Base64 to original format
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 cursor-pointer rounded ${mode === 'encode' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100'}`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 cursor-pointer rounded ${mode === 'decode' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100'}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          {mode === 'encode' ? 'Input Text/File' : 'Base64 String'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' 
            ? 'Enter text or upload file...' 
            : 'Paste Base64 string...'}
          className="w-full p-3 border rounded-lg h-32 font-mono text-sm"
        />
        {mode === 'encode' && (
          <div className="mt-2">
            <input
              type="file"
              onChange={handleFileUpload}
              className="text-sm"
              aria-label="Upload file for encoding"
            />
            {file && <p className="text-sm mt-1">{file.name} ({file.size} bytes)</p>}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm">Encoding:</label>
        <select
          value={encodingType}
          onChange={(e) => setEncodingType(e.target.value as 'utf-8' | 'ascii')}
          className="p-2 border rounded"
        >
          <option value="utf-8">UTF-8</option>
          <option value="ascii">ASCII</option>
        </select>
      </div>

      {error && (
        <div className={`p-3 rounded mb-4 ${
          error.includes('Copied') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'}`
        }>
          {error}
        </div>
      )}

      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">
            {mode === 'encode' ? 'Base64 Output' : 'Decoded Result'}
          </label>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 px-3 py-1.5 cursor-pointer rounded text-sm hover:bg-gray-300"
              aria-label="Copy result to clipboard"
            >
              Copy
            </button>
            <button
              onClick={downloadResult}
              className="bg-gray-200 px-3 py-1.5 cursor-pointer rounded text-sm hover:bg-gray-300"
              aria-label="Download result"
            >
              Download
            </button>
          </div>
        </div>
        <pre className="p-3 border rounded-lg bg-gray-50 overflow-auto max-h-96">
          {output}
        </pre>
      </div>

      {mode === 'decode' && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700">
          ⚠️ Warning: Decoding untrusted Base64 may execute malicious code. 
          Only decode content from trusted sources.
        </div>
      )}
    </div>
  );
}