import { 
  QrCode, BookOpen, Image as ImageIcon, Film, 
  MessageSquareHeart, Share2, Sparkles, CheckCircle2, 
  ChevronRight, ShieldCheck, MapPin
} from 'lucide-react';

const features = [
  { icon: BookOpen, title: 'Biografía Personalizada', desc: 'Reseña completa de su vida y legado.' },
  { icon: ImageIcon, title: 'Galería de Fotos', desc: 'Álbum organizado por etapas inolvidables.' },
  { icon: Film, title: 'Videos Conmemorativos', desc: 'Momentos especiales en movimiento.' },
  { icon: MessageSquareHeart, title: 'Libro de Condolencias', desc: 'Espacio para mensajes de seres queridos.' },
  { icon: MapPin, title: 'Ubicación Guiada', desc: 'Mapa exacto para que la familia pueda llegar.' },
];

const steps = [
  { num: '01', title: 'Adquisición', desc: 'Eliges el servicio Memorial Plus con tu lápida.' },
  { num: '02', title: 'Creación Digital', desc: 'Recopilamos las fotos, biografía y detalles.' },
  { num: '03', title: 'Elección de Acabado', desc: 'Grabado directo o lámina con acabado en resina.' },
  { num: '04', title: 'Instalación', desc: 'Montaje profesional en el monumento.' },
  { num: '05', title: 'Escanear & Recordar', desc: 'Acceso inmediato desde cualquier celular.' },
];

export default function MemorialPlus() {
  return (
    <section id="memorial-plus" className="py-24 bg-[#021814] text-white relative overflow-hidden">
      {/* Fondo decorativo con luces tenue */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO PRINCIPAL */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Servicio Exclusivo Mármol & Metal</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Con <span className="text-emerald-400">Memorial Plus</span>, la historia de quienes amamos permanece viva para siempre.
          </h2>
          
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Un homenaje digital permanente, elegante y seguro mediante un código QR grabado directamente en la piedra o en lámina con acabado en resina.
          </p>
        </div>

        {/* REJILLA DE CARACTERÍSTICAS DE LO QUE INCLUYE */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-emerald-200">
              ¿Qué incluye el Perfil Digital?
            </h3>
            <p className="text-gray-400 text-sm mt-1">Un espacio completo para honrar cada momento inolvidable</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0e6251] flex items-center justify-center text-emerald-300 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CÓMO FUNCIONA EL PROCESO (PASO A PASO) */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-emerald-400 font-semibold text-xs tracking-widest uppercase">Paso a paso</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">¿Cómo funciona Memorial Plus?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative group">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-sm mb-4 group-hover:bg-[#0e6251] group-hover:text-white transition-colors">
                  {step.num}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* OPCCIONES DE PRESENTACIÓN Y PLAN DE MANTENIMIENTO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LO QUE RECIBE & OPCIONES DE APLICACIÓN */}
          <div className="bg-gradient-to-br from-[#0e6251]/40 to-black/40 border border-emerald-500/30 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span>¿Qué recibe la familia?</span>
              </h3>

              <ul className="space-y-4 mb-6">
                <li className="flex items-start space-x-3 text-sm text-gray-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Perfil digital interactivo y personalizado.</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-gray-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Opción 1:</strong> Grabado directo en el material de la lápida.</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-gray-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Opción 2:</strong> Placa en lámina con acabado de protección en resina.</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-gray-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Código QR único resistente a la intemperie y rayos UV.</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-gray-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Acceso inmediato desde cualquier smartphone sin requerir aplicaciones.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-emerald-300 font-medium">* Precios variables según la opción de grabado o resina seleccionada</span>
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          {/* PLAN DE MANTENIMIENTO Y CTA */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Compromiso & Respaldo
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Garantía de Permanencia Digital
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Para garantizar que el memorial permanezca siempre activo, alojado en servidores seguros, con copias de seguridad de las fotografías y listo para actualizarse cuando lo necesiten, manejamos un plan de:
              </p>

              <div className="bg-black/30 border border-emerald-500/20 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-white font-bold text-base">Mantenimiento Anual Opcional</span>
                  <span className="text-xs text-emerald-400 font-semibold">Soporte Continuo</span>
                </div>
                <p className="text-gray-400 text-xs">
                  Incluye servidor cloud de alta velocidad, soporte técnico, copias de seguridad y actualización de imágenes o relatos a solicitud.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/50488629149?text=Hola,%20deseo%20más%20información%20sobre%20el%20servicio%20Memorial%20Plus"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0e6251] hover:bg-[#0b4d3f] text-white py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg hover:shadow-emerald-900/50 transition-all text-center"
            >
              <QrCode className="w-5 h-5" />
              <span>Solicitar Memorial Plus para mi Ser Querido</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}