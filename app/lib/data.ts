
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// TypeScript interfaces for our data structure
export interface DoctorInfo {
  name: string;
  intro: string;
  imageUrl: string;
}

export interface Qualification {
  degree: string;
  institute: string;
  year: string;
}

export interface Experience {
  position: string;
  institute: string;
  duration: string;
}

export interface Service {
  name: string;
  description: string;
}

export interface Chamber {
  name: string;
  address: string;
  time: string;
  days: string[];
  contact: string;
  mapLink: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
}

export interface SocialLinks {
  facebook: string;
  youtube: string;
  linkedin: string;
}

export interface AdminSettings {
  logo: string;
  adminPassword: string;
}

export interface SiteData {
  doctor: DoctorInfo;
  qualifications: Qualification[];
  experience: Experience[];
  services: Service[];
  chambers: Chamber[];
  contact: ContactInfo;
  social: SocialLinks;
  settings: AdminSettings;
}

const DATA_DOC_ID = 'siteData'; // The document ID in Firestore

// --- Default Data --- //
// This data is used for initial setup or if no data is in Firestore
const defaultData: SiteData = {
  doctor: {
    name: 'Dr. Barkot Ali',
    intro: 'MBBS, DCH, FCPS (Pediatrics). Child Specialist & Neonatologist.',
    imageUrl: '/placeholder-doctor.jpg',
  },
  qualifications: [
    { degree: 'FCPS (Pediatrics)', institute: 'BCPS, Dhaka', year: '2016' },
    { degree: 'DCH (Diploma in Child Health)', institute: 'University of Dhaka', year: '2010' },
    { degree: 'MBBS', institute: 'Khulna Medical College', year: '2004' },
  ],
  experience: [
    { position: 'Associate Professor', institute: 'Khulna City Medical College', duration: '2020 - Present' },
    { position: 'Consultant', institute: 'Khulna Medical College Hospital', duration: '2016 - 2020' },
  ],
  services: [
    { name: 'Newborn Care', description: 'Comprehensive care for newborns, including routine check-ups and emergency services.' },
    { name: 'Vaccination', description: 'Complete vaccination services for children of all ages as per national guidelines.' },
    { name: 'Growth Monitoring', description: 'Regular monitoring of physical growth and development milestones.' },
    { name: 'Nutritional Advice', description: 'Expert advice on child nutrition for healthy growth.' },
    { name: 'Common Illnesses', description: 'Treatment for common childhood illnesses like fever, cough, cold, and diarrhea.' },
    { name: 'Pediatric Emergencies', description: 'Handling of pediatric emergency cases with utmost care.' },
  ],
  chambers: [
    {
      name: 'Popular Diagnostic Center',
      address: '2, KDA Avenue, Khulna',
      time: '5 PM - 8 PM',
      days: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
      contact: '+880 1234-567890',
      mapLink: 'https://maps.app.goo.gl/9aJj3jfs9k3fDj3k9',
    },
  ],
  contact: {
    phone: '+8801712050951',
    email: 'info@drbarkot.com',
    whatsapp: '+8801712050951',
  },
  social: {
    facebook: 'https://facebook.com/drbarkot',
    youtube: '#',
    linkedin: '#',
  },
  settings: {
    logo: '/logo-placeholder.png',
    adminPassword: 'Barkot Ali', // IMPORTANT: Move this to a secure environment variable!
  },
};

// --- Data Access Functions --- //

/**
 * Fetches the site data from Firestore.
 * If no data is found, it initializes Firestore with default data and returns it.
 */
export async function getData(): Promise<SiteData> {
  try {
    const docRef = doc(db, 'siteContent', DATA_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Make sure the fetched data conforms to the SiteData structure
      const fetchedData = docSnap.data() as SiteData;
      // Merge with default data to ensure all fields are present
      return { ...defaultData, ...fetchedData };
    } else {
      console.log('No such document! Initializing with default data.');
      // Document doesn't exist, so create it with default data
      await setData(defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    // In case of error, return default data so the site can still run
    return defaultData;
  }
}

/**
 * Saves the entire site data object to Firestore.
 * @param {SiteData} data The complete site data object to save.
 */
export async function setData(data: SiteData): Promise<void> {
  try {
    const docRef = doc(db, 'siteContent', DATA_DOC_ID);
    await setDoc(docRef, data, { merge: true }); // Using merge to be safe
  } catch (error) {
    console.error('Error saving data to Firestore:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
}

/**
 * Returns the default data. Useful for initial state or resets.
 */
export function getDefaultData(): SiteData {
  return defaultData;
}
