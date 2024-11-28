"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getLoggedInUser } from '@/app/appwrite';

// Create the context
interface DataContextType {
  user: any;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getLoggedInUser();
        setUser(userData);
      } catch (error) {
        console.error('User not logged in:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <DataContext.Provider value={{ user }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
