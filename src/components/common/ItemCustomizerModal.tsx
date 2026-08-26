import { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Leaf, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PortionOption, AddOnOption } from '../../types/menu';
import { formatCurrency } from '../../utils/formatCurrency';

const DEFAULT_PORTIONS: PortionOption[] = [
  { id: 'reg', name: 'Regular Portion', priceModifier: 0 },
  { id: 'lrg', name: 'Sharing / Large Bowl', priceModifier: 70 },
];

const DEFAULT_ADDONS: AddOnOption[] = [
  { id: 'a1', name: 'Extra Raw Coconut Dip', price: 35 },
  { id: 'a2', name: 'Organic Sprouted Gram (+20g Protein)', price: 45 },
  { id: 'a3', name: 'Pomegranate & Microgreen Crunch', price: 30 },
  { id: 'a4', name: 'Cold-Pressed Ginger & Lemongrass Drizzle', price: 25 },
];

export function ItemCustomizerModal() {
  const { customizingItem, closeCustomizer, addCustomizedItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedPortion, setSelectedPortion] = useState<PortionOption>(DEFAULT_PORTIONS[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    if (customizingItem) {
      setQuantity(1);
      const portions = customizingItem.portions && customizingItem.portions.length > 0
        ? customizingItem.portions
        : DEFAULT_PORTIONS;
      setSelectedPortion(portions[0]);
      setSelectedAddOns([]);
      setSpecialInstructions('');
    }
  }, [customizingItem]);

  if (!customizingItem) return null;

  const portions = customizingItem.portions && customizingItem.portions.length > 0
    ? customizingItem.portions
    : DEFAULT_PORTIONS;
  
  const addOns = customizingItem.availableAddOns && customizingItem.availableAddOns.length > 0
    ? customizingItem.availableAddOns
    : DEFAULT_ADDONS;

  const basePrice = customizingItem.price;
  const portionPrice = selectedPortion.priceModifier;
  const addOnsPrice = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + portionPrice + addOnsPrice;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (addon: AddOnOption) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleAddToCart = () => {
    addCustomizedItem(customizingItem, quantity, {
      portion: selectedPortion,
      selectedAddOns,
      specialInstructions,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-padayal-text/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-padayal-surface rounded-t-3xl sm:rounded-3xl shadow-organic-lg overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image & Close */}
        <div className="relative h-48 sm:h-56 bg-padayal-bg overflow-hidden shrink-0">
          <img
            src={customizingItem.imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'}
            alt={customizingItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-padayal-text/80 via-padayal-text/20 to-transparent" />
          
          <button
            type="button"
            onClick={closeCustomizer}
            className="absolute top-4 right-4 p-2 rounded-full bg-padayal-surface/80 text-padayal-text hover:bg-padayal-surface transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-padayal-surface">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-padayal-primary text-padayal-surface text-xs font-semibold">
                🌿 No Oil • Fire-Free
              </span>
              {customizingItem.calories && (
                <span className="text-xs text-padayal-bg/90 font-medium">
                  {customizingItem.calories} cal
                </span>
              )}
            </div>
            <h2 className="font-pranic text-2xl font-bold tracking-tight text-white">
              {customizingItem.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Options Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          <p className="text-sm text-padayal-muted leading-relaxed">
            {customizingItem.description}
          </p>

          {/* Portion Selection */}
          <div>
            <h4 className="font-display font-bold text-sm text-padayal-text uppercase tracking-wider mb-3">
              1. Choose Portion Size
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {portions.map((portion) => {
                const isSelected = selectedPortion.id === portion.id;
                return (
                  <button
                    key={portion.id}
                    type="button"
                    onClick={() => setSelectedPortion(portion)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-padayal-primary bg-padayal-secondary-light/60 ring-2 ring-padayal-primary/20 text-padayal-primary font-bold'
                        : 'border-padayal-bg hover:border-padayal-secondary/40 text-padayal-text'
                    }`}
                  >
                    <div>
                      <span className="block text-sm font-semibold">{portion.name}</span>
                      {portion.priceModifier > 0 && (
                        <span className="text-xs text-padayal-muted font-normal">
                          +{formatCurrency(portion.priceModifier)}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-padayal-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons Selection */}
          <div>
            <h4 className="font-display font-bold text-sm text-padayal-text uppercase tracking-wider mb-3">
              2. Optional Fresh Add-ons
            </h4>
            <div className="space-y-2.5">
              {addOns.map((addon) => {
                const isChecked = selectedAddOns.some((a) => a.id === addon.id);
                return (
                  <label
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'border-padayal-cta bg-padayal-cta/5 text-padayal-text'
                        : 'border-padayal-bg hover:border-padayal-secondary/30 text-padayal-muted'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-padayal-cta border-padayal-cta text-white' : 'border-padayal-muted/40'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-medium text-padayal-text">{addon.name}</span>
                    </div>
                    <span className="text-xs font-bold text-padayal-cta">
                      +{formatCurrency(addon.price)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Special Chef Instructions */}
          <div>
            <h4 className="font-display font-bold text-sm text-padayal-text uppercase tracking-wider mb-2">
              3. Chef Notes / Allergies
            </h4>
            <input
              type="text"
              placeholder="e.g., Less salt, extra lemon slice on the side"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-padayal-bg bg-padayal-bg/50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-padayal-primary"
            />
          </div>
        </div>

        {/* Footer Bar with Quantity & Add Button */}
        <div className="p-4 border-t border-padayal-bg bg-padayal-surface flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-padayal-bg rounded-xl p-1.5 border border-padayal-secondary/20">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-padayal-text hover:bg-padayal-secondary-light active:scale-95 transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-base text-padayal-text min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-padayal-text hover:bg-padayal-secondary-light active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 inline-flex items-center justify-between px-5 py-3.5 rounded-xl bg-padayal-cta text-padayal-surface font-bold text-sm hover:bg-padayal-cta-hover active:bg-padayal-cta-active active:scale-[0.98] transition-all shadow-md"
          >
            <span>Add to Cart</span>
            <span className="font-extrabold">{formatCurrency(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
