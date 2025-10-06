// src/utils/seedData.js
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Sample available slots data
const sampleSlots = [
  {
    date: '2024-09-16',
    time: '07:00',
    instructor: 'Sarah',
    totalSpots: 8,
    bookedSpots: 0,
    available: true
  },
  {
    date: '2024-09-16',
    time: '09:00',
    instructor: 'Mike',
    totalSpots: 6,
    bookedSpots: 1,
    available: true
  },
  {
    date: '2024-09-16',
    time: '18:00',
    instructor: 'Emma',
    totalSpots: 10,
    bookedSpots: 3,
    available: true
  },
  {
    date: '2024-09-17',
    time: '07:00',
    instructor: 'Sarah',
    totalSpots: 8,
    bookedSpots: 0,
    available: true
  },
  {
    date: '2024-09-17',
    time: '09:00',
    instructor: 'Mike',
    totalSpots: 6,
    bookedSpots: 2,
    available: true
  },
  {
    date: '2024-09-17',
    time: '18:00',
    instructor: 'Emma',
    totalSpots: 10,
    bookedSpots: 1,
    available: true
  },
  {
    date: '2024-09-18',
    time: '07:00',
    instructor: 'Sarah',
    totalSpots: 8,
    bookedSpots: 0,
    available: true
  },
  {
    date: '2024-09-18',
    time: '19:00',
    instructor: 'Mike',
    totalSpots: 6,
    bookedSpots: 0,
    available: true
  }
];

// Function to seed available slots
export const seedAvailableSlots = async () => {
  try {
    console.log('Adding available slots...');
    
    for (const slot of sampleSlots) {
      const docRef = await addDoc(collection(db, 'availableSlots'), slot);
      console.log('Added slot:', docRef.id);
    }
    
    console.log('✅ All slots added successfully!');
    alert('✅ Sample data added! Check your Firebase console.');
  } catch (error) {
    console.error('Error adding slots:', error);
    alert('❌ Error adding data. Check console for details.');
  }
};

// Sample bookings data
const sampleBookings = [
  {
    userEmail: 'john.doe@email.com',
    userName: 'John Doe',
    phone: '(555) 123-4567',
    slotDate: '2024-09-16',
    slotTime: '09:00',
    instructor: 'Mike',
    bookingDate: new Date().toISOString(),
    status: 'confirmed',
    experience: 'beginner'
  },
  {
    userEmail: 'jane.smith@email.com',
    userName: 'Jane Smith',
    phone: '(555) 987-6543',
    slotDate: '2024-09-17',
    slotTime: '18:00',
    instructor: 'Emma',
    bookingDate: new Date().toISOString(),
    status: 'confirmed',
    experience: 'intermediate'
  }
];

// Function to seed bookings
export const seedBookings = async () => {
  try {
    console.log('Adding sample bookings...');
    
    for (const booking of sampleBookings) {
      const docRef = await addDoc(collection(db, 'bookings'), booking);
      console.log('Added booking:', docRef.id);
    }
    
    console.log('✅ All bookings added successfully!');
    alert('✅ Sample bookings added!');
  } catch (error) {
    console.error('Error adding bookings:', error);
    alert('❌ Error adding bookings. Check console for details.');
  }
};