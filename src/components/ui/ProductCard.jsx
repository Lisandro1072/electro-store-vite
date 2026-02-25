import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

export const ProductCard = ({ product, onAdd }) => {
    return (
        <div className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="relative h-52 bg-slate-50 flex items-center justify-center p-8">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-slate-500 border border-slate-100">
                    ID: {product.id}
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Garantía de Sistemas</span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-800 leading-tight mb-1">
                    {product.name}
                </h3>
                <p className="text-slate-400 text-xs mb-4">Stock: {product.stock} unidades</p>

                <div className="flex items-center justify-between mt-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Precio</span>
                        <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={() => onAdd(product)}
                        className="bg-slate-900 hover:bg-blue-600 text-white p-4 rounded-2xl transition-all duration-300 shadow-lg active:scale-90"
                    >
                        <Zap size={20} fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
};