import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, cartTotal, clearCart } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
                    <div className="p-6 border-b flex items-center justify-between bg-slate-900 text-white">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="text-blue-400" />
                            <h2 className="text-xl font-black italic tracking-tighter">TU CARRITO</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="text-center py-20">
                                <ShoppingBag size={64} className="mx-auto text-slate-200 mb-4" />
                                <p className="text-slate-500 font-bold text-lg">Tu carrito está vacío</p>
                                <button onClick={onClose} className="text-blue-600 font-bold mt-2">Empezar a comprar</button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 items-center">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-white rounded-lg p-1 border" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                                        <p className="text-blue-600 font-black">${item.price.toFixed(2)} x {item.quantity}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-6 border-t bg-slate-50 space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-slate-500 font-bold uppercase text-xs">Total a pagar</span>
                                <span className="text-3xl font-black text-slate-900">${cartTotal.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-blue-200">
                                FINALIZAR COMPRA
                            </button>
                            <button onClick={clearCart} className="w-full text-slate-400 text-xs font-bold uppercase hover:text-red-500 transition-colors">
                                Vaciar Carrito
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};