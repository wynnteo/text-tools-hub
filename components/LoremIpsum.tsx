'use client';
import { useState } from 'react';
import { FiCopy, FiRefreshCw, FiCheckCircle } from 'react-icons/fi';

const loremIpsumParagraphs = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
  `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit.`,
  `Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.`,
  `Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.`,
  `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.`,
  `Suspendisse potenti. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.`,
  `Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus. Vivamus consectetuer risus et tortor.`,
  `Integer vitae libero ac risus egestas placerat. Vestibulum commodo felis quis tortor. Ut aliquam sollicitudin leo. Cras iaculis ultricies nulla. Donec quis dui at dolor tempor interdum.`,
  `Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor.`,
  `Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus.`,
];

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const generateText = () => {
    const allSentences = loremIpsumParagraphs.flatMap(paragraph =>
      paragraph.split('. ').filter(sentence => sentence.trim())
    );
    const shuffledSentences = [...allSentences].sort(() => Math.random() - 0.5);

    const newParagraphs = [];
    for (let i = 0; i < paragraphs; i++) {
      const sentenceCount = Math.floor(Math.random() * 3) + 2; // 2-4 sentences per paragraph
      const paragraph = shuffledSentences
        .slice(i * sentenceCount, (i + 1) * sentenceCount)
        .join('. ') + '.';
      newParagraphs.push(paragraph);
    }

    const newText = newParagraphs.join('\n\n');
    setGenerated(newText);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy!');
    }
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
          <h3 className="font-semibold mb-2">Lorem Ipsum Generator Guide</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 Features:</p>
              <ul className="list-disc list-inside ml-2">
                <li>Generate random Lorem Ipsum text</li>
                <li>Customize number of paragraphs</li>
                <li>Dynamic paragraph generation</li>
                <li>Copy generated text to clipboard</li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Notes:
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Text is randomized on each generation</li>
                <li>Paragraphs are dynamically created for variety</li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Example Use Cases:</p>
              <code className="block p-2 bg-gray-100 rounded mt-1">
                <span className="text-blue-600">Placeholder text for designs</span><br />
                <span className="text-green-600">Testing layout and typography</span><br />
                <span className="text-purple-600">Filling content during development</span>
              </code>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">Lorem Ipsum Generator</h2>
      
      <div className="flex items-center gap-4 mb-6">
        <label>Paragraphs:</label>
        <input
          type="number"
          value={paragraphs}
          onChange={(e) => setParagraphs(Math.max(1, Number(e.target.value)))}
          className="w-24 p-2 border rounded"
          min="1"
        />
        <button
          onClick={generateText}
          className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <FiRefreshCw /> Generate
        </button>
      </div>

      {generated && (
        <div className="mt-6">
          <div className="flex flex-col space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <textarea
                value={generated}
                readOnly
                className="w-full p-3 border rounded-lg bg-white h-64"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="bg-gray-200 px-4 py-2 cursor-pointer rounded hover:bg-gray-300 flex items-center gap-2"
              >
                {copied ? <FiCheckCircle className="text-green-600" /> : <FiCopy />}
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}