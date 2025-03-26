
import { useToast } from "@/hooks/use-toast";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  circulating_supply: number;
  total_supply: number;
  ath: number;
  ath_change_percentage: number;
  atl: number;
  atl_change_percentage: number;
}

interface MarketData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { btc: number; eth: number };
}

const API_URL = 'https://api.coingecko.com/api/v3';

export async function fetchCoins(page = 1, perPage = 25): Promise<Coin[]> {
  try {
    // Mock data for now
    const response = await fetch(
      `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching coins:', error);
    // Return mock data if the API fails
    return generateMockCoins(page, perPage);
  }
}

export async function fetchCoin(id: string): Promise<Coin> {
  try {
    const response = await fetch(`${API_URL}/coins/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch coin');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching coin ${id}:`, error);
    // Return mock data if the API fails
    return generateMockCoin(id);
  }
}

export async function fetchGlobalData(): Promise<MarketData> {
  try {
    const response = await fetch(`${API_URL}/global`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch global data');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching global data:', error);
    // Return mock data if the API fails
    return {
      total_market_cap: { usd: 1245678901234 },
      total_volume: { usd: 78901234567 },
      market_cap_percentage: { btc: 42.5, eth: 18.3 }
    };
  }
}

// Mock data generators
function generateMockCoin(id: string): Coin {
  const name = id.charAt(0).toUpperCase() + id.slice(1);
  const symbol = id.slice(0, 3).toUpperCase();
  
  return {
    id,
    name,
    symbol,
    image: `https://via.placeholder.com/64?text=${symbol}`,
    current_price: Math.random() * 10000,
    market_cap: Math.random() * 1000000000000,
    market_cap_rank: Math.floor(Math.random() * 100) + 1,
    price_change_percentage_24h: (Math.random() * 20) - 10,
    price_change_percentage_7d_in_currency: (Math.random() * 40) - 20,
    price_change_percentage_30d_in_currency: (Math.random() * 60) - 30,
    circulating_supply: Math.random() * 100000000,
    total_supply: Math.random() * 200000000,
    ath: Math.random() * 20000,
    ath_change_percentage: (Math.random() * 200) - 100,
    atl: Math.random() * 100,
    atl_change_percentage: Math.random() * 10000,
  };
}

function generateMockCoins(page: number, perPage: number): Coin[] {
  const mockCoins: Coin[] = [];
  const popularCoins = [
    'bitcoin', 'ethereum', 'tether', 'bnb', 'xrp', 
    'usdc', 'solana', 'cardano', 'avalanche', 'dogecoin',
    'polkadot', 'tron', 'litecoin', 'polygon', 'uniswap',
    'chainlink', 'stellar', 'monero', 'cosmos', 'ethereum-classic'
  ];
  
  for (let i = 0; i < perPage; i++) {
    const index = (page - 1) * perPage + i;
    const id = index < popularCoins.length 
      ? popularCoins[index] 
      : `coin-${index + 1}`;
    
    mockCoins.push(generateMockCoin(id));
  }
  
  return mockCoins;
}

// Email alerts
export async function subscribeToAlerts(email: string, preferences: string[]): Promise<boolean> {
  try {
    // Mock API call
    console.log('Subscribing', email, 'to alerts with preferences:', preferences);
    return true;
  } catch (error) {
    console.error('Error subscribing to alerts:', error);
    return false;
  }
}

// Marketing contact submission
export interface MarketingContact {
  name: string;
  email: string;
  telegram?: string;
  whatsapp?: string;
  project?: string;
  message?: string;
}

export async function submitMarketingContact(contact: MarketingContact): Promise<boolean> {
  try {
    // Mock API call
    console.log('Submitting marketing contact:', contact);
    return true;
  } catch (error) {
    console.error('Error submitting marketing contact:', error);
    return false;
  }
}
