import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { GetWalletResponse } from '../Types/wallet';

export const GET_WALLET_DATA = gql`
query GetWallet {
    wallet {
      id
      fiatBalance
      totalValue
      totalInvested
      dailyChange
      dailyChangePercent
      monthlyProfit
      tradesToday
      currency
      performanceHistory {
        name
        value
      }
      assetAllocation {
        name
        value
        color
      }
    }
  }
`;

export const useWallet = () => {
  const { data, loading, error, refetch } = useQuery<GetWalletResponse>(GET_WALLET_DATA, {
    notifyOnNetworkStatusChange: true,
    // Optional: poll every 30 seconds for live updates
    // pollInterval: 30000, 
  });

  return {
    wallet: data?.wallet,
    isLoading: loading,
    error,
    refetch,
  };
};