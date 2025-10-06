// src/components/layout/Navigation.js
import React from 'react';

const Navigation = ({ onBookClick }) => {
  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-light text-green-600 tracking-wide">
            The Fitness Loft
          </h1>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors font-light">Home</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-light">About</a>
            <a href="#schedule" className="text-gray-700 hover:text-green-600 transition-colors font-light">Schedule & Rates</a>
            <a href="#gallery" className="text-gray-700 hover:text-green-600 transition-colors font-light">Gallery</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors font-light">Contact</a>
          </div>
          
          {/* Book a Class Button */}
          <button 
            onClick={onBookClick}
            className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
          >
            Book a Class
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;