'use client';
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { FiDownload, FiCheckCircle, FiRefreshCw, FiCopy } from 'react-icons/fi';

export default function QrGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [copied, setCopied] = useState(false);

  const downloadQR = (format: 'png' | 'jpeg' | 'svg') => {
    const qrElement = document.getElementById('qr-code');
    if (qrElement) {
      const downloadFn = format === 'png' ? toPng : format === 'jpeg' ? toJpeg : toSvg;
      downloadFn(qrElement).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `qr-code.${format}`;
        link.href = dataUrl;
        link.click();
      });
    }
  };

  const copyToClipboard = async () => {
    const qrElement = document.getElementById('qr-code');
    if (qrElement) {
      try {
        const dataUrl = await toPng(qrElement);
        const blob = await fetch(dataUrl).then((res) => res.blob());
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
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
          <h3 className="font-semibold mb-2">QR Code Generator Guide</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 Features:</p>
              <ul className="list-disc list-inside ml-2">
                <li>Generate QR codes for URLs, text, or other data</li>
                <li>Customizable size and colors</li>
                <li>Multiple error correction levels</li>
                <li>Download in PNG, JPEG, or SVG formats</li>
                <li>Copy QR code to clipboard</li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Best Practices:
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Use high contrast colors for better scanning</li>
                <li>Choose higher error correction for complex designs</li>
                <li>Test QR codes before distribution</li>
                <li>Keep URLs short for smaller QR codes</li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Example Use Cases:</p>
              <code className="block p-2 bg-gray-100 rounded mt-1">
                <span className="text-blue-600">https://example.com</span><br />
                <span className="text-green-600">WIFI:S:MyNetwork;T:WPA;P:password;;</span><br />
                <span className="text-purple-600">BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nEND:VCARD</span>
              </code>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">QR Code Generator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text, URL, or other data"
            className="w-full p-3 border rounded-lg h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Size (100-500px)</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Math.min(500, Math.max(100, Number(e.target.value))))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Error Correction</label>
            <select
              value={errorCorrection}
              onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}
              className="w-full p-2 border rounded"
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Foreground Color</label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full h-10"
            />
          </div>

          <div>
            <label className="block mb-2">Background Color</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
        </div>

        {text && (
          <div className="mt-6">
            <div className="flex flex-col items-center space-y-4">
              <div id="qr-code" className="p-4 bg-white rounded-lg shadow-sm">
                <QRCodeCanvas 
                  value={text}
                  size={size}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level={errorCorrection}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => downloadQR('png')}
                  className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                  <FiDownload /> PNG
                </button>
                <button
                  onClick={() => downloadQR('jpeg')}
                  className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <FiDownload /> JPEG
                </button>
                <button
                  onClick={() => downloadQR('svg')}
                  className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                  <FiDownload /> SVG
                </button>
                <button
                  onClick={copyToClipboard}
                  className="cursor-pointer bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-2"
                >
                  {copied ? <FiCheckCircle className="text-green-600" /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}