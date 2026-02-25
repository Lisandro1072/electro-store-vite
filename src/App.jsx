import React, { useState, useMemo } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ProductCard } from './components/ui/ProductCard';
import { CartDrawer } from './components/cart/CartDrawer';
import { Checkout } from './pages/Checkout';
import { Chatbot } from './components/ui/Chatbot';
import { products } from './data/products';
import { useCart } from './context/CartContext';
import { Cpu, Zap, ShieldCheck, Rocket, Users, Search, Filter } from 'lucide-react';

function App() {
  const { cart, addToCart, cartTotal, clearCart } = useCart();
  const [view, setView] = useState('inicio');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estados para el Buscador Inteligente
  const [category, setCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica de Filtros y Búsqueda combinada (Optimizado con useMemo)
  const categories = useMemo(() => ['Todos', ...new Set(products.map(p => p.category))], []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = category === 'Todos' || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, searchTerm]);

  const handlePurchaseComplete = () => {
    alert("¡Compra exitosa! Procesando envío para La Paz, Bolivia.");
    clearCart();
    setView('inicio');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-600">
      <Navbar
        cartCount={cart.length}
        setView={setView}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => { setIsCartOpen(false); setView('checkout'); }}
      />

      <main className="flex-grow">
        {/* VISTA: INICIO */}
        {view === 'inicio' && (
          <>
            <header className="pt-40 pb-24 px-6 bg-slate-900 text-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1 rounded-full text-blue-400 text-xs font-bold mb-6">
                  <Rocket size={14} className="animate-bounce" /> TECNOLOGÍA DE GRADO INGENIERÍA
                </div>
                <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
                  ELECTRO<span className="text-blue-600 italic">.</span>LAB
                </h1>
                <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  Componentes electrónicos de alta precisión para proyectos académicos y profesionales.
                </p>
                <button
                  onClick={() => setView('catalogo')}
                  className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                >
                  EXPLORAR CATÁLOGO
                </button>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            </header>

            <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"><Zap className="text-blue-500 mb-4" /><h3 className="font-bold mb-2">Envío Rápido</h3><p className="text-slate-500 text-sm">Logística optimizada para La Paz.</p></div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"><ShieldCheck className="text-blue-500 mb-4" /><h3 className="font-bold mb-2">Garantía Real</h3><p className="text-slate-500 text-sm">Soporte técnico especializado.</p></div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"><Users className="text-blue-500 mb-4" /><h3 className="font-bold mb-2">Comunidad EMI</h3><p className="text-slate-500 text-sm">Descuentos especiales para estudiantes.</p></div>
            </section>
          </>
        )}

        {/* VISTA: CATÁLOGO CON BUSCADOR INTELIGENTE */}
        {view === 'catalogo' && (
          <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <div className="mb-12 space-y-8">
              <div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter">INVENTARIO <span className="text-blue-600 underline">PRO</span></h2>
                <p className="text-slate-400 mt-2">Encuentra exactamente lo que necesitas para tu hardware.</p>
              </div>

              {/* BARRA DE BÚSQUEDA INTELIGENTE */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o descripción..."
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-6 py-2 rounded-xl font-bold text-xs uppercase whitespace-nowrap transition-all ${category === cat
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                          : 'bg-white text-slate-400 border border-slate-200 hover:border-blue-400'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resultados de Búsqueda */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <Search size={48} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-xl font-bold text-slate-800">No encontramos resultados</h3>
                <p className="text-slate-400">Prueba con términos más generales como "Arduino" o "Sensor".</p>
              </div>
            )}
          </section>
        )}

        {/* VISTA: CHECKOUT */}
        {view === 'checkout' && (
          <section className="pt-32 pb-20 px-6">
            <Checkout
              total={cartTotal}
              onComplete={handlePurchaseComplete}
            />
          </section>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-900 font-black tracking-tighter italic">
            <Cpu size={20} className="text-blue-600" />
            <span>ELECTRO.LAB</span>
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest text-center">
            © 2026 Lisandro • Ingeniería de Sistemas • La Paz, Bolivia
          </p>
          <div className="flex gap-4">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Servidor Activo</span>
          </div>
        </div>
      </footer>

      {/* CHATBOT INTELIGENTE FLOTANTE */}
      <Chatbot />
    </div>
  );
}

export default App;