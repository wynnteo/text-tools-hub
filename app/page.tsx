'use client';
import { useState } from 'react';
import QrGenerator from '@/components/QrGenerator';
import PasswordGenerator from '@/components/PasswordGenerator';
import Base64Tool from '@/components/Base64Tool';
import SlugConverter from '@/components/SlugConverter';
import LoremIpsum from '@/components/LoremIpsum';
import TextReverser from '@/components/TextReverser';
import WordCounter from '@/components/WordCounter';
import CaseConverter from '@/components/CaseConverter';
import RegexTester from '@/components/RegexTester';
import DiffChecker from '@/components/DiffChecker';
import JsonFormatter from '@/components/JsonFormatter';
import FindReplace from '@/components/FindReplace';
import HtmlEncoderDecoder from '@/components/HtmlEncoderDecoder';
import UrlEncoderDecoder from '@/components/UrlEncoderDecoder';
import ColorConverter from '@/components/ColorConverter';

const tabs = [
  // Text Manipulation Tools
  { id: 'case', label: 'Case Converter', component: <CaseConverter /> },
  { id: 'reverse', label: 'Text Reverser', component: <TextReverser /> },
  { id: 'slug', label: 'Slug Converter', component: <SlugConverter /> },
  { id: 'find-replace', label: 'Find & Replace', component: <FindReplace /> },
  { id: 'counter', label: 'Word Counter', component: <WordCounter /> },

  // Encoding/Decoding Tools
  { id: 'base64', label: 'Base64 Tool', component: <Base64Tool /> },
  { id: 'html-encode', label: 'HTML Encode/Decode', component: <HtmlEncoderDecoder /> },
  { id: 'url-encode', label: 'URL Encode/Decode', component: <UrlEncoderDecoder /> },

  // Developer Tools
  { id: 'json', label: 'JSON Converter', component: <JsonFormatter /> },
  { id: 'regex', label: 'Regex Tester', component: <RegexTester /> },
  { id: 'diff', label: 'Diff Checker', component: <DiffChecker /> },

  // Generators
  { id: 'qr', label: 'QR Generator', component: <QrGenerator /> },
  { id: 'color', label: 'Color Converter', component: <ColorConverter /> },
  { id: 'password', label: 'Password Generator', component: <PasswordGenerator /> },
  { id: 'lorem', label: 'Lorem Ipsum', component: <LoremIpsum /> },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('case');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Text Tools Hub</h1>
          <p className="text-sm text-gray-600 italic mb-2">
            "Your one-stop solution for all text and code utilities."
          </p>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 cursor-pointer border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </main>
    </div>
  );
}