import Link from "next/link";
import { Home, ShoppingCart, ShoppingBag } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden">
      <div className="flex justify-around max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center justify-center p-3 text-gray-600 hover:text-pink-500">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center justify-center p-3 text-gray-600 hover:text-pink-500">
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs">Shop</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center justify-center p-3 text-gray-600 hover:text-pink-500">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs">Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;