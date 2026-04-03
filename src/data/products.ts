export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  description?: string;
  colors?: string[];
  sizes?: string[];
  features?: string[];
};

export const products: Product[] = [
  {
    id: "hoodie-1",
    name: "Neon Riot Core Hoodie",
    price: 89,
    category: "Outerwear",
    image: "/urban_hoodie.png",
    isNew: true,
    description:
      "Heavyweight 480gsm French terry with UV-reactive front print, reflective piping, and a hidden phone stash pocket.",
    colors: ["Ink Black", "Voltage Pink"],
    sizes: ["S", "M", "L", "XL"],
    features: ["UV-reactive print", "480gsm French terry", "Hidden stash pocket", "Reflective piping"],
  },
  {
    id: "cargo-1",
    name: "Cybernetic Tech Cargos",
    price: 115,
    category: "Bottoms",
    image: "/cyber_cargos.png",
    description:
      "4-way stretch nylon with taped seams, waterproof zips, and detachable strap set for stage or street.",
    colors: ["Shadow Grey", "Infrared"],
    sizes: ["S", "M", "L", "XL"],
    features: ["Waterproof zips", "Detachable straps", "4-way stretch", "Articulated knees"],
  },
  {
    id: "tee-1",
    name: "Oversized Midnight Tee",
    price: 45,
    category: "Tops",
    image: "/midnight_tee.png",
    description:
      "240gsm cotton jersey, drop shoulder fit, puff-print graphic, garment-dyed for depth and softness.",
    colors: ["Bone", "Onyx"],
    sizes: ["S", "M", "L", "XL"],
    features: ["240gsm cotton", "Puff-print graphic", "Garment dyed", "Drop shoulder"],
  },
  {
    id: "sneaker-1",
    name: "Neon Flash Sneakers",
    price: 180,
    category: "Footwear",
    image: "/neon_sneakers.png",
    isNew: true,
    description:
      "Reflective overlays, glow midsole window, reinforced heel clip; tuned for night runs and club floors.",
    colors: ["Black/Volt"],
    sizes: ["7", "8", "9", "10", "11"],
    features: ["Glow midsole", "Reflective overlays", "Reinforced heel clip", "Breathable mesh"],
  },
];
