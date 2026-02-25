import { ShoppingBag, Cpu, Search, Menu } from 'lucide-react';

export const Navbar = ({ cartCount, setView, onCartOpen }) => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('inicio')}>
                    <div className="bg-blue-600 p-2 rounded-xl rotate-3 shadow-lg shadow-blue-500/30">
                        <Cpu className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">
                        Electro<span className="text-blue-600 text-2xl">.</span>Lab
                    </span>
                </div>

                <div className="hidden md:flex gap-8 font-bold text-slate-600 uppercase text-xs tracking-widest">
                    <button onClick={() => setView('inicio')} className="hover:text-blue-600 transition-colors">Inicio</button>
                    <button onClick={() => setView('catalogo')} className="hover:text-blue-600 transition-colors">Catálogo</button>
                    <button className="hover:text-blue-600 transition-colors">Nosotros</button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="md:hidden"><Menu /></div>
                    <button
                        onClick={onCartOpen} // Cambia esto
                        className="relative p-3 bg-slate-100 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group shadow-inner"
                    >
                        <ShoppingBag size={22} />
                        {/* ... indicador de cantidad ... */}
                    </button>
                </div>
            </div>
        </nav>
    );

};