'use client';
import { useState, useEffect } from 'react';
import * as yaml from 'js-yaml';
import Papa from 'papaparse';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'json' | 'yaml' | 'csv'>('json');
  const [copied, setCopied] = useState(false);
  const [autoFormat, setAutoFormat] = useState(true);

  // Auto-format on input change
  useEffect(() => {
    if (!autoFormat) return;
    try {
      if (viewMode === 'json') {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (viewMode === 'yaml') {
        const parsed = yaml.load(input);
        setOutput(yaml.dump(parsed));
      } else if (viewMode === 'csv') {
        const parsed = JSON.parse(input);
        if (!Array.isArray(parsed)) {
          throw new Error('JSON must be an array for CSV conversion');
        }
        setOutput(Papa.unparse(parsed));
      }
      setError('');
    } catch (e) {
      setError(`Invalid ${viewMode.toUpperCase()}: ${e.message}`);
    }
  }, [input, viewMode, autoFormat]);

  // Convert between formats
  const convertToYaml = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(yaml.dump(parsed));
      setViewMode('yaml');
      setError('');
    } catch (e) {
      setError(`Invalid JSON for YAML conversion: ${e.message}`);
    }
  };

  const convertYamlToJson = () => {
    try {
      const parsed = yaml.load(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setViewMode('json');
      setError('');
    } catch (e) {
      setError(`Invalid YAML for JSON conversion: ${e.message}`);
    }
  };

  const convertToCsv = () => {
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) {
        throw new Error('JSON must be an array for CSV conversion');
      }
      setOutput(Papa.unparse(parsed));
      setViewMode('csv');
      setError('');
    } catch (e) {
      setError(`Invalid JSON for CSV conversion: ${e.message}`);
    }
  };

  const convertCsvToJson = () => {
    try {
      const result = Papa.parse(input, { header: true });
      setOutput(JSON.stringify(result.data, null, 2));
      setViewMode('json');
      setError('');
    } catch (e) {
      setError(`Invalid CSV format: ${e.message}`);
    }
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Download output
  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `output.${viewMode}`;
    a.click();
    URL.revokeObjectURL(url);
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
          <h3 className="font-semibold mb-2">JSON & YAML Tools Guide</h3>
          <div className="space-y-3 text-sm">
            <p>Convert and format JSON, YAML, and CSV data with ease:</p>
            <ul className="list-disc list-inside ml-2">
              <li>Format JSON/YAML</li>
              <li>Convert between JSON, YAML, and CSV</li>
              <li>Validate syntax</li>
              <li>Download or copy results</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mt-3">🔧 Features:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Real-time formatting</li>
                  <li>Syntax highlighting</li>
                  <li>Error detection</li>
                  <li>Auto-conversion</li>
                </ul>
              </div>

              <div className="p-3 bg-yellow-50 rounded">
                <p className="font-medium">⚠️ Notes:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>JSON must be valid for conversion</li>
                  <li>CSV requires headers for JSON conversion</li>
                  <li>Preserves original formatting</li>
                </ul>
              </div>
            </div>

            <div className="mt-2">
              <p className="font-medium">Example:</p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="p-2 bg-gray-100 rounded">
                  JSON:<br/>
                  <code className="text-blue-600">{"{ \"key\": \"value\" }"}</code>
                </div>
                <div className="p-2 bg-gray-100 rounded">
                  YAML:<br/>
                  <code className="text-green-600">key: value</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">JSON Formatter</h2>

      {/* Text Areas */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border rounded-lg h-64 font-mono text-sm"
            placeholder='Paste JSON, YAML, or CSV here...'
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="relative">
          <div className="absolute right-2 top-2 flex gap-2">
            <button
              onClick={() => setViewMode('json')}
              className={`px-2 py-1 rounded ${viewMode === 'json' ? 'bg-indigo-100' : 'bg-gray-100'}`}
            >
              JSON
            </button>
            <button
              onClick={() => setViewMode('yaml')}
              className={`px-2 py-1 rounded ${viewMode === 'yaml' ? 'bg-indigo-100' : 'bg-gray-100'}`}
            >
              YAML
            </button>
            <button
              onClick={() => setViewMode('csv')}
              className={`px-2 py-1 rounded ${viewMode === 'csv' ? 'bg-indigo-100' : 'bg-gray-100'}`}
            >
              CSV
            </button>
          </div>

          <div className="relative">
            <SyntaxHighlighter
              language={viewMode}
              style={vscDarkPlus}
              customStyle={{
                padding: '1rem',
                borderRadius: '0.5rem',
                height: '16rem',
                overflow: 'auto',
                fontSize: '0.875rem',
                backgroundColor: '#f9fafb',
              }}
            >
              {output || 'Formatted output will appear here...'}
            </SyntaxHighlighter>
            {output && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadOutput}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={convertToYaml}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          JSON → YAML
        </button>
        <button
          onClick={convertYamlToJson}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          YAML → JSON
        </button>
        <button
          onClick={convertToCsv}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          JSON → CSV
        </button>
        <button
          onClick={convertCsvToJson}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          CSV → JSON
        </button>
        <label className="flex items-center gap-2 ml-auto">
          <input
            type="checkbox"
            checked={autoFormat}
            onChange={(e) => setAutoFormat(e.target.checked)}
            className="h-4 w-4"
          />
          Auto Format
        </label>
      </div>
    </div>
  );
}