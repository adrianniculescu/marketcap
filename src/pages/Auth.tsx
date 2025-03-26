
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Welcome to CryptoMarket</h1>
            <p className="text-muted-foreground">
              Sign in to access your account or create a new one to track cryptocurrencies and receive marketing alerts.
            </p>
          </div>
          
          <AuthForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
