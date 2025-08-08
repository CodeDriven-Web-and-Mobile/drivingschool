// Lesson status types
export type LessonStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

// Lesson type definition
export interface Lesson {
  id: string;
  studentId: string;
  instructorId: string;
  startTime: Date;
  endTime: Date;
  status: LessonStatus;
  location: {
    pickupAddress: string;
    dropoffAddress?: string;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Instructor availability time slot
export interface AvailabilitySlot {
  id: string;
  instructorId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // Format: "HH:MM" in 24-hour format
  endTime: string; // Format: "HH:MM" in 24-hour format
  isRecurring: boolean;
  specificDate?: Date; // Only used if isRecurring is false
}

// Instructor type definition
export interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  yearsOfExperience: number;
  specialties: string[];
  languages: string[];
  rating: number;
  availability: AvailabilitySlot[];
  vehicle: {
    make: string;
    model: string;
    year: number;
    transmission: 'automatic' | 'manual';
  };
  profileImage?: string;
  bio?: string;
}

// Student type definition
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  licenseType: 'learner' | 'provisional' | 'full' | 'none';
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  notes?: string;
  registrationDate: Date;
}

// Lesson package type definition
export interface LessonPackage {
  id: string;
  name: string;
  description: string;
  numberOfLessons: number;
  durationPerLesson: number; // in minutes
  price: number;
  features: string[];
  isPopular?: boolean;
}
