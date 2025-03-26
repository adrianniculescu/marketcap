
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Shield, Users, Lightbulb, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About CoinCruncher</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your ultimate cryptocurrency analytics and marketing connection platform.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link to="/dashboard">Explore Market</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://coincruncher.com/contact" target="_blank" rel="noopener noreferrer">Contact Us</a>
              </Button>
            </div>
          </div>
          
          {/* Mission Statement */}
          <div className="glass-morphism p-8 rounded-xl mb-16">
            <h2 className="text-2xl font-semibold mb-4 text-center">Our Mission</h2>
            <p className="text-lg text-center max-w-2xl mx-auto">
              At CoinCruncher, we're dedicated to providing powerful cryptocurrency analytics while 
              connecting innovative blockchain projects with marketing professionals. Our platform 
              delivers real-time market data and facilitates connections that help projects grow in 
              a competitive landscape.
            </p>
          </div>
          
          {/* Features/Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="glass-morphism p-6 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Trust & Security</h3>
              <p className="text-muted-foreground">
                We prioritize data accuracy and user privacy, ensuring a secure experience for all platform users.
              </p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Community Focus</h3>
              <p className="text-muted-foreground">
                We believe in the power of connections and building a strong network within the crypto ecosystem.
              </p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously evolve our platform to meet the dynamic needs of the cryptocurrency market.
              </p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Real-Time Data</h3>
              <p className="text-muted-foreground">
                Providing up-to-the-minute market information to help users make informed decisions.
              </p>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-morphism p-6 rounded-xl text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-crypto-blue to-primary/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">JD</span>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-1">John Doe</h3>
                <p className="text-sm text-muted-foreground mb-3">Founder & CEO</p>
                <p className="text-sm">
                  With 8+ years in blockchain technology, John leads our vision to transform crypto analytics.
                </p>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-crypto-blue to-primary/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">JS</span>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-1">Jane Smith</h3>
                <p className="text-sm text-muted-foreground mb-3">CTO</p>
                <p className="text-sm">
                  Jane brings extensive experience in fintech development and data security to our platform.
                </p>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-crypto-blue to-primary/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">MT</span>
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-1">Michael Thompson</h3>
                <p className="text-sm text-muted-foreground mb-3">Head of Marketing</p>
                <p className="text-sm">
                  Michael's strategic approach helps us connect projects with the right marketing solutions.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="glass-morphism p-8 rounded-xl text-center">
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Whether you're a cryptocurrency project seeking marketing expertise or a marketing professional 
              looking to offer your services, CoinCruncher is your platform for growth and success.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/auth?mode=register">Create an Account</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="https://coincruncher.com/contact" target="_blank" rel="noopener noreferrer">Contact Our Team</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
