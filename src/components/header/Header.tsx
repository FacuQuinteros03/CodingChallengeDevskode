import React from 'react';
import { FaHome, FaInfoCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="border border-solid border-black px-6 py-4 bg-navbar">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Coding Challenge</h1>
        <nav className="flex gap-4">
          <a href="/" className="flex items-center gap-2 text-s md:text-xl">
            <FaHome className="text-icon" />
            Home
          </a>
          <a
            href="/about"
            className="flex items-center gap-2 text-s md:text-xl"
          >
            <FaInfoCircle className="text-icon" />
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
