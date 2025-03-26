
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { fetchCoins, fetchGlobalData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarketTable from '@/components/MarketTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [coins, setCoins] = useState<any[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [globalData, setGlobalData] = useState<any>({
    totalMarketCap: 0,
    totalVolume: 0,
    btcDominance: 0,
    ethDominance: 0,
  });
  
  const itemsPerPage = 20;
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const coinsData = await fetchCoins(currentPage, itemsPerPage);
        setCoins(coinsData);
        setFilteredCoins(coinsData);
        
        const global = await fetchGlobalData();
        setGlobalData({
          totalMarketCap: global.total_market_cap.usd,
          totalVolume: global.total_volume.usd,
          btcDominance: global.market_cap_percentage.btc,
          ethDominance: global.market_cap_percentage.eth,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [currentPage, sortBy]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCoins(coins);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const filtered = coins.filter(
        coin => 
          coin.name.toLowerCase().includes(query) || 
          coin.symbol.toLowerCase().includes(query)
      );
      setFilteredCoins(filtered);
    }
  }, [searchQuery, coins]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    // In a real app, we would fetch sorted data from API
    // For now, let's just do a simple sort
    let sorted = [...coins];
    
    switch (value) {
      case 'market_cap_desc':
        sorted.sort((a, b) => b.market_cap - a.market_cap);
        break;
      case 'market_cap_asc':
        sorted.sort((a, b) => a.market_cap - b.market_cap);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.current_price - a.current_price);
        break;
      case 'price_asc':
        sorted.sort((a, b) => a.current_price - b.current_price);
        break;
      case 'name_asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'percent_change_24h_desc':
        sorted.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        break;
      case 'percent_change_24h_asc':
        sorted.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        break;
      default:
        break;
    }
    
    setCoins(sorted);
    setFilteredCoins(
      searchQuery.trim() === '' 
        ? sorted 
        : sorted.filter(
            coin => 
              coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
          )
    );
  };
  
  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + ' T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + ' B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + ' M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + ' K';
    return num.toFixed(2);
  };
  
  const totalPages = Math.ceil(100 / itemsPerPage); // Assuming 100 total coins for pagination demo
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 pb-20">
          <h1 className="text-3xl font-bold mb-2">Cryptocurrency Prices</h1>
          <p className="text-muted-foreground mb-8">
            The global crypto market cap is ${formatLargeNumber(globalData.totalMarketCap)}, a change in the last 24h.
          </p>
          
          {!isAuthenticated && (
            <div className="glass-morphism border border-primary/20 rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create an account to unlock full features</h3>
                  <p className="text-muted-foreground">
                    Sign up to receive marketing opportunities and set price alerts.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => navigate('/auth?mode=login')}>
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/auth?mode=register')}>
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="glass-morphism rounded-xl p-5 border border-border/50">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Market Cap</span>
              </div>
              <div className="text-2xl font-bold">${formatLargeNumber(globalData.totalMarketCap)}</div>
            </div>
            
            <div className="glass-morphism rounded-xl p-5 border border-border/50">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">24h Volume</span>
              </div>
              <div className="text-2xl font-bold">${formatLargeNumber(globalData.totalVolume)}</div>
            </div>
            
            <div className="glass-morphism rounded-xl p-5 border border-border/50">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-crypto-yellow/10 flex items-center justify-center mr-3">
                  <span className="text-crypto-yellow font-bold">₿</span>
                </div>
                <span className="text-sm text-muted-foreground">BTC Dominance</span>
              </div>
              <div className="text-2xl font-bold">{globalData.btcDominance.toFixed(2)}%</div>
            </div>
            
            <div className="glass-morphism rounded-xl p-5 border border-border/50">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-crypto-blue/10 flex items-center justify-center mr-3">
                  <span className="text-crypto-blue font-bold">Ξ</span>
                </div>
                <span className="text-sm text-muted-foreground">ETH Dominance</span>
              </div>
              <div className="text-2xl font-bold">{globalData.ethDominance.toFixed(2)}%</div>
            </div>
          </div>
          
          <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1 flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cryptocurrencies..."
                className="pl-9"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="w-full md:w-64">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market_cap_desc">Market Cap ↓</SelectItem>
                  <SelectItem value="market_cap_asc">Market Cap ↑</SelectItem>
                  <SelectItem value="price_desc">Price ↓</SelectItem>
                  <SelectItem value="price_asc">Price ↑</SelectItem>
                  <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                  <SelectItem value="percent_change_24h_desc">24h Change ↓</SelectItem>
                  <SelectItem value="percent_change_24h_asc">24h Change ↑</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <MarketTable coins={filteredCoins} isLoading={isLoading} />
          
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={prevPage}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            
            <Button
              variant="outline"
              onClick={nextPage}
              disabled={currentPage === totalPages || isLoading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
