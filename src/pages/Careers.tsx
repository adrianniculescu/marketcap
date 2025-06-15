
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, BrainCircuit } from 'lucide-react';

const jobOpenings = [
  {
    title: 'Senior Blockchain Engineer',
    location: 'Remote',
    department: 'Engineering',
    description: 'We are seeking an experienced Blockchain Engineer to design, implement, and support our blockchain-based network. You will be working on various aspects of our platform, from smart contracts to backend services.',
  },
  {
    title: 'Digital Marketing Specialist',
    location: 'New York, NY',
    department: 'Marketing',
    description: 'Join our marketing team to create and manage campaigns that promote CoinCruncher. You will be responsible for SEO, content marketing, and social media engagement to drive user acquisition.',
  },
  {
    title: 'Data Scientist - Crypto Markets',
    location: 'Remote',
    department: 'Data Science',
    description: 'We are looking for a Data Scientist to analyze vast amounts of market data, develop predictive models, and generate insights that will be featured on our platform. A passion for crypto is a must.',
  },
];

const Careers: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Shape the Future of Crypto with Us</h1>
            <p className="text-xl text-muted-foreground">
              We're a passionate team building the next generation of cryptocurrency analytics and marketing tools. If you're excited about blockchain technology, we'd love to hear from you.
            </p>
          </div>
          
          {/* Why Work With Us */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass-morphism p-6 rounded-xl text-center">
              <BrainCircuit className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">Innovate & Learn</h3>
              <p className="text-muted-foreground">Work on cutting-edge problems in the fast-paced world of crypto and expand your skills.</p>
            </div>
            <div className="glass-morphism p-6 rounded-xl text-center">
              <Briefcase className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">Flexible Work</h3>
              <p className="text-muted-foreground">We offer remote and hybrid work options to support work-life balance.</p>
            </div>
            <div className="glass-morphism p-6 rounded-xl text-center">
              <MapPin className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-2">Global Team</h3>
              <p className="text-muted-foreground">Collaborate with talented individuals from around the world.</p>
            </div>
          </div>
          
          {/* Open Positions */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-10">Current Openings</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {jobOpenings.map((job, index) => (
                <div key={index} className="glass-morphism p-6 rounded-xl border border-border/50 transition-shadow hover:shadow-lg">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-2 sm:mt-0">
                      <Briefcase className="h-4 w-4 mr-2" /> {job.department}
                      <span className="mx-2">|</span>
                      <MapPin className="h-4 w-4 mr-2" /> {job.location}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <Button>Apply Now</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;

