import { type FC } from 'react';
import { motion } from 'framer-motion';

interface MarqueeTickerProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

const MarqueeTicker: FC<MarqueeTickerProps> = ({ 
  text = "🔥 NEW DROPS OUT NOW 🔥 FREE SHIPPING ON ALL ORDERS ✨ LIMITED STOCK", 
  bgColor = "bg-neonYellow", 
  textColor = "text-black" 
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap py-3 flex items-center ${bgColor} relative`}>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" 
      />
      <div className="flex animate-marquee min-w-[200%] md:min-w-[150%]">
        <span className={`text-2xl md:text-3xl font-display font-black tracking-widest uppercase mx-4 ${textColor}`}>
          {text} • {text} • {text} • {text} • {text} •
        </span>
      </div>
    </div>
  );
};

export default MarqueeTicker;
