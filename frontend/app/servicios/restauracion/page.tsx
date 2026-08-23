import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';

const restauracionServices = [
  {
    title: 'Limpieza Profunda y Pulido',
    desc: 'Tratamiento especializado para eliminar hongos y manchas, devolviendo el brillo original.',
    features: ['Mármol Verde y Mármol Blanco', 'Granito Negro y Granito Gris', 'Cuarzo Blanco y acabados en Aluminio']
  },
  {
    title: 'Retoque de Letras y Fotografías',
    desc: 'Renovación completa de textos e imágenes deterioradas por el sol y la humedad.',
    features: ['Repintado y retoque de letras desgastadas', 'Restauración de fotografías grabadas directamente', 'Sustitución o retoque de láminas en resina']
  },
  {
    title: 'Fijación y Protección Estructural',
    desc: 'Reparación técnica y sellado de la estructura física.',
    features: ['Mantenimiento para piezas de Aluminio', 'Nivelación y fijación de piezas sueltas', 'Selladores impermeabilizantes contra intemperie']
  },
];

export default function RestauracionPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* BOTÓN VOLVER */}
        <Link 
          href="/#servicios" 
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-[#0e6251] font-medium text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Servicios</span>
        </Link>

        {/* ENCABEZADO PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-[#0e6251] font-bold text-xs tracking-wider uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full">
              Mantenimiento & Conservación
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">
              Restauración y Mantenimiento
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
              Brindamos servicio técnico profesional para devolver el estado y esplendor original a monumentos, lápidas y placas conmemorativas en Mármol Verde, Mármol Blanco, Granito Negro, Granito Gris, Cuarzo Blanco y Aluminio.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/50488629149?text=Hola,%20deseo%20consultar%20sobre%20un%20servicio%20de%20Restauración"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0e6251] hover:bg-[#0b4d3f] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center space-x-2 transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Consultar Mantenimiento o Restauración</span>
              </a>
            </div>
          </div>

          {/* IMAGEN DESTACADA (CORREGIDA SIN RECORTE) */}
          <div className="relative h-95 md:h-112.5 w-full rounded-3xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-center">
            <Image
              src="/images/restauracion-hero.jpeg"
              alt="Restauración de Mármol y Granito - Mármol y Metal S. de R.L."
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* REJILLA DE SERVICIOS TÉCNICOS */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Procesos Técnicos de Restauración
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restauracionServices.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{item.desc}</p>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0e6251]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}