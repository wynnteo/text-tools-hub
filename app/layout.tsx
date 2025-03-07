import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import Link from 'next/link';
import { FaGithub, FaBlog } from 'react-icons/fa'; 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Text Tools Hub - Free Online Developer & Writer Tools',
  description: 'Text Tools Hub offers free, fast, and easy-to-use online tools for developers and writers. Simplify your workflow with text manipulation, code formatting, and more!',
  keywords: ['text tools', 'developer tools', 'writer tools', 'online utilities', 'regex tester', 'json formatter', 'markdown previewer'],
  authors: [{ name: 'Wynn Teo', url: 'https://wynntech.me' }],
  openGraph: {
    title: 'Text Tools Hub - Free Online Developer & Writer Tools',
    description: 'Text Tools Hub offers free, fast, and easy-to-use online tools for developers and writers. Simplify your workflow with text manipulation, code formatting, and more!',
    url: 'https://wynntech.me',
    siteName: 'Text Tools Hub',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.png', 
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Tools Hub - Free Online Developer & Writer Tools',
    description: 'Text Tools Hub offers free, fast, and easy-to-use online tools for developers and writers. Simplify your workflow with text manipulation, code formatting, and more!',
    images: ['https://yourwebsite.com/og-image.png'], // Same as OpenGraph image
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <footer className="bg-white mt-8">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Text Tools Hub</h3>
                <p className="text-sm text-gray-600">
                A collection of free, fast, and easy-to-use online tools for developers and writers. 
                From text manipulation to code formatting, we simplify your workflow with powerful utilities.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Quick Links</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/" className="text-sm text-gray-600 hover:text-indigo-600">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/feedback" className="text-sm text-gray-600 hover:text-indigo-600">
                      Feedback
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://github.com/wynnteo" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="h-5 w-5 text-gray-600 hover:text-indigo-600" />
                  </a>
                  <a href="https://wynntech.me" target="_blank" rel="noopener noreferrer">
                    <FaBlog className="h-5 w-5 text-gray-600 hover:text-indigo-600" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Contact</h3>
                <p className="text-sm text-gray-600">
                  Have questions? <br />
                  <Link
                    href="/feedback"
                    className="text-indigo-600 hover:underline"
                  >
                    Send us a message
                  </Link>
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-6 pt-6 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Text Tools Hub. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}