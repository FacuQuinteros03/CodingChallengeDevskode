import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-4 px-6 text-center text-sm">
      <p>Copyright Rimel {currentYear}. All rights reserved.</p>
    </footer>
  );
}
