
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { triggerAlert } from '@/lib/api';

interface AlertContextType {
  sendAlert: (type: string, message: string) => void;
  initializeAlerts: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [initialized, setInitialized] = useState(false);

  const sendAlert = (type: string, message: string) => {
    // Send an alert using the triggerAlert function from api.ts
    triggerAlert(type, message);
  };

  const initializeAlerts = () => {
    if (isAuthenticated && !initialized) {
      setInitialized(true);
      
      // Demo alerts that will show after a delay
      const demoAlerts = [
        {
          type: 'price_alerts',
          message: 'Bitcoin (BTC) is up 3.2% in the last hour',
          delay: 5000
        },
        {
          type: 'new_listings',
          message: 'New token listed: MetaverseX (MVX) on Binance',
          delay: 15000
        },
        {
          type: 'marketing_opportunities',
          message: 'DeFi project seeking marketing partners - $50K budget',
          delay: 25000
        }
      ];
      
      // Schedule demo alerts
      demoAlerts.forEach(alert => {
        setTimeout(() => {
          sendAlert(alert.type, alert.message);
        }, alert.delay);
      });
    }
  };

  // Initialize alerts when user logs in
  useEffect(() => {
    if (isAuthenticated && user && !initialized) {
      initializeAlerts();
    }
  }, [isAuthenticated, user]);

  return (
    <AlertContext.Provider value={{ sendAlert, initializeAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  
  return context;
};
