// src/components/sections/HeroSection.js
import React from 'react';

const HeroSection = ({ onBookClick, onScheduleClick }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(rgba(134, 164, 134, 0.7), rgba(134, 164, 134, 0.7)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23e8f5e8" width="1200" height="800"/><rect fill="%23d4e8d4" x="100" y="100" width="1000" height="600" rx="20"/><rect fill="%23c0dbc0" x="200" y="200" width="800" height="400" rx="15"/><circle fill="%23a8d0a8" cx="300" cy="300" r="50"/><circle fill="%23a8d0a8" cx="900" cy="500" r="40"/><rect fill="%23b8d6b8" x="150" y="150" width="60" height="20" rx="10"/><rect fill="%23b8d6b8" x="950" y="250" width="80" height="25" rx="12"/></svg>')`
      }}>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h2 className="text-6xl md:text-7xl font-light mb-6 leading-tight">
          Transform Your Body,
          <br />
          <span className="text-green-200">Elevate Your Mind</span>
        </h2>
        <p className="text-xl md:text-2xl font-light mb-12 leading-relaxed max-w-3xl mx-auto">
          Experience premium Pilates in our serene sage-green sanctuary. Build strength, flexibility, and mindfulness in every session.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onBookClick}
            className="bg-white text-green-700 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Book Your First Class
          </button>
          <button 
            onClick={onScheduleClick}
            className="border-2 border-white text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-white hover:text-green-700 transition-colors"
          >
            View Schedule
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;