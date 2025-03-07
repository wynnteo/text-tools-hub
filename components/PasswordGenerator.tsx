'use client';
import { useState, useEffect } from 'react';
import { FiCopy, FiRefreshCw, FiCheckCircle } from 'react-icons/fi';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
  });
  const [strength, setStrength] = useState(0);
  const [copied, setCopied] = useState(false);

  const characterSets = {
    uppercase: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    lowercase: 'abcdefghijkmnpqrstuvwxyz',
    numbers: '23456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    excludeSimilar: 'il1Lo0O'
  };

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += characterSets.uppercase;
    if (options.lowercase) chars += characterSets.lowercase;
    if (options.numbers) chars += characterSets.numbers;
    if (options.symbols) chars += characterSets.symbols;
    
    if (chars === '') return;

    // Remove similar characters if enabled
    if (options.excludeSimilar) {
      chars = chars.replace(new RegExp(`[${characterSets.excludeSimilar}]`, 'g'), '');
    }

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars[array[i] % chars.length];
    }

    setPassword(newPassword);
    setCopied(false);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[\W_]/.test(pass)) score++;
    setStrength(score);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

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
          <h3 className="font-semibold mb-2">Password Generator Guide</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 Features:</p>
              <ul className="list-disc list-inside ml-2">
                <li>Custom length (8-64 characters)</li>
                <li>Multiple character set options</li>
                <li>Exclude similar characters</li>
                <li>Password strength indicator</li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Security Tips:
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Always use 12+ characters for important accounts</li>
                <li>Combine multiple character types</li>
                <li>Avoid reusing passwords across sites</li>
                <li>Consider using a password manager</li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Example Strong Password:</p>
              <code className="block p-2 bg-gray-100 rounded mt-1">
                <span className="text-green-600">7T$mP9qL#eV2@WcR</span>
              </code>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">Secure Password Generator</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <label className="w-24">Length</label>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="flex-1"
          />
          <span className="w-12 text-center">{length}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(options).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                className="h-5 w-5 accent-indigo-600"
                disabled={key === 'excludeSimilar' && !(options.uppercase || options.lowercase)}
              />
              <label className="capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span>Password Strength:</span>
            <span className="font-medium">
              {strength < 3 ? 'Weak' : strength < 5 ? 'Good' : 'Strong'}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                strength < 3 ? 'bg-red-500' : strength < 5 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${(strength / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={generatePassword}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <FiRefreshCw />
          Regenerate
        </button>
        
        {password && (
          <button
            onClick={copyToClipboard}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-2"
          >
            {copied ? <FiCheckCircle className="text-green-600" /> : <FiCopy />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {password && (
        <div className="mt-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-mono text-xl text-center break-all">{password}</div>
          </div>
        </div>
      )}
    </div>
  );
}