'use client';
import { useState, useEffect, useCallback } from 'react';
import { FiShield } from 'react-icons/fi';
import bcrypt from 'bcryptjs';

type ValidityState = 'valid' | 'invalid' | null;

export default function BcryptTool() {
  const [inputPassword, setInputPassword] = useState('');
  const [inputHash, setInputHash] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'hash' | 'verify'>('hash');
  const [saltRounds, setSaltRounds] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [validity, setValidity] = useState<ValidityState>(null);

  const generateHash = useCallback(async () => {
    if (mode === 'hash' && inputPassword) {
      setIsLoading(true);
      try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(inputPassword, salt);
        setOutput(hash);
        setValidity(null);
      } catch (e) {
        setOutput('Error generating hash');
        setValidity('invalid');
      }
      setIsLoading(false);
    }
  }, [inputPassword, saltRounds, mode]);

  const verifyHash = useCallback(async () => {
    if (mode === 'verify' && inputPassword && inputHash) {
      setIsLoading(true);
      try {
        const isValid = bcrypt.compareSync(inputPassword, inputHash);
        setOutput(isValid ? '✓ Match' : '✗ No Match');
        setValidity(isValid ? 'valid' : 'invalid');
      } catch (e) {
        setOutput('Invalid hash format');
        setValidity('invalid');
      }
      setIsLoading(false);
    }
  }, [inputPassword, inputHash, mode]);

  useEffect(() => {
    setValidity(null);
    if (mode === 'hash') {
      generateHash();
    } else {
      if (inputPassword && inputHash) verifyHash();
    }
  }, [generateHash, verifyHash, mode, inputPassword, inputHash]);

  const clearFields = () => {
    setInputPassword('');
    setInputHash('');
    setOutput('');
    setValidity(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <details className="mb-6 group">
        <summary className="flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700">
          <span className="mr-2">📘 Bcrypt Guide</span>
          <svg className="w-4 h-4 transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Bcrypt Security Tool</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔒 Hashing:</p>
              <ol className="list-decimal list-inside ml-2">
                <li>Enter password to hash</li>
                <li>Select cost factor (10-12 recommended)</li>
                <li>Copy secure bcrypt hash</li>
              </ol>
            </div>
            <div>
              <p className="font-medium">🔍 Verification:</p>
              <ol className="list-decimal list-inside ml-2">
                <li>Enter password and bcrypt hash</li>
                <li>Auto-verification happens instantly</li>
                <li>Green background indicates match</li>
              </ol>
            </div>
            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Security Best Practices:
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Never store raw passwords</li>
                <li>Use HTTPS for password transmission</li>
                <li>Regularly update hashing parameters</li>
              </ul>
            </div>
          </div>
        </div>
      </details>

      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Bcrypt Generator/Verifier</h2>
          <p className="text-sm text-gray-600 mt-1">
            {mode === 'hash' 
              ? 'Create secure password hashes' 
              : 'Validate password against stored hash'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('hash')}
            className={`px-4 py-2 rounded cursor-pointer transition-colors ${
              mode === 'hash' 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Hash
          </button>
          <button
            onClick={() => setMode('verify')}
            className={`px-4 py-2 rounded cursor-pointer transition-colors ${
              mode === 'verify' 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Verify
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Enter password..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            aria-required="true"
          />
        </div>

        {mode === 'verify' && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Bcrypt Hash
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              value={inputHash}
              onChange={(e) => setInputHash(e.target.value)}
              placeholder="Paste bcrypt hash..."
              className="w-full p-3 border rounded-lg h-32 font-mono text-sm focus:ring-2 focus:ring-indigo-500"
              aria-required="true"
            />
          </div>
        )}

        {mode === 'hash' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm">Salt Rounds:</label>
              <select
                value={saltRounds}
                onChange={(e) => setSaltRounds(Number(e.target.value))}
                className="p-2 border rounded bg-white"
                disabled={isLoading}
              >
                {[8, 9, 10, 11, 12].map((rounds) => (
                  <option key={rounds} value={rounds}>
                    {rounds} {rounds === 10 && '(Recommended)'}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-600 mt-1 sm:mt-0">
              Higher rounds = Better security, slower hashing
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            {mode === 'hash' ? 'Generated Hash' : 'Verification Result'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="cursor-pointer px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
              disabled={!output}
              aria-label="Copy result"
            >
              Copy
            </button>
            <button
              onClick={clearFields}
              className="cursor-pointer px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
              aria-label="Clear all fields"
            >
              Clear
            </button>
          </div>
        </div>
        <pre
          className={`p-4 rounded-lg border overflow-auto max-h-96 font-mono text-sm transition-colors ${
            validity === 'valid'
              ? 'bg-green-50 border-green-200 text-green-700'
              : validity === 'invalid'
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          {isLoading ? (
            <span className="text-gray-500">Processing...</span>
          ) : output ? (
            output
          ) : (
            <span className="text-gray-400">
              {mode === 'hash' 
                ? 'Your generated hash will appear here...' 
                : 'Verification result will appear here...'}
            </span>
          )}
        </pre>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700 flex items-center gap-2">
          <FiShield className="flex-shrink-0" />
          <span>
            {mode === 'hash'
              ? 'Remember: Always store hashes securely and never log raw passwords!'
              : 'Security reminder: Verification should only be done on trusted devices!'}
          </span>
        </p>
      </div>
    </div>
  );
}