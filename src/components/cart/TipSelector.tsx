import { useCart } from '../../context/CartContext';

const TIP_OPTIONS = [
  { label: '0%', value: 0 },
  { label: '10%', value: 10 },
  { label: '15%', value: 15 },
  { label: '20%', value: 20 },
];

export function TipSelector() {
  const { tipPercentage, setTipPercentage } = useCart();

  return (
    <div>
      <label className="block text-xs font-semibold text-padayal-muted uppercase tracking-wider mb-2">
        Add Chef & Staff Tip
      </label>
      <div className="grid grid-cols-4 gap-2">
        {TIP_OPTIONS.map((tip) => {
          const isSelected = tipPercentage === tip.value;
          return (
            <button
              key={tip.value}
              type="button"
              onClick={() => setTipPercentage(tip.value)}
              className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-padayal-primary text-padayal-surface border-padayal-primary shadow-sm'
                  : 'bg-padayal-bg text-padayal-text border-padayal-bg hover:border-padayal-secondary/40'
              }`}
            >
              {tip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
