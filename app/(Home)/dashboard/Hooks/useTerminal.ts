import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_TERMINAL_DATA = gql`
  query GetTerminalData {
    wallet {
      fiatBalance
      frozenBalance
      currency
    }
    portfolio {
      assetSymbol
      quantity
      avgCost
    }
    openOrders {
      id
      assetSymbol
      side
      quantity
      price
      status
    }
  }
`;

const PLACE_ORDER = gql`
  mutation PlaceOrder($assetSymbol: String!, $side: String!, $type: String!, $quantity: Float!, $price: Float) {
    placeOrder(assetSymbol: $assetSymbol, side: $side, type: $type, quantity: $quantity, price: $price) {
      id
      status
    }
  }
`;

export const useTradingTerminal = () => {
  const { data, loading, refetch } = useQuery(GET_TERMINAL_DATA, {
    pollInterval: 3000,
  });

  const [placeOrderMutation] = useMutation(PLACE_ORDER, {
    onCompleted: () => refetch(),
  });

  const handlePlaceOrder = async (vars: any) => {
    try {
      await placeOrderMutation({ variables: vars });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return {
    data,
    loading,
    handlePlaceOrder,
  };
};