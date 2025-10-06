// src/components/booking/BookingModal.js
import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from 'firebase/firestore';

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedSlotId: '',
    selectedSlot: null,
    experience: 'beginner'
  });

  const [step, setStep] = useState(1);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available slots from Firebase
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!isOpen) return;
      
      try {
        setLoading(true);
        const slotsQuery = query(
          collection(db, 'availableSlots'),
          where('available', '==', true)
        );
        const querySnapshot = await getDocs(slotsQuery);
        
        const slots = [];
        querySnapshot.forEach((doc) => {
          const slotData = doc.data();
          // Only show slots that have available spots
          if (slotData.totalSpots > slotData.bookedSpots) {
            slots.push({
              id: doc.id,
              ...slotData,
              availableSpots: slotData.totalSpots - slotData.bookedSpots
            });
          }
        });

        // Sort slots by date and time
        slots.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA - dateB;
        });

        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
        alert('Error loading available slots. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSlotSelection = (slot) => {
    setFormData({
      ...formData,
      selectedSlotId: slot.id,
      selectedSlot: slot
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create booking record
      const bookingData = {
        userEmail: formData.email,
        userName: formData.name,
        phone: formData.phone,
        slotId: formData.selectedSlotId,
        slotDate: formData.selectedSlot.date,
        slotTime: formData.selectedSlot.time,
        instructor: formData.selectedSlot.instructor,
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        experience: formData.experience
      };

      // Add booking to database
      await addDoc(collection(db, 'bookings'), bookingData);

      // Update slot's booked spots count
      const slotRef = doc(db, 'availableSlots', formData.selectedSlotId);
      await updateDoc(slotRef, {
        bookedSpots: formData.selectedSlot.bookedSpots + 1
      });

      console.log('Booking confirmed:', bookingData);
      alert('🎉 Booking confirmed! You will receive a confirmation email shortly.');
      
      // Reset form and close modal
      handleClose();
      
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('❌ Error creating booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      selectedSlotId: '',
      selectedSlot: null,
      experience: 'beginner'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light text-gray-900">Book Your Class</h2>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          {/* Progress Indicator */}
          <div className="flex mt-4">
            <div className={`flex-1 h-2 rounded ${step >= 1 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded ml-2 ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-2 rounded ml-2 ${step >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-light text-green-700 mb-4">Personal Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.email || !formData.phone}
                className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next: Select Time
              </button>
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-light text-green-700 mb-4">Select Your Class</h3>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading available slots...</p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No available slots at the moment. Please try again later.</p>
                </div>
              ) : (
                <div className="grid gap-4 max-h-64 overflow-y-auto">
                  {availableSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.selectedSlotId === slot.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => handleSlotSelection(slot)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">
                            {new Date(slot.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="text-green-600 font-medium">{slot.time} with {slot.instructor}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {slot.availableSpots} spots available
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.selectedSlotId}
                  className="flex-1 bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Review Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-light text-green-700 mb-4">Confirm Your Booking</h3>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  {formData.selectedSlot && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">
                          {new Date(formData.selectedSlot.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{formData.selectedSlot.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Instructor:</span>
                        <span className="font-medium">{formData.selectedSlot.instructor}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium capitalize">{formData.experience}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-4">
                    <span className="text-gray-600">Class Fee:</span>
                    <span className="font-medium text-green-600">$25</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>• You will receive a confirmation email shortly</p>
                <p>• Please arrive 10 minutes early for your first class</p>
                <p>• Bring a water bottle and comfortable workout attire</p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Confirming...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingModal;