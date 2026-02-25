import React from 'react';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

export const Checkout = ({ total, onComplete }) => {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <CreditCard className="text-blue-600" /> FINALIZAR PEDIDO
            </h2>

            <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><Truck size={18} /> Datos de Envío</h3>
                    <input type="text" placeholder="Nombre Completo" required className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500" />
                    <input type="email" placeholder="Correo Electrónico" required className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="Dirección en La Paz (Ej. Sopocachi)" required className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="bg-slate-900 p-8 rounded-3xl text-white space-y-6">
                    <h3 className="font-bold text-blue-400">Resumen de Pago</h3>
                    <div className="flex justify-between text-slate-400">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                        <span>Envío</span>
                        <span className="text-green-400 font-bold uppercase text-xs">Gratis</span>
                    </div>
                    <div className="h-px bg-slate-700 w-full" />
                    <div className="flex justify-between items-end">
                        <span className="font-bold">TOTAL</span>
                        <span className="text-3xl font-black">${total.toFixed(2)}</span>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black transition-all">
                        PAGAR AHORA
                    </button>
                </div>
            </form>
        </div>
    );
};