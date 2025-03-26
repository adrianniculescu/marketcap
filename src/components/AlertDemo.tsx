
import React from 'react';
import { Button } from './ui/button';
import { useAlerts } from '@/context/AlertContext';
import { Bell, TrendingUp, Newspaper, Briefcase, BarChart } from 'lucide-react';

const AlertDemo = () => {
  const { sendAlert } = useAlerts();

  const alertTypes = [
    {
      type: 'price_alerts',
      label: 'Price Alert',
      message: 'Ethereum (ETH) is up 4.7% in the last hour',
      icon: <TrendingUp className="h-4 w-4 mr-2" />
    },
    {
      type: 'new_listings',
      label: 'New Listing',
      message: 'New token listed: GameFi (GAFI) on Coinbase',
      icon: <Bell className="h-4 w-4 mr-2" />
    },
    {
      type: 'market_news',
      label: 'Market News',
      message: 'SEC approves new crypto ETF applications',
      icon: <Newspaper className="h-4 w-4 mr-2" />
    },
    {
      type: 'marketing_opportunities',
      label: 'Marketing',
      message: 'New NFT project seeking marketing support - $30K budget',
      icon: <Briefcase className="h-4 w-4 mr-2" />
    },
    {
      type: 'portfolio_updates',
      label: 'Portfolio',
      message: 'Your portfolio has increased by 2.3% today',
      icon: <BarChart className="h-4 w-4 mr-2" />
    }
  ];

  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Bell className="h-5 w-5 mr-2 text-primary" />
        Alert Examples
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {alertTypes.map((alert) => (
          <Button 
            key={alert.type}
            variant="outline"
            className="justify-start"
            onClick={() => sendAlert(alert.type, alert.message)}
          >
            {alert.icon}
            {alert.label}
          </Button>
        ))}
      </div>
      
      <p className="text-sm text-muted-foreground mt-4">
        Click any button above to see how alerts appear on the site.
      </p>
    </div>
  );
};

export default AlertDemo;
