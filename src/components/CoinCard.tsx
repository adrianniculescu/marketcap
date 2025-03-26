
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CoinCardProps {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  priceChange24h: number;
  className?: string;
}

const CoinCard: React.FC<CoinCardProps> = ({
  id,
  name,
  symbol,
  image,
  price,
  priceChange24h,
  className,
}) => {
  const formatPrice = (price: number) => {
    if (price < 0.01) return '$' + price.toFixed(6);
    if (price < 1) return '$' + price.toFixed(4);
    if (price < 1000) return '$' + price.toFixed(2);
    return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  const formatPriceChange = (change: number) => {
    return change.toFixed(2) + '%';
  };

  const isPositive = priceChange24h >= 0;

  return (
    <Link to={`/coin/${id}`}>
      <div
        className={cn(
          'glass-morphism p-5 rounded-xl transition-all duration-300 hover:shadow-md',
          'border border-border/50 hover:border-primary/20',
          'transform hover:-translate-y-1',
          className
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img src={image} alt={name} className="w-10 h-10 rounded-full" loading="lazy" />
            <div>
              <h3 className="font-semibold text-base">{name}</h3>
              <p className="text-xs uppercase text-muted-foreground">{symbol}</p>
            </div>
          </div>
          <div
            className={cn(
              'text-xs font-medium px-2 py-1 rounded-full',
              isPositive
                ? 'bg-crypto-green/10 text-crypto-green'
                : 'bg-crypto-red/10 text-crypto-red'
            )}
          >
            {isPositive ? '+' : ''}{formatPriceChange(priceChange24h)}
          </div>
        </div>
        <p className="text-xl font-bold">{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default CoinCard;
