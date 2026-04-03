import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="font-display font-black text-5xl tracking-tighter text-white">
            <span className="text-neonPink">NEON</span> <span className="text-neonCyan">RIOT</span>
          </Link>
          <p className="mt-4 text-white/50 max-w-sm font-sans">
            Defining the new generation of streetwear. Born in the chaos, styled for the future. Stay bold.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-bold uppercase text-neonYellow mb-4">Shop</h4>
          <ul className="space-y-3 font-sans text-white/70">
            <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link to="/collections" className="hover:text-white transition-colors">Collections</Link></li>
            <li><Link to="/lookbook" className="hover:text-white transition-colors">Lookbook</Link></li>
            <li><Link to="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="font-display font-bold uppercase text-neonPurple mb-4">Support</h4>
          <ul className="space-y-3 font-sans text-white/70">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Shipping</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Returns</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
        <p className="text-white/30 text-sm font-sans">© 2026 Neon Riot. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="font-display font-bold text-white/50 hover:text-neonPink transition-colors uppercase">Insta</a>
          <a href="#" className="font-display font-bold text-white/50 hover:text-neonCyan transition-colors uppercase">TikTok</a>
          <a href="#" className="font-display font-bold text-white/50 hover:text-neonYellow transition-colors uppercase">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
