
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto prose dark:prose-invert prose-headings:font-semibold">
            <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
            <p className="text-muted-foreground">Last updated: June 15, 2025</p>

            <p>The information contained on the CoinCruncher website (the "Service") is for general information purposes only. CoinCruncher Inc. assumes no responsibility for errors or omissions in the contents on the Service.</p>
            
            <h2 id="no-financial-advice">Not Financial Advice</h2>
            <p>The information provided by CoinCruncher is not intended to be and does not constitute financial advice, investment advice, trading advice, or any other sort of advice and you should not treat any of the website's content as such. CoinCruncher does not recommend that any cryptocurrency should be bought, sold, or held by you.</p>

            <h2 id="accuracy">Accuracy of Information</h2>
            <p>CoinCruncher will strive to ensure accuracy of information listed on this website although it will not hold any responsibility for any missing or wrong information. You understand that you are using any and all information available here at your own risk.</p>

            <h2 id="external-links">External Links Disclaimer</h2>
            <p>The CoinCruncher website may contain links to external websites that are not provided or maintained by or in any way affiliated with CoinCruncher Inc. Please note that the CoinCruncher Inc. does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>

            <h2 id="risk">Investment Risk</h2>
            <p>The cryptocurrency market is highly volatile and comes with a high risk of losing money. Before deciding to trade cryptocurrencies, you should carefully consider your investment objectives, level of experience, and risk appetite. Past performance is not indicative of future results.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Disclaimer;

