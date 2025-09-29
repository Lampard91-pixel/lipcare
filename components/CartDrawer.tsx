"use client";

import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/app/contexts/CartContext";

// Mock data for suggested products and initial cart items
const suggestedProducts = [
  { id: 'prod1', name: 'Vanilla Kiss Lip Balm', price: 1500, image: '/fir1.jpeg' },
  { id: 'prod2', name: 'Cherry Pop Lip Gloss', price: 2200, image: '/fir2.jpeg' },
  { id: 'prod3', name: 'Sugar Kiss Lip Scrub', price: 1800, image: '/fir3.jpeg' },
];

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, addItem, updateQuantity, removeItem, clearCart, subtotal } = useCart();

  const addSuggestedItem = (productToAdd: typeof suggestedProducts[0]) => {
    addItem(productToAdd);
  };

  const handleQuantityChange = (id: string, delta: number) => {
    updateQuantity(id, delta);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 right-0 w-full max-w-sm h-full bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-cyan-900">Your Cart</h3>
              <div className="flex items-center">
                {items.length > 0 && (
                  <button onClick={clearCart} className="text-sm text-gray-500 hover:text-red-500 transition-colors mr-4 font-medium">
                    Clear Cart
                  </button>
                )}
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            {items.length === 0 ? (
              // Empty State
              <div className="p-6 text-center flex-grow flex flex-col">
                <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" strokeWidth={1} />
                <h4 className="mt-4 text-lg font-medium text-gray-800">Your cart is empty</h4>
                <p className="mt-1 text-sm text-gray-500">Discover our best sellers!</p>
                <div className="mt-6 space-y-4">
                  {suggestedProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-4 text-left p-2 border rounded-lg">
                      <Image src={product.image} alt={product.name} width={64} height={64} className="rounded-md object-cover" />
                      <div>
                        <p className="font-medium text-sm text-gray-800">{product.name}</p>
                        <p className="text-gray-600">₦{product.price.toLocaleString()}</p>
                      </div>
                      <button onClick={() => addSuggestedItem(product)} className="ml-auto p-2 bg-cyan-50 rounded-full hover:bg-cyan-100">
                        <Plus size={16} className="text-cyan-900" />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={onClose} className="mt-auto w-full py-3 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition font-medium">
                  Continue Shopping
                </button>
              </div>
            ) : (
              // Cart with Items State
              <div className="flex-grow overflow-y-auto p-6">
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-start gap-4">
                      <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">₦{item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => handleQuantityChange(item.id, -1)} className="p-1 border rounded-full"><Minus size={14} /></button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, 1)} className="p-1 border rounded-full"><Plus size={14} /></button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                        <button onClick={() => removeItem(item.id)} className="mt-2 text-gray-400 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center font-semibold">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Shipping & taxes calculated at checkout.</p>
                <button className="mt-4 w-full py-3 bg-cyan-900 text-white rounded-lg hover:bg-cyan-800 transition font-medium">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}