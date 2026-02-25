import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Cpu, Sparkles, BrainCircuit } from 'lucide-react';

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: '¡Hola! Soy ElectroAI, tu asistente técnico. ¿En qué proyecto estás trabajando hoy?' }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    // Auto-scroll al último mensaje
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulación de procesamiento de IA (Aquí conectarás tu RAG en el futuro)
        setTimeout(() => {
            let botResponse = "";
            const query = input.toLowerCase();

            if (query.includes("arduino")) {
                botResponse = "El Arduino Uno R3 es ideal para empezar. Lo tenemos en stock a $24.50. ¿Quieres que te lo muestre en el catálogo?";
            } else if (query.includes("proyecto") || query.includes("tesis")) {
                botResponse = "¡Genial! Para proyectos de grado suelo recomendar ESP32 o Sensores de precisión. ¿Qué magnitud necesitas medir?";
            } else if (query.includes("precio") || query.includes("barato")) {
                botResponse = "Nuestros componentes más accesibles son los packs de resistencias y sensores básicos desde $0.10.";
            } else {
                botResponse = "Entiendo. Estoy analizando tu requerimiento técnico en nuestra base de datos de componentes...";
            }

            setMessages(prev => [...prev, { role: 'assistant', text: botResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans">
            {isOpen ? (
                <div className="w-80 md:w-96 h-[550px] bg-white rounded-[2rem] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">

                    {/* HEADER PREMIUM */}
                    <div className="bg-slate-900 p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/40">
                                    <BrainCircuit className="text-white" size={20} />
                                </div>
                                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="text-white font-black text-xs tracking-widest uppercase">ElectroAI v2.0</h3>
                                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter">Asistente Cognitivo</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* CHAT MESSAGES */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                        ? 'bg-slate-900 text-white rounded-tr-none shadow-lg'
                                        : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                                    }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}

                        {/* INDICADOR DE ESCRITURA */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* INPUT AREA */}
                    <div className="p-4 bg-white border-t border-slate-100">
                        <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-1 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Pregúntame sobre hardware..."
                                className="flex-1 bg-transparent border-none py-3 text-sm outline-none text-slate-700"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="text-blue-600 disabled:text-slate-300 p-1 hover:scale-110 transition-transform"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-[9px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest">
                            Desarrollado para Ingeniería de Sistemas
                        </p>
                    </div>
                </div>
            ) : (
                /* BOTÓN FLOTANTE ESTILIZADO */
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative group bg-slate-900 text-white p-5 rounded-2xl shadow-2xl hover:bg-blue-600 transition-all duration-500"
                >
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse shadow-lg">
                        AI
                    </div>
                    <Sparkles className="group-hover:rotate-12 transition-transform" size={28} />
                </button>
            )}
        </div>
    );
};