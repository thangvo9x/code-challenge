import { useMemo } from "react";
import { usePrices } from "./hooks/usePrices";

interface WalletBalance {
  currency: string;
  blockchain: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type Props = React.HTMLAttributes<HTMLDivElement>;

// Temporary hard-coded balances for the wallet page
const useWalletBalances = (): WalletBalance[] => {
  return [
    { currency: "ETH", blockchain: "Ethereum", amount: 1.5 },
    { currency: "OSMO", blockchain: "Osmosis", amount: 120 },
    { currency: "ARB", blockchain: "Arbitrum", amount: 50 },
    { currency: "ZIL", blockchain: "Zilliqa", amount: 0 },
  ];
};

export const WalletPage = (props: Props) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const { prices } = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        if (leftPriority === rightPriority) return 0;
        return leftPriority > rightPriority ? -1 : 1;
      });
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    })
  );

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const priceEntry: any = (prices as any[]).find(
        (p: any) => p.currency === balance.currency
      );
      const usdValue =
        priceEntry && typeof priceEntry.price === "number"
          ? priceEntry.price * balance.amount
          : 0;

      return (
        <div key={index} className="wallet-row">
          <span>{balance.currency}</span>
          <span>{balance.formatted}</span>
          <span>${usdValue.toFixed(2)}</span>
        </div>
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};