
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto prose dark:prose-invert prose-headings:font-semibold prose-a:text-primary">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: June 15, 2025</p>

            <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the CoinCruncher website (the "Service") operated by CoinCruncher Inc. ("us", "we", or "our").</p>

            <h2 id="acceptance">1. Acceptance of Terms</h2>
            <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. This Terms of Service agreement was created with the help of a Terms and Conditions Generator.</p>

            <h2 id="service-description">2. Description of Service</h2>
            <p>CoinCruncher provides users with real-time cryptocurrency market data, analytics, and a platform to connect crypto projects with marketing professionals. The information provided on our platform is for informational purposes only and should not be considered as financial advice.</p>

            <h2 id="accounts">3. Accounts</h2>
            <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

            <h2 id="intellectual-property">4. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of CoinCruncher Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

            <h2 id="termination">5. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

            <h2 id="limitation-of-liability">6. Limitation of Liability</h2>
            <p>In no event shall CoinCruncher Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            
            <h2 id="governing-law">7. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.</p>
            
            <h2 id="changes">8. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

            <h2 id="contact">9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@coincruncher.com">legal@coincruncher.com</a>.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;

