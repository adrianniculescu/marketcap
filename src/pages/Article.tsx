
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { articles } from '@/data/articles';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you are looking for does not exist.
            </p>
            <Button asChild>
              <Link to="/learn">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Knowledge Base
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link to="/learn">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Knowledge Base
              </Link>
            </Button>

            <article>
              <div className="mb-8">
                <p className="text-sm text-primary font-semibold mb-2">{article.category.toUpperCase()}</p>
                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              </div>
              <img src={article.image} alt={article.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8" />
              <div
                className="text-lg leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: article.description }}
              />
            </article>

            {relatedArticles.length > 0 && (
              <div className="mt-20 pt-10 border-t">
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedArticles.map((related) => (
                    <Link to={`/learn/${related.id}`} key={related.id} className="bg-card rounded-xl overflow-hidden border border-border/50 transition-all hover:shadow-lg flex flex-col group">
                      <div className="w-full h-40 bg-muted overflow-hidden">
                        <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <p className="text-xs text-primary font-semibold mb-1">{related.category.toUpperCase()}</p>
                        <h3 className="text-base font-semibold flex-grow">{related.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
