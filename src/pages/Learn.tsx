
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const articles = [
  {
    id: 1,
    title: "What Is Cryptocurrency and How Does It Work?",
    category: "Beginner",
    description: "Cryptocurrency is a digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit or double-spend. Many cryptocurrencies are decentralized networks based on blockchain technology—a distributed ledger enforced by a disparate network of computers. A defining feature of cryptocurrencies is that they are generally not issued by any central authority, rendering them theoretically immune to government interference or manipulation. This article explores the fundamentals, from how transactions are processed and wallets work, to the distinction between coins like Bitcoin and altcoins. Understanding these core principles is the first step to navigating the exciting and often volatile world of digital assets.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: 2,
    title: "Understanding Blockchain Technology",
    category: "Technology",
    description: "Blockchain is the core technology behind most cryptocurrencies, but its potential applications go far beyond digital money. At its heart, a blockchain is a distributed, immutable ledger. It's a chain of 'blocks' containing information, where each block is cryptographically linked to the previous one. This structure makes the data transparent and resistant to modification. This guide delves into the mechanics of blockchain, explaining concepts like decentralization, consensus mechanisms (like Proof of Work and Proof of Stake), and smart contracts. We'll also look at how blockchain is poised to revolutionize industries from supply chain management to voting systems by offering a new level of trust and security.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
  },
  {
    id: 3,
    title: "How to Keep Your Crypto Safe: A Security Guide",
    category: "Security",
    description: "In the world of crypto, you are your own bank. This freedom comes with the responsibility of securing your assets. Crypto security is paramount, as stolen funds are often unrecoverable. This guide covers essential security practices for every crypto user. We'll discuss the differences between hot wallets (online) and cold wallets (offline), and why hardware wallets are considered the gold standard for long-term storage. You'll learn how to create strong passwords, enable two-factor authentication (2FA), recognize and avoid common phishing scams, and why you should never share your private keys or seed phrase. Following these best practices will significantly reduce your risk of losing your valuable digital assets.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: 4,
    title: "An Introduction to Decentralized Finance (DeFi)",
    category: "DeFi",
    description: "Decentralized Finance, or DeFi, is an umbrella term for financial applications built on blockchain technology that aim to disrupt traditional financial intermediaries. DeFi platforms allow people to lend, borrow, trade, and earn interest on their crypto assets without relying on banks or brokerages. This is made possible through smart contracts on blockchains like Ethereum. In this article, we'll explore the key components of the DeFi ecosystem, including decentralized exchanges (DEXs), lending protocols, and stablecoins. We'll also touch upon the opportunities and risks involved, such as high yields versus potential smart contract vulnerabilities and impermanent loss. This is your starting point to understanding the future of finance.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: 5,
    title: "What Are NFTs? A Beginner's Guide",
    category: "NFTs",
    description: "Non-Fungible Tokens (NFTs) have taken the digital world by storm, but what exactly are they? Unlike cryptocurrencies like Bitcoin, which are fungible (interchangeable), each NFT is unique and represents ownership of a specific digital or physical item. This could be a piece of digital art, a collectible, virtual land, or even a concert ticket. This guide explains how NFTs work, the technology that underpins them (usually the Ethereum blockchain), and why they have value. We'll cover how to buy, sell, and mint your own NFTs, and discuss the concepts of digital scarcity and provenance that make them so compelling for creators and collectors alike.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    id: 6,
    title: "A Guide to Yield Farming",
    category: "Advanced",
    description: "Yield farming is an advanced DeFi strategy where users stake or lend their crypto assets to generate high returns or rewards in the form of additional cryptocurrency. It's also known as liquidity mining. Participants, called liquidity providers (LPs), add funds to liquidity pools. In return, they are rewarded with fees generated from the underlying DeFi platform, and often with governance tokens. This article provides a deep dive into the mechanisms of yield farming, explaining concepts like Automated Market Makers (AMMs), liquidity pools, and impermanent loss. We'll walk through a basic yield farming strategy and highlight the high risks that come with the potential for high rewards.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
  },
  {
    id: 7,
    title: "Understanding Crypto Market Cycles",
    category: "Trading",
    description: "The cryptocurrency market is known for its extreme volatility and distinct market cycles, often characterized by massive bull runs followed by steep corrections, or 'crypto winters'. Understanding these cycles is crucial for any long-term investor. This article explores the psychology behind market cycles, from euphoria at the peak to despair at the bottom. We'll examine historical Bitcoin cycles, the role of halving events, and how altcoin performance is often tied to Bitcoin's trajectory. By learning to identify the different phases of a market cycle, investors can make more informed decisions, manage risk, and potentially improve their long-term investment outcomes in this dynamic market.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
  {
    id: 8,
    title: "Layer 1 vs. Layer 2 Scaling Solutions",
    category: "Technology",
    description: "As blockchain networks grow, they often face scalability challenges, leading to slow transaction times and high fees. Scaling solutions are designed to address this 'blockchain trilemma' of balancing security, decentralization, and scalability. This guide explains the two main approaches: Layer 1 (L1) and Layer 2 (L2) solutions. L1 solutions involve improving the base blockchain itself, such as increasing block size or changing the consensus mechanism. L2 solutions are built on top of the main blockchain to handle transactions off-chain, like Rollups or sidechains. Understanding this is key to evaluating the long-term potential of different blockchain projects.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },
  {
    id: 9,
    title: "What Is the Metaverse?",
    category: "Web3",
    description: "The Metaverse represents the next evolution of the internet: a persistent, shared, 3D virtual space where users can interact with each other and with digital objects. While still in its early stages, the vision is of an immersive digital world for work, play, socializing, and commerce. This article explores the core concepts of the Metaverse, its connection to blockchain, cryptocurrencies, and NFTs, which provide the infrastructure for true digital ownership and economies. We'll look at current Metaverse platforms and discuss the technological hurdles and societal implications of building this new digital frontier.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  }
];

const Learn: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Crypto Knowledge Base</h1>
            <p className="text-xl text-muted-foreground">
              Your one-stop resource for learning everything about cryptocurrency, from basic concepts to advanced trading strategies.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <Input placeholder="Search articles..." className="flex-grow" />
            <Button>Search</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((article) => (
              <div key={article.id} className="bg-card rounded-xl overflow-hidden border border-border/50 transition-all hover:shadow-lg flex flex-col">
                <div className="w-full h-48 bg-muted">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-primary font-semibold mb-2">{article.category.toUpperCase()}</p>
                  <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {article.description.substring(0, 120)}...
                  </p>
                  <Button variant="link" className="p-0 h-auto self-start">Read more &rarr;</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
