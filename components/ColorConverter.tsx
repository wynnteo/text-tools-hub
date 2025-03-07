'use client';
import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { HexColorPicker, HexColorInput } from 'react-colorful';

export default function ColorConverter() {
  const [color, setColor] = useState('#3b82f6');
  const [inputFormat, setInputFormat] = useState<'hex' | 'rgb' | 'hsl' | 'cmyk'>('hex');
  const [copied, setCopied] = useState(false);

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Convert HEX to HSL
  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  // Convert HEX to CMYK
  const hexToCmyk = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
  };

  // Convert RGB to HEX
  const rgbToHex = (rgb: string) => {
    const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  // Convert HSL to HEX
  const hslToHex = (hsl: string) => {
    const [h, s, l] = hsl.match(/\d+/g)!.map(Number);
    const sNorm = s / 100;
    const lNorm = l / 100;

    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = lNorm - c / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }

    return `#${Math.round((r + m) * 255).toString(16).padStart(2, '0')}${Math.round((g + m) * 255).toString(16).padStart(2, '0')}${Math.round((b + m) * 255).toString(16).padStart(2, '0')}`;
  };

  // Convert CMYK to HEX
  const cmykToHex = (cmyk: string) => {
    const [c, m, y, k] = cmyk.match(/\d+/g)!.map(Number);
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    try {
      switch (inputFormat) {
        case 'hex':
          if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
            setColor(value);
          }
          break;
        case 'rgb':
          if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(value)) {
            setColor(rgbToHex(value));
          }
          break;
        case 'hsl':
          if (/^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(value)) {
            setColor(hslToHex(value));
          }
          break;
        case 'cmyk':
          if (/^cmyk\(\s*\d+%\s*,\s*\d+%\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(value)) {
            setColor(cmykToHex(value));
          }
          break;
      }
    } catch (e) {
      console.error('Invalid color format');
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <h3 className="font-semibold mb-2">Color Converter Guide</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">🔧 Features:</p>
              <ul className="list-disc list-inside ml-2">
                <li>Convert between HEX, RGB, HSL, and CMYK</li>
                <li>Input colors in any format</li>
                <li>Visual color picker</li>
                <li>Live color preview</li>
                <li>Copy color values to clipboard</li>
              </ul>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              ⚠️ Notes:
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>HEX: Used for web design (e.g., `#FF5733`)</li>
                <li>RGB: Used for screens (e.g., `rgb(255, 87, 51)`)</li>
                <li>HSL: Hue, Saturation, Lightness (e.g., `hsl(14, 100%, 60%)`)</li>
                <li>CMYK: Used for printing (e.g., `cmyk(0%, 66%, 80%, 0%)`)</li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Example Workflow:</p>
              <code className="block p-2 bg-gray-100 rounded mt-1">
                1. Select input format (HEX, RGB, HSL, or CMYK)<br />
                2. Enter color value in the selected format<br />
                3. View converted values in all formats<br />
                4. Copy the desired format to clipboard
              </code>
            </div>
          </div>
        </div>
      </details>

      <h2 className="text-xl font-semibold mb-4">Color Converter</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Color Picker and Input */}
        <div className="space-y-4">
          <HexColorPicker color={color} onChange={setColor} />
          <div className="flex items-center gap-2">
            <select
              value={inputFormat}
              onChange={(e) => setInputFormat(e.target.value as 'hex' | 'rgb' | 'hsl' | 'cmyk')}
              className="p-2 border rounded"
            >
              <option value="hex">HEX</option>
              <option value="rgb">RGB</option>
              <option value="hsl">HSL</option>
              <option value="cmyk">CMYK</option>
            </select>
            <input
              value={
                inputFormat === 'hex' ? color :
                inputFormat === 'rgb' ? hexToRgb(color) :
                inputFormat === 'hsl' ? hexToHsl(color) :
                hexToCmyk(color)
              }
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={`Enter ${inputFormat.toUpperCase()} color`}
            />
          </div>
        </div>

        {/* Color Formats */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: color }}>
            <span className="text-white font-medium">Preview</span>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">HEX</label>
            <div className="flex items-center gap-2">
              <input
                value={color}
                readOnly
                className="w-full p-2 border rounded bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(color)}
                className="bg-gray-200 cursor-pointer px-4 py-2 rounded hover:bg-gray-300"
              >
                <FiCopy />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">RGB</label>
            <div className="flex items-center gap-2">
              <input
                value={hexToRgb(color)}
                readOnly
                className="w-full p-2 border rounded bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(hexToRgb(color))}
                className="bg-gray-200 px-4 py-2 cursor-pointer rounded hover:bg-gray-300"
              >
                <FiCopy />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">HSL</label>
            <div className="flex items-center gap-2">
              <input
                value={hexToHsl(color)}
                readOnly
                className="w-full p-2 border rounded bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(hexToHsl(color))}
                className="bg-gray-200 px-4 py-2 cursor-pointer rounded hover:bg-gray-300"
              >
                <FiCopy />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">CMYK</label>
            <div className="flex items-center gap-2">
              <input
                value={hexToCmyk(color)}
                readOnly
                className="w-full p-2 border rounded bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(hexToCmyk(color))}
                className="bg-gray-200 px-4 py-2 cursor-pointer rounded hover:bg-gray-300"
              >
                <FiCopy />
              </button>
            </div>
          </div>
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}