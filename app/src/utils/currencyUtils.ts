
export const formatCurrency = (amount: number, currency: string): string => {
  const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
  };

  const symbol = currencySymbols[currency] || '$';
  return `${symbol}${amount.toLocaleString()}`;
};

export const getCurrencySymbol = (currency: string): string => {
  const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
  };
  return currencySymbols[currency] || '$';
};
