// src/components/admin/DataSeeder.js
import React from 'react';
import { seedAvailableSlots, seedBookings } from '../../utils/seedData';

const DataSeeder = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Admin Tools (Temporary)</h3>
      <div className="space-y-2">
        <button
          onClick={seedAvailableSlots}
          className="block w-full bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
        >
          Add Sample Slots
        </button>
        <button
          onClick={seedBookings}
          className="block w-full bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          Add Sample Bookings
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Remove this component after seeding data
      </p>
    </div>
  );
};

export default DataSeeder;