
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AlertDemo from '@/components/AlertDemo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { BellRing } from 'lucide-react';

const Alerts: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Stay Ahead with Custom Alerts</h1>
            <p className="text-xl text-muted-foreground">
              Never miss a market move or a new marketing opportunity. Configure your alerts to get notified about what matters most to you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Alert Configuration */}
            <div className="lg:col-span-2">
              <div className="glass-morphism p-8 rounded-xl border border-border/50">
                <h2 className="text-2xl font-semibold mb-6 flex items-center"><BellRing className="h-6 w-6 mr-3 text-primary" />Configure Your Alerts</h2>
                
                <div className="space-y-6">
                  {/* Notification Method */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Notification Method</h3>
                    <div className="flex items-center space-x-4">
                      <Input type="email" defaultValue="you@example.com" className="max-w-sm" />
                      <Button variant="outline">Update</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Alerts will be sent to this email address.</p>
                  </div>
                  
                  <div className="border-t border-border/50 pt-6 space-y-4">
                    <h3 className="text-lg font-medium">Alert Types</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">Price Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified of significant price changes for your favorite coins.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">New Listings</p>
                        <p className="text-sm text-muted-foreground">Be the first to know when new tokens are listed on major exchanges.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">Market News</p>
                        <p className="text-sm text-muted-foreground">Receive updates on major news impacting the crypto market.</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">Marketing Opportunities</p>
                        <p className="text-sm text-muted-foreground">Get alerts when projects post new marketing service requests.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Alert Demo */}
            <div className="lg:col-span-1">
              <AlertDemo />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Alerts;

