
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { articles } from '@/data/articles';

const Learn: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Crypto Knowledge Base</h1>
            <p className="text-xl text-muted-foreground">
              Your one-stop resource for learning everything about cryptocurrency, from basic concepts to advanced trading strategies.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <Input placeholder="Search articles..." className="flex-grow" />
            <Button>Search</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((article) => (
              <div key={article.id} className="bg-card rounded-xl overflow-hidden border border-border/50 transition-all hover:shadow-lg flex flex-col">
                <div className="w-full h-48 bg-muted">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-primary font-semibold mb-2">{article.category.toUpperCase()}</p>
                  <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {article.description.substring(0, 120)}...
                  </p>
                  <Button variant="link" className="p-0 h-auto self-start">Read more &rarr;</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
