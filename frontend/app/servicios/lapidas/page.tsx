import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, QrCode, Sparkles, MessageCircle } from 'lucide-react';

const lapidaTypes = [
  {
    title: 'Mármol (Verde y Blanco)',
    desc: 'Elegancia clásica y pulido de alto brillo ideal para interiores y exteriores.',
    features: ['Mármol Verde y Mármol Blanco seleccionados', 'Resistencia al paso del tiempo', 'Grabado láser y labrado artesanal de alta precisión']
  },
  {
    title: 'Granito (Negro y Gris) y Cuarzo Blanco',
    desc: 'Superficies de máxima densidad, nula absorción de humedad y excelente durabilidad a la intemperie.',
    features: ['Granito Negro, Granito Gris y Cuarzo Blanco', 'Cero absorción de humedad y alta resistencia al sol', 'Acabados limpios de fotograbado']
  },
  {
    title: 'Fotografías y Detalles en Aluminio',
    desc: 'Opciones de retrato de alta definición con máxima durabilidad.',
    features: ['Fotografías grabadas directamente en el material', 'Fotografías en lámina con recubrimiento de resina', 'Marcos, letras y acabados en Aluminio']
  },
];

export default function LapidasPage() {
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
              Especialidad Principal
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">
              Lápidas y Trabajos Memorables
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
              Diseñamos y fabricamos monumentos y lápidas conmemorativas con los más altos estándares de calidad. Trabajamos Mármol Verde, Mármol Blanco, Granito Negro, Granito Gris, Cuarzo Blanco y Aluminio para asegurar que la memoria de tu ser querido perdure intacta.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/50493181006?text=Hola,%20deseo%20cotizar%20una%20Lápida%20personalizada"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0e6251] hover:bg-[#0b4d3f] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center space-x-2 transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Cotizar Lápida Personalizada</span>
              </a>
            </div>
          </div>

          {/* IMAGEN DESTACADA */}
          <div className="relative h-[380px] md:h-[450px] w-full rounded-3xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-center">
            <Image
              src="/images/lapidas-hero.jpeg"
              alt="Lápidas en Mármol y Granito - Mármol y Metal S. de R.L."
              fill
              className="object-contain p-2"
            />
          </div>
        </div>

        {/* REJILLA DE TIPOS Y ACABADOS */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Materiales y Opciones de Fotograbado
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lapidaTypes.map((item, idx) => (
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

        {/* INTEGRA MEMORIAL PLUS */}
        <div className="bg-[#021814] text-white rounded-3xl p-8 md:p-12 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Complemento Innovador</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Añade el Servicio Memorial Plus
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Puedes integrar en tu lápida un código QR grabado directamente en el material o en lámina con acabado de resina, para dar acceso al perfil digital permanente con fotos, biografía y música.
            </p>
          </div>

          <Link
            href="/#memorial-plus"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-6 py-4 rounded-xl text-sm flex items-center space-x-2 whitespace-nowrap transition-all shadow-lg"
          >
            <QrCode className="w-5 h-5" />
            <span>Conocer Memorial Plus</span>
          </Link>
        </div>

      </div>
    </div>
  );
}