import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { categories } from "../utils/data.tsx";

const Shop = () => {
  const [filter, setFilter] = useState("All");

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="w-full pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase mb-4">
            <span className="text-neonPink">THE</span> CATALOG
          </h1>
          <p className="text-white/60 font-sans max-w-lg">
            Browse our entire collection of high-end streetwear. Built for the
            underground, styled for the spotlight.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 font-display font-bold text-sm tracking-wider uppercase transition-all
                ${
                  filter === cat
                    ? "bg-neonYellow text-black scale-105"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              key={product.id}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="font-display text-2xl text-white/50 uppercase">
              No products found in this category.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Shop;
