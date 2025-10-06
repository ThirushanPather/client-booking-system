// src/App.js
import React, { useState } from 'react';
import Navigation from './components/layout/Navigation';
import HeroSection from './components/sections/HeroSection';
import BookingModal from './components/booking/BookingModal';
import DataSeeder from './components/admin/DataSeeder';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookClick = () => {
    setIsBookingModalOpen(true);
  };

  const handleScheduleClick = () => {
    // Smooth scroll to schedule section
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation onBookClick={handleBookClick} />

      {/* Hero Section */}
      <HeroSection 
        onBookClick={handleBookClick}
        onScheduleClick={handleScheduleClick}
      />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-light text-gray-900 mb-6">
              About The Fitness Loft
            </h3>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 font-light">
                Nestled in the heart of the city, The Fitness Loft offers a sanctuary where movement meets mindfulness. 
                Our expert instructors guide you through personalized Pilates sessions that strengthen your core, 
                improve flexibility, and restore balance to your life.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                Whether you're a beginner seeking to build foundation strength or an advanced practitioner looking 
                to deepen your practice, our welcoming community and state-of-the-art equipment provide the perfect 
                environment for transformation.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <h4 className="text-2xl font-light text-green-700 mb-4">Our Philosophy</h4>
              <p className="text-gray-700 leading-relaxed font-light">
                We believe that true fitness comes from the harmony of body and mind. Every class is designed to 
                challenge you physically while creating space for mental clarity and inner peace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-light text-gray-900 mb-6">
              Schedule & Rates
            </h3>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h4 className="text-2xl font-medium text-green-600 mb-6">Morning Sessions</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Monday - Friday</span>
                  <span className="text-gray-600 font-light">7:00 AM - 9:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Saturday</span>
                  <span className="text-gray-600 font-light">8:00 AM - 10:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700 font-medium">Sunday</span>
                  <span className="text-gray-600 font-light">9:00 AM - 11:00 AM</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h4 className="text-2xl font-medium text-green-600 mb-6">Evening Sessions</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Monday - Friday</span>
                  <span className="text-gray-600 font-light">5:30 PM - 7:30 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Saturday</span>
                  <span className="text-gray-600 font-light">4:00 PM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700 font-medium">Sunday</span>
                  <span className="text-gray-600 font-light">Closed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pricing */}
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-medium text-green-600 mb-6">Class Rates</h4>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="border-r border-gray-100 pr-6">
                <div className="text-3xl font-light text-gray-900 mb-2">$25</div>
                <div className="text-gray-600 font-light">Drop-in Class</div>
              </div>
              <div className="border-r border-gray-100 pr-6">
                <div className="text-3xl font-light text-gray-900 mb-2">$200</div>
                <div className="text-gray-600 font-light">10-Class Package</div>
              </div>
              <div>
                <div className="text-3xl font-light text-gray-900 mb-2">$150</div>
                <div className="text-gray-600 font-light">Monthly Unlimited</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-light text-gray-900 mb-6">
              Visit Us
            </h3>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-900 mb-3">Location</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                123 Wellness Street<br />
                Downtown District<br />
                City, State 12345
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-900 mb-3">Phone</h4>
              <p className="text-gray-600 font-light">
                (555) 123-4567
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-900 mb-3">Email</h4>
              <p className="text-gray-600 font-light">
                hello@fitnessloft.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h4 className="text-2xl font-light mb-4 text-green-400">The Fitness Loft</h4>
          <p className="text-gray-400 font-light">
            © 2024 The Fitness Loft. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
      />
      
    </div>
  );
}

export default App;