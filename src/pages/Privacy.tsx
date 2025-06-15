
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto prose dark:prose-invert prose-headings:font-semibold prose-a:text-primary">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: June 15, 2025</p>

            <p>CoinCruncher Inc. ("us", "we", or "our") operates the CoinCruncher website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

            <h2 id="data-collection">1. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, email address, first and last name, cookies, and usage data.</p>

            <h2 id="usage-data">2. Usage Data</h2>
            <p>We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>

            <h2 id="cookies">3. Tracking & Cookies Data</h2>
            <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>

            <h2 id="data-use">4. Use of Data</h2>
            <p>CoinCruncher Inc. uses the collected data for various purposes: to provide and maintain our Service, to notify you about changes to our Service, to allow you to participate in interactive features of our Service when you choose to do so, to provide customer support, and to gather analysis or valuable information so that we can improve our Service.</p>

            <h2 id="data-security">5. Security of Data</h2>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            
            <h2 id="changes">6. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective.</p>

            <h2 id="contact">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@coincruncher.com">privacy@coincruncher.com</a>.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;

