import React, { useState, useEffect } from "react";

interface Wallet {
  address: string;
  balance: number;
  isConnected: boolean;
}

const Web3WalletConnect: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet>({
    address: "",
    balance: 0,
    isConnected: false,
  });

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });
        setWallet({
          address,
          balance: parseInt(balance, 16) / 1e18,
          isConnected: true,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: "",
      balance: 0,
      isConnected: false,
    });
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const address = accounts[0];
          const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [address, "latest"],
          });
          setWallet({
            address,
            balance: parseInt(balance, 16) / 1e18,
            isConnected: true,
          });
        }
      }
    };
    checkConnection();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Receh Token Web3 Wallet</h2>
      {wallet.isConnected ? (
        <div>
          <p className="text-sm font-medium mb-2">Address:</p>
          <p className="text-sm mb-4">{wallet.address}</p>
          <p className="text-sm font-medium mb-2">Balance:</p>
          <p className="text-sm mb-4">{wallet.balance} ETH</p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
      <p>
        <br></br>
      </p>
      <div class="footer">
        2024 © Source code Recehan.gold. All Rigth Reserved
      </div>
    </div>
  );
};

export default Web3WalletConnect;
