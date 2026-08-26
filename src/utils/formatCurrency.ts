import { RESTAURANT_INFO } from '../config/restaurant';

export function formatCurrency(amount: number): string {
  return `${RESTAURANT_INFO.currencySymbol}${Math.round(amount).toLocaleString('en-IN')}`;
}
