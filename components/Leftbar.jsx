import React from 'react';
import Link from 'next/link';

function Footer() {
  const links = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="w-full bg-gray-900 text-white py-6 px-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Globix. All rights reserved.</div>
        <ul className="flex space-x-4 mt-4 md:mt-0">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.path}>
                <span className="text-sm hover:underline">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
