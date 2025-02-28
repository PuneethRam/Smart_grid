import React from 'react';
import { useWallet } from '@/context/WalletContext';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  const { account, connectWallet, isConnected, isLoading } = useWallet();

  return (
    <header className="bg-gradient-to-r from-green-600 to-teal-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Zap size={28} className="text-yellow-300" />
          <h1 className="text-2xl font-bold">P2P Energy Marketplace</h1>
        </div>
        
        <button
          onClick={connectWallet}
          disabled={isLoading || isConnected}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isConnected
              ? 'bg-green-700 hover:bg-green-800'
              : 'bg-blue-600 hover:bg-blue-700'
          } disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </span>
          ) : isConnected ? (
            <span className="flex items-center">
              Connected: {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
            </span>
          ) : (
            'Connect Wallet'
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;