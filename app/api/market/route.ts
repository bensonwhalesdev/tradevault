import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const FINNHUB = "https://finnhub.io/api/v1";
const FINNHUB_KEY = process.env.NEXT_PUBLIC_FINNHUB_KEY;

// Fallback mock data for when API is unavailable
const MOCK_STOCKS = [
  { symbol: "AAPL", name: "AAPL", price: 231.45, change: 2.34 },
  { symbol: "TSLA", name: "TSLA", price: 341.28, change: -1.56 },
  { symbol: "NVDA", name: "NVDA", price: 890.12, change: 4.23 },
];

const MOCK_FOREX = [
  { symbol: "EUR/USD", name: "Forex", price: 1.0832, change: 0.45 },
  { symbol: "GBP/USD", name: "Forex", price: 1.2654, change: 0.32 },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");

    let data: any = {};

    // Fetch stocks
    if (!type || type === "all" || type === "stocks") {
      try {
        if (!FINNHUB_KEY) {
          console.warn("FINNHUB_KEY not configured, using mock data");
          data.stocks = MOCK_STOCKS;
        } else {
          const stockSymbols = ["AAPL", "TSLA", "NVDA"];
          const stockPromises = stockSymbols.map(async (symbol) => {
            try {
              const { data: quoteData } = await axios.get(`${FINNHUB}/quote`, {
                params: { symbol, token: FINNHUB_KEY },
                timeout: 5000,
              });

              return {
                symbol,
                name: symbol,
                price: quoteData.c,
                change: ((quoteData.c - quoteData.pc) / quoteData.pc) * 100,
              };
            } catch (err: any) {
              console.error(
                `Failed to fetch stock ${symbol}:`,
                err.response?.status,
                err.message
              );
              return null;
            }
          });

          const stocks = (await Promise.all(stockPromises)).filter(Boolean);
          data.stocks = stocks.length > 0 ? stocks : MOCK_STOCKS;
        }
      } catch (err) {
        console.error("Error fetching stocks:", err);
        data.stocks = MOCK_STOCKS;
      }
    }

    // Fetch forex
    if (!type || type === "all" || type === "forex") {
      try {
        if (!FINNHUB_KEY) {
          console.warn("FINNHUB_KEY not configured, using mock data");
          data.forex = MOCK_FOREX;
        } else {
          const forexPairs = [
            { symbol: "OANDA:EUR_USD", label: "EUR/USD" },
            { symbol: "OANDA:GBP_USD", label: "GBP/USD" },
          ];

          const forexPromises = forexPairs.map(async (pair) => {
            try {
              const { data: quoteData } = await axios.get(`${FINNHUB}/quote`, {
                params: { symbol: pair.symbol, token: FINNHUB_KEY },
                timeout: 5000,
              });

              return {
                symbol: pair.label,
                name: "Forex",
                price: quoteData.c,
                change: ((quoteData.c - quoteData.pc) / quoteData.pc) * 100,
              };
            } catch (err: any) {
              console.error(
                `Failed to fetch forex ${pair.symbol}:`,
                err.response?.status,
                err.message
              );
              return null;
            }
          });

          const forex = (await Promise.all(forexPromises)).filter(Boolean);
          data.forex = forex.length > 0 ? forex : MOCK_FOREX;
        }
      } catch (err) {
        console.error("Error fetching forex:", err);
        data.forex = MOCK_FOREX;
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Market data fetch error:", error);
    // Return fallback data instead of error
    return NextResponse.json({
      stocks: MOCK_STOCKS,
      forex: MOCK_FOREX,
    });
  }
}
