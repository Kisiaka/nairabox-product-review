import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, BookedTicket } from '../types/auth';
import { LocationSelection } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (
    name: string,
    email: string,
    pass: string,
    preferredLocation?: LocationSelection
  ) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: (customAccount?: { name: string; email: string }) => Promise<{ success: boolean }>;
  signOut: () => void;
  bookedTickets: BookedTicket[];
  addBookedTicket: (ticket: Omit<BookedTicket, 'id' | 'bookedAt'>) => BookedTicket;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'nairabox_prototype_user_v1';
const STORAGE_KEY_TICKETS = 'nairabox_prototype_tickets_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [bookedTickets, setBookedTickets] = useState<BookedTicket[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TICKETS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.warn('Failed to persist user in localStorage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(bookedTickets));
    } catch (e) {
      console.warn('Failed to persist tickets in localStorage', e);
    }
  }, [bookedTickets]);

  const signInWithEmail = async (email: string, pass: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!pass || pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    // Extract name from email username if not set
    const fallbackName = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);

    const loggedInUser: User = {
      id: `usr_${Date.now()}`,
      name: formattedName,
      email: email.trim().toLowerCase(),
      authProvider: 'email',
      preferredLocation: { state: 'Lagos', neighbourhood: 'Ikeja' },
      createdAt: new Date().toISOString(),
    };

    setUser(loggedInUser);
    return { success: true };
  };

  const signUpWithEmail = async (
    name: string,
    email: string,
    pass: string,
    preferredLocation?: LocationSelection
  ) => {
    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!pass || pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      authProvider: 'email',
      preferredLocation: preferredLocation || { state: 'Lagos', neighbourhood: 'Ikeja' },
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    return { success: true };
  };

  const signInWithGoogle = async (customAccount?: { name: string; email: string }) => {
    // Default to the provided user session email if available
    const accountName = customAccount?.name || 'Kunle Isiaka';
    const accountEmail = customAccount?.email || 'kunleisiaka9@gmail.com';

    const googleUser: User = {
      id: `goog_${Date.now()}`,
      name: accountName,
      email: accountEmail,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(accountName)}&backgroundColor=059669`,
      authProvider: 'google',
      preferredLocation: { state: 'Lagos', neighbourhood: 'Ikeja' },
      createdAt: new Date().toISOString(),
    };

    setUser(googleUser);
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
  };

  const addBookedTicket = (ticketData: Omit<BookedTicket, 'id' | 'bookedAt'>) => {
    const newTicket: BookedTicket = {
      ...ticketData,
      id: `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      bookedAt: new Date().toISOString(),
    };
    setBookedTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        bookedTickets,
        addBookedTicket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
