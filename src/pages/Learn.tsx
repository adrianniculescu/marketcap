
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { articles } from '@/data/articles';

const Learn: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const categories = useMemo(() => {
    const allCategories = articles.map((article) => article.category);
    return ['All', ...Array.from(new Set(allCategories))];
  }, []);

  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => {
        const matchesCategory =
          selectedCategory === null || article.category === selectedCategory;
        const matchesSearch =
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.id - b.id);
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  
  const getPaginationItems = () => {
    const items = [];
    if (totalPages <= 1) return items;

    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
        />
      </PaginationItem>
    );

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink href="#" isActive={currentPage === 1} onClick={(e) => { e.preventDefault(); handlePageChange(1); }}>1</PaginationLink>
          </PaginationItem>
        );
        
        if (currentPage > 3) {
            items.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
        }
        
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage < 4) {
            startPage = 2;
            endPage = Math.min(4, totalPages - 1);
        }

        if (currentPage > totalPages - 3) {
            startPage = Math.max(2, totalPages - 3);
            endPage = totalPages - 1;
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink href="#" isActive={currentPage === i} onClick={(e) => { e.preventDefault(); handlePageChange(i); }}>{i}</PaginationLink>
                </PaginationItem>
            );
        }

        if (currentPage < totalPages - 2) {
            items.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
        }

        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink href="#" isActive={currentPage === totalPages} onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}>{totalPages}</PaginationLink>
          </PaginationItem>
        );
    }
    
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
        />
      </PaginationItem>
    );
    return items;
  };

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
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input
                placeholder="Search articles..."
                className="flex-grow"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <Button onClick={() => setCurrentPage(1)}>Search</Button>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    (selectedCategory === null && category === 'All') ||
                    selectedCategory === category
                      ? 'default'
                      : 'outline'
                  }
                  onClick={() => handleCategoryChange(category === 'All' ? null : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {currentArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {currentArticles.map((article) => (
                  <Link
                    to={`/learn/${article.id}`}
                    key={article.id}
                    className="flex group"
                  >
                    <div className="bg-card rounded-xl overflow-hidden border border-border/50 transition-all group-hover:shadow-lg flex flex-col w-full">
                      <div className="w-full h-48 bg-muted overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <p className="text-sm text-primary font-semibold mb-2">
                          {article.category.toUpperCase()}
                        </p>
                        <h3 className="text-xl font-semibold mb-3">
                          {article.title}
                        </h3>
                        <p
                          className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: article.description }}
                        ></p>
                        <span className="text-primary font-semibold text-sm self-start mt-auto">
                          Read more &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-16">
                  <Pagination>
                    <PaginationContent>
                      {getPaginationItems()}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center max-w-lg mx-auto py-16">
              <h2 className="text-2xl font-semibold mb-4">No Articles Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any articles matching your search. Try a different search term or category.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory(null); setCurrentPage(1); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
