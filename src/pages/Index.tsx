
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { fetchCoins } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CoinCard from '@/components/CoinCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, ArrowDown, TrendingUp, Shield, Bell, Users } from 'lucide-react';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [topCoins, setTopCoins] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadTopCoins = async () => {
      try {
        const coins = await fetchCoins(1, 4);
        setTopCoins(coins);
      } catch (error) {
        console.error('Failed to load top coins:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTopCoins();
  }, []);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Discover Crypto Market Insights & Marketing Opportunities
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Track real-time cryptocurrency prices, connect with projects seeking marketing services, and receive alerts directly to your inbox.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button size="lg" asChild>
                  <Link to={isAuthenticated ? '/dashboard' : '/auth?mode=register'}>
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/dashboard">
                    Explore Market
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative bg-gradient-to-tr from-primary/10 to-purple-500/10 p-1 rounded-2xl">
                <div className="glass-morphism-strong rounded-xl overflow-hidden border border-white/10">
                  <img 
                    src="https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_1280.jpg" 
                    alt="Crypto Dashboard Preview" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-24 flex justify-center">
            <motion.a
              href="#features"
              className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="text-sm mb-2">Discover More</span>
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </motion.a>
          </div>
        </div>
      </section>
      
      {/* Top coins section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top Cryptocurrencies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with real-time prices of the most popular cryptocurrencies in the market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-40 animate-pulse bg-muted rounded-xl"></div>
              ))
            ) : (
              topCoins.map((coin, index) => (
                <motion.div
                  key={coin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CoinCard
                    id={coin.id}
                    name={coin.name}
                    symbol={coin.symbol}
                    image={coin.image}
                    price={coin.current_price}
                    priceChange24h={coin.price_change_percentage_24h}
                  />
                </motion.div>
              ))
            )}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">
                View All Cryptocurrencies
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to stay informed about the crypto market and connect with marketing opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="glass-morphism p-8 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Market Data</h3>
              <p className="text-muted-foreground">
                Access comprehensive, real-time data for thousands of cryptocurrencies, including prices, market cap, volume, and more.
              </p>
            </motion.div>
            
            <motion.div
              className="glass-morphism p-8 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Marketing Alerts</h3>
              <p className="text-muted-foreground">
                Receive timely notifications about projects seeking marketing services, delivered directly to your email inbox.
              </p>
            </motion.div>
            
            <motion.div
              className="glass-morphism p-8 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Authentication</h3>
              <p className="text-muted-foreground">
                Protect your data with our secure authentication system. Your information is always safe and private.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take Your Crypto Marketing to the Next Level?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of marketers who receive our curated opportunities from crypto projects needing your expertise.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
            
            <p className="text-sm text-muted-foreground mt-4">
              By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from marketers and project owners who have found success with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="glass-morphism p-8 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-full mr-4 flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Marketing Consultant</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "This platform has connected me with serious crypto projects that need marketing help. The email alerts are timely and relevant to my expertise."
              </p>
            </motion.div>
            
            <motion.div
              className="glass-morphism p-8 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-crypto-purple rounded-full mr-4 flex items-center justify-center text-white font-bold">
                  AS
                </div>
                <div>
                  <h4 className="font-semibold">Alice Smith</h4>
                  <p className="text-sm text-muted-foreground">Project Owner</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Finding qualified marketers was always a challenge until I discovered this platform. Now I can quickly connect with professionals who understand crypto."
              </p>
            </motion.div>
            
            <motion.div
              className="glass-morphism p-8 rounded-xl border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-crypto-green rounded-full mr-4 flex items-center justify-center text-white font-bold">
                  RJ
                </div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-muted-foreground">Crypto Investor</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The market data is comprehensive and up-to-date. I use this platform daily to track my investments and find new opportunities."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
