
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const portfolioData = [
  { name: 'Bitcoin', value: 4000, symbol: 'BTC', price: 68000.50, change: 1.2, holdings: 0.0588 },
  { name: 'Ethereum', value: 3000, symbol: 'ETH', price: 3800.75, change: -0.5, holdings: 0.7893 },
  { name: 'Solana', value: 1500, symbol: 'SOL', price: 170.20, change: 2.5, holdings: 8.813 },
  { name: 'Cardano', value: 1000, symbol: 'ADA', price: 0.45, change: 0.1, holdings: 2222.22 },
  { name: 'Other', value: 500, symbol: 'OTHER', price: 0, change: 0, holdings: 0 },
];

const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f97316', '#64748b'];

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Your Crypto Portfolio</h1>
            <p className="text-xl text-muted-foreground">
              Track your assets in one place. Get a clear overview of your investments and performance.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Main portfolio summary */}
            <Card className="md:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$10,000.00</div>
                <p className="text-xs text-muted-foreground">+2.3% from last month</p>
              </CardContent>
            </Card>

            {/* Asset Allocation */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex flex-col space-y-2 mt-4">
                  {portfolioData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                        {entry.name}
                      </div>
                      <span>{((entry.value / 10000) * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assets Table */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Your Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">24h</TableHead>
                      <TableHead className="text-right">Holdings</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioData.filter(p => p.symbol !== 'OTHER').map((asset) => (
                      <TableRow key={asset.symbol}>
                        <TableCell>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                        </TableCell>
                        <TableCell className="text-right">${asset.price.toFixed(2)}</TableCell>
                        <TableCell className={`text-right ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <div>{asset.holdings.toFixed(4)}</div>
                          <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                        </TableCell>
                        <TableCell className="text-right">${asset.value.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;

