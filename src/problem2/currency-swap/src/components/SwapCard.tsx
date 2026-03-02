// components/SwapCard.tsx
import { useState, useMemo } from "react";
import { usePrices } from "../hooks/usePrices";
import { getTokenIcon } from "../utils";
import Skeleton from "./Skeleton";
import { useDebounce } from "../hooks/useDebounce";

export default function SwapCard() {
    const { prices, loading, error } = usePrices();

    const [fromToken, setFromToken] = useState("ETH");
    const [toToken, setToToken] = useState("USDC");
    const [amount, setAmount] = useState("");
    const debouncedAmount = useDebounce(amount, 400);

    const rate = useMemo(() => {
        const from = prices.find(p => p.currency === fromToken);
        const to = prices.find(p => p.currency === toToken);
        if (!from || !to) return 0;
        return from.price / to.price;
    }, [fromToken, toToken, prices]);

    const output = useMemo(() => {
        if (!debouncedAmount || !rate) return "";
        return (parseFloat(debouncedAmount) * rate).toFixed(6);
      }, [debouncedAmount, rate]);

    const isInvalid =
        !amount || parseFloat(amount) <= 0 || fromToken === toToken;

    if (loading) return <Skeleton />;
    if (error) return <div className="text-red-500">{error}</div>;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Currency Swap</h2>

            <div className="mb-4">
                <label className="text-sm text-gray-500">From</label>
                <div className="flex items-center border rounded-xl p-2">
                    <img src={getTokenIcon(fromToken)} className="w-6 mr-2" />
                    <select
                        value={fromToken}
                        onChange={e => setFromToken(e.target.value)}
                        className="flex-1 outline-none"
                    >
                        {prices.map(p => (
                            <option key={p.currency}>{p.currency}</option>
                        ))}
                    </select>
                </div>
            </div>

            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full border rounded-xl p-2 mb-4"
            />

            <button
                onClick={() => {
                    const tmp = fromToken;
                    setFromToken(toToken);
                    setToToken(tmp);
                }}
                className="w-full py-2 mb-4 bg-gray-100 rounded-xl"
            >
                ⇅ Swap
            </button>

            <div className="mb-4">
                <label className="text-sm text-gray-500">To</label>
                <div className="flex items-center border rounded-xl p-2">
                    <img src={getTokenIcon(toToken)} className="w-6 mr-2" />
                    <select
                        value={toToken}
                        onChange={e => setToToken(e.target.value)}
                        className="flex-1 outline-none"
                    >
                        {prices.map(p => (
                            <option key={p.currency}>{p.currency}</option>
                        ))}
                    </select>
                </div>
            </div>

            {amount !== debouncedAmount && (
                <p className="text-sm text-gray-400">Calculating...</p>
            )}
            <div className="text-lg font-medium mb-4">
                You receive: {output || "0.00"}
            </div>

            <button
                disabled={isInvalid}
                className={`w-full py-3 rounded-xl text-white ${isInvalid ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                Swap
            </button>

            {fromToken === toToken && (
                <p className="text-red-500 text-sm mt-2">
                    Cannot swap same token
                </p>
            )}
        </div>
    );
}