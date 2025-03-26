
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
}

interface MarketTableProps {
  coins: Coin[];
  isLoading?: boolean;
}

const MarketTable: React.FC<MarketTableProps> = ({ coins, isLoading = false }) => {
  const formatPrice = (price: number) => {
    if (price < 0.01) return '$' + price.toFixed(6);
    if (price < 1) return '$' + price.toFixed(4);
    if (price < 1000) return '$' + price.toFixed(2);
    return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="w-full overflow-hidden">
        <div className="animate-pulse space-y-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border/50">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              #
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              Name
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              Price
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              24h %
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              Market Cap
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              Circulating Supply
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="hover:bg-muted/30 transition-colors duration-200"
            >
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                {coin.market_cap_rank}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Link
                  to={`/coin/${coin.id}`}
                  className="flex items-center space-x-3 hover:text-primary transition-colors"
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-xs text-muted-foreground uppercase">
                      {coin.symbol}
                    </div>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-4 text-sm text-right whitespace-nowrap font-medium">
                {formatPrice(coin.current_price)}
              </td>
              <td className="px-4 py-4 text-sm text-right whitespace-nowrap">
                <div
                  className={`inline-flex items-center space-x-1 ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-crypto-green"
                      : "text-crypto-red"
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  <span>
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-right whitespace-nowrap">
                ${formatLargeNumber(coin.market_cap)}
              </td>
              <td className="px-4 py-4 text-sm text-right whitespace-nowrap">
                {formatLargeNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
