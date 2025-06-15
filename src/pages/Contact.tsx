
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Thank you for your message. We will get back to you shortly.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">
              Have a question, a partnership proposal, or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="glass-morphism p-8 rounded-xl border border-border/50">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                  <Input id="name" type="text" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">Subject</label>
                  <Input id="subject" type="text" placeholder="Partnership Inquiry" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                  <Textarea id="message" placeholder="Your message..." rows={5} required />
                </div>
                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-morphism p-8 rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary" />
                    <span>contact@coincruncher.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-primary mt-1" />
                    <span>123 Crypto Lane, Suite 100<br />Metropolis, CA 90210, USA</span>
                  </div>
                </div>
              </div>
              <div className="glass-morphism p-8 rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 5:00 PM (PST)<br />
                  We aim to respond to all inquiries within 24 business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

