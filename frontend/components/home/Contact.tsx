'use client';

import { MapPin, Phone, Clock, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contacto" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ENCABEZADO */}
        <div className="max-w-2xl mb-16">
          <span className="text-[#0e6251] font-bold text-xs tracking-wider uppercase bg-emerald-100/80 px-3.5 py-1.5 rounded-full">
            Atención Directa
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 leading-tight">
            Ponte en contacto con nosotros
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Estamos listos para asesorarte con empatía, profesionalismo y el mayor cuidado en cada detalle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* TARJETAS DE INFORMACIÓN DE CONTACTO */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp / Teléfono */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#0e6251]/10 text-[#0e6251] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Teléfono & WhatsApp</h3>
                <p className="text-xs text-slate-500 mb-2">Atención inmediata para cotizaciones</p>
                <a 
                  href="https://wa.me/50488629149" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0e6251] font-semibold text-sm hover:underline flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  +504 8862-9149
                </a>
              </div>
            </div>

            {/* Ubicación */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#0e6251]/10 text-[#0e6251] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Ubicación y Cobertura</h3>
                <p className="text-xs text-slate-500 mb-1">Honduras</p>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Envíos e instalaciones disponibles para todo el territorio nacional.
                </p>
              </div>
            </div>

            {/* Horario */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#0e6251]/10 text-[#0e6251] flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Horarios de Atención</h3>
                <p className="text-xs text-slate-600 mt-1">Lunes a Viernes: 8:00 AM – 5:00 PM</p>
                <p className="text-xs text-slate-600">Sábados: 8:00 AM – 2:00 PM</p>
              </div>
            </div>

          </div>

          {/* FORMULARIO DE MENSAJE RÁPIDO */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Envíanos un mensaje</h3>
            <p className="text-xs text-slate-500 mb-6">Completa los campos y te responderemos a la brevedad posible.</p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const service = (form.elements.namedItem('service') as HTMLSelectElement).value;
                const msg = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                
                const text = `Hola, mi nombre es ${name}.\n\nMe interesa cotizar el servicio de: ${service}\n\nDetalles del mensaje:\n${msg}`;
                
                window.open(`https://wa.me/50488629149?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre Completo</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#0e6251] focus:ring-1 focus:ring-[#0e6251] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Servicio de Interés</label>
                <select 
                  name="service" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-medium text-sm focus:outline-none focus:border-[#0e6251] focus:ring-1 focus:ring-[#0e6251] bg-white"
                >
                  <option value="Lápidas y Trabajos Memorables" className="text-slate-900">Lápidas y Trabajos Memorables</option>
                  <option value="Placas para Proyectos e Inauguraciones" className="text-slate-900">Placas para Proyectos / Inauguraciones</option>
                  <option value="Servicio Memorial Plus (Código QR)" className="text-slate-900">Servicio Memorial Plus (Código QR)</option>
                  <option value="Restauración y Mantenimiento" className="text-slate-900">Restauración y Mantenimiento</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mensaje o Detalles del Trabajo</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  required 
                  placeholder="Escribe aquí las medidas, tipo de material o detalles de tu consulta..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-medium placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#0e6251] focus:ring-1 focus:ring-[#0e6251] bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0e6251] hover:bg-[#0b4d3f] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-emerald-900/30"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Consulta por WhatsApp</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}