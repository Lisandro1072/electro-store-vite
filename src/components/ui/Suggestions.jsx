import React from 'react';
import { Sparkles, Plus } from 'lucide-react';
import { products } from '../../data/products';
import { compatibilityMap } from '../../data/recommendations';

export const Suggestions = ({ cart, onAdd }) => {
    // 1. Obtener IDs de productos en el carrito
    const cartIds = cart.map(item => item.id);

    // 2. Encontrar IDs sugeridos basados en lo que hay en el carrito
    const suggestedIds = [...new Set(
        cartIds.flatMap(id => compatibilityMap[id] || [])
    )].filter(id => !cartIds.includes(id)); // No sugerir lo que ya está en el carrito

    const suggestedProducts = products.filter(p => suggestedIds.includes(p.id));

    if (suggestedProducts.length === 0) return null;

    return (
        <div className="mt-12 bg-blue-50/50 border border-blue-100 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-6 text-blue-700">
                <Sparkles size={20} className="animate-pulse" />
                <h3 className="font-black uppercase tracking-tighter italic">Sugeridos para tu Proyecto</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {suggestedProducts.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-transparent hover:border-blue-300 transition-all">
                        <div className="flex items-center gap-3">
                            <img src={product.image} className="w-10 h-10 object-contain" alt={product.name} />
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-800 uppercase leading-tight">{product.name}</h4>
                                <p className="text-blue-600 font-black text-xs">${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onAdd(product)}
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-transform active:scale-90"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};