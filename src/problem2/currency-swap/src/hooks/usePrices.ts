// hooks/usePrices.ts
import { useEffect, useState } from "react";
import { API_PRICE_URL } from "../types";

export function usePrices() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_PRICE_URL)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((t: any) => t.price);
        setPrices(filtered);
      })
      .catch(() => {
        setError("Failed to load prices");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { prices, loading, error };
}