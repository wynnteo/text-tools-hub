'use client';
import { useState, useEffect } from 'react';

const COMMON_REGEX = [
  { name: 'Email', pattern: '[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}' },
  { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
  { name: 'Hex Color', pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])' },
  { name: 'IP Address', pattern: '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$' },
  { name: 'MAC Address', pattern: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$' },
  { name: 'Phone Number', pattern: '^(\\+\\d{1,3}[- ]?)?\\d{10}$' },
  { name: 'Credit Card', pattern: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$' },
  { name: 'SSN', pattern: '^\\d{3}-\\d{2}-\\d{4}$' },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('gi');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    testRegex();
  }, [pattern, flags, testString]);

  const testRegex = () => {
    try {
      setError('');
      const regex = new RegExp(pattern, flags);
      const allMatches = [...testString.matchAll(regex)];
      setMatches(allMatches);
    } catch (e) {
      setError('Invalid regular expression');
      setMatches([]);
    }
  };

  const highlightText = () => {
    try {
      const regex = new RegExp(pattern, flags);
      return testString.split(regex).map((part, i) => (
        <span key={i}>
          {part}
          {i < matches.length && (
            <mark className="bg-yellow-200 px-1 mx-1">
              {matches[i][0]}
            </mark>
          )}
        </span>
      ));
    } catch (e) {
      return testString;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
      {/* How to Use Section */}
      <details className="mb-6 group">
        <summary className="flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700">
          <span className="mr-2">📘 How to Use</span>
          <svg className="w-4 h-4 transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Regex Tester Guide</h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-2">Basic Usage:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Enter a regex pattern or select from common patterns</li>
                <li>Choose flags using the toggle buttons:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li><code>g</code> - Global: Find all matches</li>
                    <li><code>i</code> - Case Insensitive: Ignore case</li>
                    <li><code>m</code> - Multiline: Match start/end of each line</li>
                    <li><code>s</code> - Single Line: Dot matches newlines</li>
                  </ul>
                </li>
                <li>Input text to test in the right panel</li>
                <li>Matches will highlight automatically in yellow</li>
                <li>Inspect detailed match information below</li>
              </ol>
            </div>

            <div>
              <p className="font-medium mb-2">Key Features:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Real-time pattern testing</li>
                <li>Cheat sheet reference</li>
                <li>Multi-flag support</li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              <p className="font-medium mb-2">⚠️ Important Notes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use double backslashes (\\) for special characters</li>
                <li>Test patterns with various text cases</li>
                <li>Save frequently used patterns for quick access</li>
                <li>Check browser console for errors if matching fails</li>
                <li>Test common patterns with sample text to ensure they work as expected</li>
              </ul>
            </div>

            <div>
              <p className="font-medium mb-2">Example Workflow:</p>
              <div className="space-y-2 text-sm">
                <code className="block p-2 bg-gray-100 rounded">
                  1. Select "URL" pattern<br />
                  2. Test with: "Contact: https://www.asdfadf.com"<br />
                  3. See 1 match highlighted in yellow<br />
                  4. Check match details for exact position
                </code>
              </div>
            </div>
          </div>
        </div>
      </details>

      {/* Main Content */}
      <h2 className="text-xl font-semibold">Regex Tester</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Pattern</label>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full p-2 border rounded font-mono"
              placeholder="Enter regex pattern"
            />
          </div>

          <div>
            <label className="block mb-2">Flags</label>
            <div className="flex gap-2">
              {['g', 'i', 'm', 's'].map(flag => (
                <button
                  key={flag}
                  onClick={() => setFlags(f => f.includes(flag) ? f.replace(flag, '') : f + flag)}
                  className={`px-3 py-1 rounded ${flags.includes(flag) ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                >
                  {flag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2">Common Patterns</label>
            <div className="grid grid-cols-2 gap-2">
              {COMMON_REGEX.map(({ name, pattern }) => (
                <button
                  key={name}
                  onClick={() => setPattern(pattern)}
                  className="bg-gray-100 p-2 rounded hover:bg-gray-200 text-sm"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Test String</label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="w-full p-2 border rounded h-40 font-mono"
              placeholder="Paste text to test"
            />
          </div>

          <div>
            <label className="block mb-2">Matches Found: {matches.length}</label>
            <div className="p-2 border rounded bg-gray-50 h-40 overflow-auto">
              {highlightText()}
            </div>
          </div>
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}