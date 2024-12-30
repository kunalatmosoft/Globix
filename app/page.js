"use client";
import React from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] });

export default function SecureNotesLanding() {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-black text-white ${inter.className}`}>
      <header className="p-6 flex justify-between items-center">
        <div className="text-2xl font-bold"><Link href="/level">Globix</Link></div>
        <nav>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Secure Your Thoughts with Globix Technology</h1>
          <p className="text-xl mb-8">Globix: The most secure note-taking app powered by blockchain.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors">
           <Link href ="/globix"> Get Started</Link>
          </button>
        </section>

        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['End-to-end Encryption', 'Decentralized Storage', 'Immutable Records'].map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg text-center">
                <div className="hexagon bg-blue-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </section>

        <section id="security" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Unbreakable Security</h2>
          <div className="bg-gray-800 p-8 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h3 className="text-2xl font-semibold mb-4">Blockchain-Powered Protection</h3>
                <p className="mb-4">Our advanced blockchain technology ensures that your notes are encrypted, distributed, and tamper-proof.</p>
                <ul className="list-disc list-inside">
                  <li>Military-grade encryption</li>
                  <li>Decentralized storage</li>
                  <li>Immutable audit trails</li>
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-64 h-64 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-gray-800 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Basic', 'Pro', 'Enterprise'].map((plan, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="text-2xl font-semibold mb-4">{plan}</h3>
                <p className="text-4xl font-bold mb-6">${(index + 1) * 9.99}<span className="text-xl">/mo</span></p>
                <ul className="mb-6 text-left">
                  <li className="mb-2">✓ {(index + 1) * 5}GB Storage</li>
                  <li className="mb-2">✓ {['Basic', 'Advanced', 'Premium'][index]} Encryption</li>
                  <li className="mb-2">✓ {index === 2 ? 'Unlimited' : index + 1} Devices</li>
                </ul>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors w-full">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8 text-center">
        <p>&copy; 2024 Globix. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
}

