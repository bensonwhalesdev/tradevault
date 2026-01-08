import { useEffect, useState } from "react";
import { useWallet } from "./useWallet";

export interface BalanceUpdate {
  id: string;
  amount: number;
  change: number; // The change amount from previous balance
  timestamp: Date;
}

export const useBalanceHistory = () => {
  const { wallet, refetch } = useWallet();
  const [balanceHistory, setBalanceHistory] = useState<BalanceUpdate[]>([]);
  const [previousBalance, setPreviousBalance] = useState<number | null>(null);

  useEffect(() => {
    if (wallet?.fiatBalance !== undefined) {
      // If balance changed, add it to history
      if (previousBalance !== null && wallet.fiatBalance !== previousBalance) {
        const change = wallet.fiatBalance - previousBalance;
        const newUpdate: BalanceUpdate = {
          id: `${Date.now()}`,
          amount: wallet.fiatBalance,
          change: change,
          timestamp: new Date(),
        };
        setBalanceHistory((prev) => [newUpdate, ...prev].slice(0, 5)); // Keep last 5 updates
      }
      setPreviousBalance(wallet.fiatBalance);
    }
  }, [wallet?.fiatBalance]);

  // Refetch wallet data periodically to catch admin updates
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       refetch();
  //     }, 5000); // Check every 5 seconds

  //     return () => clearInterval(interval);
  //   }, [refetch]);

  return {
    balanceHistory,
    currentBalance: wallet?.fiatBalance || 0,
  };
};
