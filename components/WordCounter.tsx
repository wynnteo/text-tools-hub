'use client';
import { useState } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [options, setOptions] = useState({
    includePunctuation: false,
    includeWhitespace: false,
    autoUpdate: true,
  });

  // Word and character count
  const countWords = () => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
  };

  const countCharacters = () => {
    let characters = text;
    if (!options.includeWhitespace) {
      characters = characters.replace(/\s/g, '');
    }
    if (!options.includePunctuation) {
      characters = characters.replace(/[^\w\s]/g, '');
    }
    return characters.length;
  };

  // Sentence analysis
  const analyzeSentences = () => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
    
    return {
      count: sentences.length,
      longest: sentenceLengths.length > 0 ? Math.max(...sentenceLengths) : 0,
      shortest: sentenceLengths.length > 0 ? Math.min(...sentenceLengths) : 0,
      longestSentence: sentences[sentenceLengths.indexOf(Math.max(...sentenceLengths))] || '',
      shortestSentence: sentences[sentenceLengths.indexOf(Math.min(...sentenceLengths))] || ''
    };
  };

  // Paragraph analysis
  const analyzeParagraphs = () => {
    const paragraphs = text.split(/\n+/).filter(p => p.trim());
    return {
      count: paragraphs.length,
      longest: Math.max(...paragraphs.map(p => p.trim().split(/\s+/).length)), // Fixed closing parenthesis
      shortest: Math.min(...paragraphs.map(p => p.trim().split(/\s+/).length), 0),
    };
  };

  // Reading time calculation
  const calculateReadingTime = () => {
    const wordsPerMinute = 200;
    const words = countWords();
    return Math.ceil(words / wordsPerMinute);
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
          <h3 className="font-semibold mb-2">Text Analyzer Guide</h3>
          <p className="mb-3">Analyze your text with advanced metrics and insights</p>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 Features:</p>
              <ul className="list-disc list-inside ml-2">
                <li className="mb-2">Word, character, and sentence counts</li>
                <li className="mb-2">Paragraph analysis</li>
                <li className="mb-2">Reading time estimation</li>
                <li className="mb-2">Customizable counting options</li>
                <li className="mb-2">Longest/shortest sentence detection</li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Note: 
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Supports multilingual text</li>
                <li>Handles complex formatting</li>
                <li>Real-time updates</li>
              </ul>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">Advanced Text Analyzer</h2>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="w-full p-3 border rounded-lg mb-4 h-48"
      />

      {/* Options Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setOptions(p => ({...p, includePunctuation: !p.includePunctuation}))}
          className={`p-2 rounded ${
            options.includePunctuation
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.includePunctuation ? 'Include Punctuation' : 'Exclude Punctuation'}
        </button>
        <button
          onClick={() => setOptions(p => ({...p, includeWhitespace: !p.includeWhitespace}))}
          className={`p-2 rounded ${
            options.includeWhitespace
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.includeWhitespace ? 'Include Whitespace' : 'Exclude Whitespace'}
        </button>
        <button
          onClick={() => setOptions(p => ({...p, autoUpdate: !p.autoUpdate}))}
          className={`p-2 rounded ${
            options.autoUpdate
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {options.autoUpdate ? 'Auto Update ✔' : 'Manual Update'}
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
        <div className="bg-gray-50 p-4 rounded">
          <div className="text-2xl font-bold">{countWords()}</div>
          <div className="text-gray-600">Words</div>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <div className="text-2xl font-bold">{countCharacters()}</div>
          <div className="text-gray-600">Characters</div>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <div className="text-2xl font-bold">{analyzeSentences().count}</div>
          <div className="text-gray-600">Sentences</div>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <div className="text-2xl font-bold">{analyzeParagraphs().count}</div>
          <div className="text-gray-600">Paragraphs</div>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <div className="text-2xl font-bold">{calculateReadingTime()}</div>
          <div className="text-gray-600">Reading Time (mins)</div>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <div className="text-2xl font-bold">{analyzeSentences().longest}</div>
          <div className="text-gray-600">Longest Sentence</div>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <div className="text-2xl font-bold">{analyzeParagraphs().longest}</div>
          <div className="text-gray-600">Longest Paragraph</div>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <div className="text-2xl font-bold">{analyzeSentences().shortest}</div>
          <div className="text-gray-600">Shortest Sentence</div>
        </div>
      </div>

      {analyzeSentences().count > 0 && (
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Longest Sentence:</span> 
            {analyzeSentences().longestSentence}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Shortest Sentence:</span> 
            {analyzeSentences().shortestSentence}
          </p>
        </div>
      )}
    </div>
  );
}