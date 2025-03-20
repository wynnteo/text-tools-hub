'use client';
import { useState, useRef, useEffect} from 'react';

import dynamic from 'next/dynamic';
import {
  FiType, FiArrowRight, FiLink, FiSearch,
  FiHash, FiLock, FiCode, FiGitMerge,
  FiSmartphone, FiDroplet, FiKey, FiAlignLeft,
  FiShield
} from 'react-icons/fi';

// Lazy load components for better performance
const QrGenerator = dynamic(() => import('@/components/QrGenerator'));
const PasswordGenerator = dynamic(() => import('@/components/PasswordGenerator'));
const Base64Tool = dynamic(() => import('@/components/Base64Tool'));
const SlugConverter = dynamic(() => import('@/components/SlugConverter'));
const LoremIpsum = dynamic(() => import('@/components/LoremIpsum'));
const TextReverser = dynamic(() => import('@/components/TextReverser'));
const WordCounter = dynamic(() => import('@/components/WordCounter'));
const CaseConverter = dynamic(() => import('@/components/CaseConverter'));
const RegexTester = dynamic(() => import('@/components/RegexTester'));
const DiffChecker = dynamic(() => import('@/components/DiffChecker'));
const JsonFormatter = dynamic(() => import('@/components/JsonFormatter'));
const FindReplace = dynamic(() => import('@/components/FindReplace'));
const HtmlEncoderDecoder = dynamic(() => import('@/components/HtmlEncoderDecoder'));
const UrlEncoderDecoder = dynamic(() => import('@/components/UrlEncoderDecoder'));
const ColorConverter = dynamic(() => import('@/components/ColorConverter'));
const BcryptTool = dynamic(() => import('@/components/BcryptTool'));

const tabs = [
  // Text Manipulation Tools
  { id: 'case', label: 'Case', icon: <FiType />, component: <CaseConverter /> },
  { id: 'reverse', label: 'Reverse', icon: <FiArrowRight />, component: <TextReverser /> },
  { id: 'slug', label: 'Slug', icon: <FiLink />, component: <SlugConverter /> },
  { id: 'find-replace', label: 'Find/Replace', icon: <FiSearch />, component: <FindReplace /> },
  { id: 'counter', label: 'Counter', icon: <FiHash />, component: <WordCounter /> },

  // Encoding/Decoding Tools
  { id: 'base64', label: 'Base64', icon: <FiLock />, component: <Base64Tool /> },
  { id: 'html-encode', label: 'HTML', icon: <FiCode />, component: <HtmlEncoderDecoder /> },
  { id: 'url-encode', label: 'URL', icon: <FiLink />, component: <UrlEncoderDecoder /> },
  { id: 'bcrypt', label: 'Bcrypt', icon: <FiShield />, component: <BcryptTool /> },

  // Developer Tools
  { id: 'json', label: 'JSON', icon: <FiCode />, component: <JsonFormatter /> },
  { id: 'regex', label: 'Regex', icon: <FiGitMerge />, component: <RegexTester /> },
  { id: 'diff', label: 'Diff', icon: <FiGitMerge />, component: <DiffChecker /> },

  // Generators
  { id: 'qr', label: 'QR Code', icon: <FiSmartphone />, component: <QrGenerator /> },
  { id: 'color', label: 'Color', icon: <FiDroplet />, component: <ColorConverter /> },
  { id: 'password', label: 'Password', icon: <FiKey />, component: <PasswordGenerator /> },
  { id: 'lorem', label: 'Lorem', icon: <FiAlignLeft />, component: <LoremIpsum /> },
];

const categories = [
  {
    name: 'Text Tools',
    tabs: ['case', 'reverse', 'slug', 'find-replace', 'counter']
  },
  {
    name: 'Encoding',
    tabs: ['base64', 'html-encode', 'url-encode', 'bcrypt']
  },
  {
    name: 'Developer',
    tabs: ['json', 'regex', 'diff']
  },
  {
    name: 'Generators',
    tabs: ['qr', 'color', 'password', 'lorem']
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('case');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  // Clear timeouts on component unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Text Tools Hub</h1>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full p-2 border rounded text-left flex items-center justify-between"
        >
          <span>{tabs.find(t => t.id === activeTab)?.label}</span>
          <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {mobileMenuOpen && (
          <div className="absolute w-full mt-1 bg-white border rounded shadow-lg z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-2 text-left flex items-center gap-2 ${
                  activeTab === tab.id ? 'bg-indigo-100' : 'hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav className="hidden md:block bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 overflow-visible h-12">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative py-2"
                onMouseEnter={() => {
                  if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                  setActiveCategory(category.name);
                }}
                onMouseLeave={() => {
                  hoverTimeout.current = setTimeout(() => {
                    setActiveCategory(null);
                  }, 300);
                }}
              >
                <button className="cursor-pointer flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 px-2 py-2">
                  {category.name}
                  <svg className="ml-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {activeCategory === category.name && (
                  <div
                    className="cursor-pointer absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-1 z-50"
                    onMouseEnter={() => {
                      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                      setActiveCategory(category.name);
                    }}
                    onMouseLeave={() => {
                      hoverTimeout.current = setTimeout(() => {
                        setActiveCategory(null);
                      }, 300);
                    }}
                  >
                    {tabs
                      .filter(tab => category.tabs.includes(tab.id))
                      .map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className="cursor-pointer w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          {tab.icon}
                          {tab.label}
                        </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </main>

      {/* Mobile Floating Button */}
      <div className="md:hidden fixed bottom-4 right-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}