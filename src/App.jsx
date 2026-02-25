import React, { useState, useMemo } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ProductCard } from './components/ui/ProductCard';
import { CartDrawer } from './components/cart/CartDrawer';
import { Checkout } from './pages/Checkout';
import { Chatbot } from './components/ui/Chatbot';
import { Suggestions } from './components/ui/Suggestions'; // Motor de IA
import { products } from './data/products';
import { useCart } from './context/CartContext';
import { Cpu, Rocket, Zap, ShieldCheck, Users, Search } from 'lucide-react';

function App() {
  const { cart, addToCart, cartTotal, clearCart } = useCart();
  const [view, setView] = useState('inicio');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estados para la Inteligencia del Sitio
  const [category, setCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica de Filtros y Búsqueda (Optimización para Auditoría de Rendimiento)
  const categories = useMemo(() => ['Todos', ...new Set(products.map(p => p.category))], []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = category === 'Todos' || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, searchTerm]);

  const handlePurchaseComplete = () => {
    alert("¡Compra exitosa! Pedido procesado para entrega en La Paz.");
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
                  Hardware de precisión y componentes electrónicos certificados. Diseñado para la comunidad de ingeniería en Bolivia.
                </p>
                <button
                  onClick={() => setView('catalogo')}
                  className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                >
                  EXPLORAR INVENTARIO
                </button>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            </header>

            <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <Zap className="text-blue-500 mb-4" />
                <h3 className="font-bold mb-2 uppercase tracking-tighter italic">Logística Local</h3>
                <p className="text-slate-500 text-sm">Entregas inmediatas en toda la ciudad de La Paz.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <ShieldCheck className="text-blue-500 mb-4" />
                <h3 className="font-bold mb-2 uppercase tracking-tighter italic">Calidad Técnica</h3>
                <p className="text-slate-500 text-sm">Componentes testeados para proyectos de grado y tesis.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <Users className="text-blue-500 mb-4" />
                <h3 className="font-bold mb-2 uppercase tracking-tighter italic">Alianza EMI</h3>
                <p className="text-slate-500 text-sm">Soporte directo para estudiantes de Ingeniería de Sistemas.</p>
              </div>
            </section>
          </>
        )}

        {/* VISTA: CATÁLOGO INTELIGENTE */}
        {view === 'catalogo' && (
          <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <div className="mb-12 space-y-8">
              <div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter">SISTEMA DE <span className="text-blue-600 underline text-6xl">COMPRAS</span></h2>
                <p className="text-slate-400 mt-2 font-medium">Búsqueda y recomendaciones impulsadas por lógica de asociación.</p>
              </div>

              {/* BARRA DE BÚSQUEDA Y FILTROS */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar sensores, placas, herramientas..."
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none shadow-sm transition-all font-medium"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${category === cat
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                          : 'bg-white text-slate-400 border border-slate-200 hover:border-blue-400 hover:text-blue-600'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* MOTOR DE RECOMENDACIONES (INTELIGENCIA ARTIFICIAL) */}
            <Suggestions cart={cart} onAdd={addToCart} />

            {/* GRID DE RESULTADOS */}
            <div className="mt-12">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} onAdd={addToCart} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                  <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Sin coincidencias técnicas</h3>
                  <p className="text-slate-400 max-w-xs mx-auto mt-2">Prueba ajustando los filtros o buscando términos más generales.</p>
                </div>
              )}
            </div>
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

      <footer className="bg-white border-t border-slate-200 py-16 px-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2 text-slate-900 font-black tracking-tighter italic text-2xl">
              <Cpu size={28} className="text-blue-600" />
              <span>ELECTRO<span className="text-blue-600">.</span>LAB</span>
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] text-center md:text-left">
              Ingeniería de Sistemas • Auditoría de Software • 2026
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Servidor La Paz / Bolivia</span>
            </div>
            <p className="text-slate-300 text-[10px] font-medium uppercase tracking-widest">© Lisandro - Escuela Militar de Ingeniería</p>
          </div>
        </div>
      </footer>

      {/* COMPONENTE DE IA FLOTANTE */}
      <Chatbot />
    </div>
  );
}

export default App;