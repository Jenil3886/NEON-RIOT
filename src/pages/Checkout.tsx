import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Sparkles,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import MagneticButton from "../components/MagneticButton";
import { useCart } from "../context/CartContext";

const shippingOptions = [
  { id: "standard", label: "Street Standard (3-5 days)", price: 0 },
  { id: "express", label: "Night Ops Express (1-2 days)", price: 12 },
];

const Checkout = () => {
  const { items, subtotal } = useCart();
  const [shipping, setShipping] = useState(shippingOptions[0]);
  const navigate = useNavigate();

  const total = subtotal + shipping.price;

  return (
    <div className="w-full relative">
      <div className="noise-overlay" aria-hidden />
      <section className="relative min-h-[80vh] py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-background to-ink" />
        <div className="absolute -left-20 top-0 w-80 h-80 bg-neonPink/20 blur-[140px]" />
        <div className="absolute right-0 bottom-[-80px] w-96 h-96 bg-neonCyan/20 blur-[180px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex items-center gap-3 text-white/70">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:text-neonCyan"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <span className="text-white/30">/</span>
            <p className="font-display uppercase tracking-[0.3em] text-xs text-neonYellow">
              Checkout
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.3fr,0.9fr] gap-8">
            {/* Form side */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
                <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-[0.3em]">
                  <Sparkles size={16} className="text-neonPink" /> Contact
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="First name"
                  />
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="Last name"
                  />
                  <input
                    className="w-full sm:col-span-2 rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="Email for updates"
                  />
                  <input
                    className="w-full sm:col-span-2 rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="Phone (optional)"
                  />
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
                <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-[0.3em]">
                  <Truck size={16} className="text-neonCyan" /> Shipping
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="Address line 1"
                  />
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="Address line 2"
                  />
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="City"
                  />
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="State"
                  />
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="Zip / Postal"
                  />
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="Country"
                  />
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
                <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-[0.3em]">
                  <CreditCard size={16} className="text-neonYellow" /> Delivery
                  Speed
                </div>
                <div className="flex flex-col gap-3">
                  {shippingOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 cursor-pointer transition-all ${
                        shipping.id === opt.id
                          ? "border-neonYellow bg-white/5"
                          : "border-white/10 bg-white/0 hover:border-white/40"
                      }`}
                    >
                      <div className="flex items-center gap-3 text-white">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shipping.id === opt.id}
                          onChange={() => setShipping(opt)}
                          className="accent-neonYellow"
                        />
                        <span className="font-display">{opt.label}</span>
                      </div>
                      <span className="font-display text-neonYellow">
                        {opt.price === 0 ? "Free" : `$${opt.price}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
                <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-[0.3em]">
                  <ShieldCheck size={16} className="text-neonPink" /> Payment
                  (placeholder)
                </div>
                <p className="text-white/60 text-sm">
                  Hook your payment gateway here (Stripe/PayPal/Razorpay). For
                  now, this is a mock step to show the flow.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="Card number"
                  />
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="MM/YY"
                  />
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="CVC"
                  />
                  <input
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-white placeholder:text-white/40"
                    placeholder="Name on card"
                  />
                </div>
              </div>
            </div>

            {/* Summary side */}
            <div className="space-y-4 sticky top-20 self-start">
              <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
                <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-[0.3em]">
                  <ShoppingBag size={16} className="text-neonCyan" /> Order
                  Summary
                </div>
                <div className="space-y-3 max-h-72 overflow-auto pr-1">
                  {items.length === 0 && (
                    <p className="text-white/50 text-sm">Your bag is empty.</p>
                  )}
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size ?? "default"}`}
                      className="flex justify-between items-start gap-3 border-b border-white/5 pb-2"
                    >
                      <div>
                        <p className="font-display text-white">
                          {item.product.name}
                        </p>
                        <p className="text-white/50 text-xs uppercase tracking-[0.3em]">
                          {item.size
                            ? `Size ${item.size}`
                            : item.product.category}
                        </p>
                        <p className="text-white/60 text-xs">Qty {item.qty}</p>
                      </div>
                      <p className="font-display text-neonYellow">
                        ${(item.product.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-white/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-display text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{shipping.label}</span>
                    <span className="font-display text-white">
                      {shipping.price === 0
                        ? "Free"
                        : `$${shipping.price.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="text-white/70">Total</span>
                  <span className="font-display text-2xl text-neonYellow">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <MagneticButton className="w-full justify-center px-6 py-3 text-sm text-white bg-white/10">
                  Place order
                </MagneticButton>
                <p className="text-white/50 text-xs text-center">
                  By placing the order you agree to our terms. Payment step is a
                  placeholder; connect your gateway to go live.
                </p>
              </div>
              <div className="text-white/50 text-xs text-center">
                Secured by encrypted checkout. Worldwide shipping.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
