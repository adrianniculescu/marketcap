
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCoin } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Github, 
  Twitter,
  Info,
  ChevronUp,
  ChevronDown,
  Clock,
  DollarSign,
  BarChart2,
} from 'lucide-react';

const CoinDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadCoin = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const coinData = await fetchCoin(id);
        setCoin(coinData);
      } catch (error) {
        console.error('Failed to load coin:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCoin();
  }, [id]);
  
  const formatPrice = (price: number) => {
    if (!price) return 'N/A';
    if (price < 0.01) return '$' + price.toFixed(6);
    if (price < 1) return '$' + price.toFixed(4);
    if (price < 1000) return '$' + price.toFixed(2);
    return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };
  
  const formatPriceChange = (change: number) => {
    if (!change && change !== 0) return 'N/A';
    return change.toFixed(2) + '%';
  };
  
  const formatLargeNumber = (num: number) => {
    if (!num && num !== 0) return 'N/A';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + ' T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + ' B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + ' M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + ' K';
    return num.toFixed(2);
  };
  
  const getPriceChangeColor = (change: number) => {
    if (!change && change !== 0) return 'text-muted-foreground';
    return change >= 0 ? 'text-crypto-green' : 'text-crypto-red';
  };
  
  const getPriceChangeIcon = (change: number) => {
    if (!change && change !== 0) return null;
    return change >= 0 ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 pb-20">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Market
              </Link>
            </Button>
            
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <Skeleton className="h-12 w-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-4 w-20 mt-2" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full mt-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-6">
                  <img 
                    src={coin?.image} 
                    alt={coin?.name} 
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <div>
                    <h1 className="text-3xl font-bold flex items-center">
                      {coin?.name}
                      <span className="text-lg font-normal text-muted-foreground ml-2 uppercase">
                        {coin?.symbol}
                      </span>
                      <span className="ml-3 text-sm px-2 py-1 bg-muted rounded-full">
                        Rank #{coin?.market_cap_rank}
                      </span>
                    </h1>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
                  <div>
                    <div className="text-4xl font-bold">
                      {formatPrice(coin?.current_price)}
                    </div>
                    <div className={`flex items-center mt-1 ${getPriceChangeColor(coin?.price_change_percentage_24h)}`}>
                      {getPriceChangeIcon(coin?.price_change_percentage_24h)}
                      <span className="font-medium">
                        {formatPriceChange(coin?.price_change_percentage_24h)}
                      </span>
                      <span className="text-muted-foreground ml-2 text-sm">
                        (24h)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:ml-auto">
                    <Button variant="outline" size="sm" className="h-8">
                      <Globe className="h-3.5 w-3.5 mr-1" />
                      Website
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <Github className="h-3.5 w-3.5 mr-1" />
                      Github
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <Twitter className="h-3.5 w-3.5 mr-1" />
                      Twitter
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="glass-morphism rounded-xl p-5 border border-border/50">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                        <BarChart2 className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Market Cap</span>
                    </div>
                    <div className="text-xl font-bold">${formatLargeNumber(coin?.market_cap)}</div>
                  </div>
                  
                  <div className="glass-morphism rounded-xl p-5 border border-border/50">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Trading Volume (24h)</span>
                    </div>
                    <div className="text-xl font-bold">${formatLargeNumber(coin?.total_volume)}</div>
                  </div>
                  
                  <div className="glass-morphism rounded-xl p-5 border border-border/50">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-crypto-green/10 flex items-center justify-center mr-3">
                        <TrendingUp className="h-4 w-4 text-crypto-green" />
                      </div>
                      <span className="text-sm text-muted-foreground">All-Time High</span>
                    </div>
                    <div className="text-xl font-bold">
                      {formatPrice(coin?.ath)}
                      <span className={`text-xs ml-2 ${getPriceChangeColor(coin?.ath_change_percentage)}`}>
                        {formatPriceChange(coin?.ath_change_percentage)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="glass-morphism rounded-xl p-5 border border-border/50">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-crypto-red/10 flex items-center justify-center mr-3">
                        <TrendingDown className="h-4 w-4 text-crypto-red" />
                      </div>
                      <span className="text-sm text-muted-foreground">All-Time Low</span>
                    </div>
                    <div className="text-xl font-bold">
                      {formatPrice(coin?.atl)}
                      <span className={`text-xs ml-2 ${getPriceChangeColor(coin?.atl_change_percentage)}`}>
                        {formatPriceChange(coin?.atl_change_percentage)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="markets">Markets</TabsTrigger>
                    <TabsTrigger value="history">Historical Data</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div className="glass-morphism rounded-xl p-6 border border-border/50">
                      <h2 className="text-xl font-semibold mb-4">About {coin?.name}</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {coin?.description || `No description available for ${coin?.name}.`}
                      </p>
                    </div>
                    
                    <div className="glass-morphism rounded-xl p-6 border border-border/50">
                      <h2 className="text-xl font-semibold mb-4">Supply Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Circulating Supply</p>
                          <p className="font-medium">{formatLargeNumber(coin?.circulating_supply)} {coin?.symbol?.toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total Supply</p>
                          <p className="font-medium">{formatLargeNumber(coin?.total_supply)} {coin?.symbol?.toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Max Supply</p>
                          <p className="font-medium">{formatLargeNumber(coin?.max_supply)} {coin?.symbol?.toUpperCase()}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="markets">
                    <div className="glass-morphism rounded-xl p-6 border border-border/50">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Market Data</h2>
                        <Button variant="outline" size="sm">
                          <Info className="h-4 w-4 mr-2" />
                          Refresh
                        </Button>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {coin?.name} is traded on multiple exchanges. View detailed market information.
                      </p>
                      <div className="bg-muted/30 p-4 rounded-lg text-center">
                        <p className="text-muted-foreground">
                          Market data will be displayed here in a future update.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <div className="glass-morphism rounded-xl p-6 border border-border/50">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Price History</h2>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Clock className="h-4 w-4 mr-2" />
                            1D
                          </Button>
                          <Button variant="outline" size="sm">7D</Button>
                          <Button variant="outline" size="sm">1M</Button>
                          <Button variant="outline" size="sm">1Y</Button>
                          <Button variant="outline" size="sm">All</Button>
                        </div>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg text-center h-72 flex items-center justify-center">
                        <p className="text-muted-foreground">
                          Price chart will be displayed here in a future update.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoinDetail;
