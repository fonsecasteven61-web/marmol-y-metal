import Link from 'next/link';
import { 
  Building2, Sparkles, ChevronRight, MessageCircle, 
  Wrench, Flame
} from 'lucide-react';

const services = [
  {
    id: 'lapidas',
    icon: Flame,
    tag: 'Especialidad',
    title: 'Lápidas y Trabajos Memorables',
    link: '/servicios/lapidas',
    description: 'Especialistas en la fabricación e instalación de lápidas en mármol, granito y cuarzo. Honramos la memoria de tus seres queridos con diseños duraderos y acabados impecables.',
    highlights: [
      'Mármol Verde, Mármol Blanco, Granito Negro, Granito Gris y Cuarzo Blanco',
      'Fotografías grabadas directas en el material o en lámina con resina',
      'Grabado láser y labrado artesanal de alta precisión',
      'Detalles y acabados en Aluminio de alta durabilidad',
    ],
    ctaText: 'Cotizar Lápida',
  },
  {
    id: 'placas',
    icon: Building2,
    tag: 'Institucional & Proyectos',
    title: 'Placas Conmemorativas e Inauguraciones',
    link: '/servicios/placas',
    description: 'Placas metálicas en aluminio y en piedras seleccionadas para proyectos arquitectónicos, inauguraciones de obras públicas o privadas y reconocimientos corporativos.',
    highlights: [
      'Placas y acabados en Aluminio',
      'Bases en Mármoles (Verde/Blanco), Granitos (Negro/Gris) y Cuarzo Blanco',
      'Logotipos institucionales y letras grabadas en alto relieve',
      'Fotografías en lámina con resina o grabado directo',
    ],
    ctaText: 'Cotizar Placa',
  },
  {
    id: 'restauracion',
    icon: Wrench,
    tag: 'Mantenimiento & Conservación',
    title: 'Restauración y Mantenimiento',
    link: '/servicios/restauracion',
    description: 'Servicio técnico especializado para recuperar la apariencia original de monumentos, lápidas y placas antiguas en mármol, granito, cuarzo y aluminio.',
    highlights: [
      'Limpieza profunda y pulido de mármoles, granitos y cuarzo',
      'Repintado y retoque de letras e inscripciones',
      'Restauración de fotografías grabadas y en lámina con resina',
      'Nivelación y protección con selladores de intemperie',
    ],
    ctaText: 'Consultar Restauración',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#0e6251] font-bold text-xs tracking-wider uppercase bg-emerald-100/80 px-3.5 py-1.5 rounded-full">
            Catálogo de Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4">
            Soluciones en Mármol, Granito, Cuarzo y Aluminio
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Combinamos la nobleza de la piedra natural y sintética con la resistencia del metal para entregar un trabajo distinguido e inolvidable.
          </p>
        </div>

        {/* TARJETAS DE SERVICIOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#0e6251]/10 text-[#0e6251] flex items-center justify-center group-hover:bg-[#0e6251] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0e6251] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-8 border-t border-slate-100 pt-4">
                    {service.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link 
                    href={service.link}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0e6251] hover:underline"
                  >
                    <span>Ver más detalles</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/50488629149?text=Hola,%20deseo%20cotizar%20el%20servicio%20de%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0e6251] hover:bg-[#0b4d3f] text-white p-2.5 rounded-xl transition-all shadow-md"
                    title={service.ctaText}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}