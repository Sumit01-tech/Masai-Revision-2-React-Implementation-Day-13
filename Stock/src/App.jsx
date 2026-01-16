import { useEffect, useRef, useState } from "react";

const initialStocks = [
  { symbol: "AAPL", price: 178.5, name: "Apple Inc." },
  { symbol: "GOOGL", price: 142.3, name: "Alphabet Inc." },
  { symbol: "MSFT", price: 378.9, name: "Microsoft Corp." },
  { symbol: "AMZN", price: 145.2, name: "Amazon.com Inc." },
  { symbol: "TSLA", price: 242.8, name: "Tesla Inc." }
];

export default function App() {
  const [stocks, setStocks] = useState(initialStocks);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const change = +(Math.random() * 1 - 0.5).toFixed(2);
          const newPrice = +(stock.price + change).toFixed(2);

          return {
            ...stock,
            prevPrice: stock.price,
            price: newPrice
          };
        })
      );
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div style={{ padding: 20 }}>
      <h2>📈 Stock Price Ticker</h2>

      <button onClick={() => setIsRunning((prev) => !prev)}>
        {isRunning ? "Stop Updates" : "Start Updates"}
      </button>

      <ul>
        {stocks.map((stock) => {
          const diff = stock.prevPrice
            ? stock.price - stock.prevPrice
            : 0;

          const percent = stock.prevPrice
            ? ((diff / stock.prevPrice) * 100).toFixed(2)
            : "0.00";

          return (
            <li key={stock.symbol}>
              <strong>{stock.symbol}</strong> – ${stock.price}
              <span
                style={{
                  color: diff >= 0 ? "green" : "red",
                  marginLeft: 10
                }}
              >
                {diff >= 0 ? "+" : ""}
                {diff.toFixed(2)} ({percent}%)
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
