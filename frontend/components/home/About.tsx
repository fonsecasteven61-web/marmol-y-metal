import Image from 'next/image';
import { Award, CheckCircle2 } from 'lucide-react';

const highlights = [
  'Más de 19 años de experiencia en la industria conmemorativa.',
  'Materiales seleccionados: Mármoles, granitos importados y metales de alta calidad.',
  'Técnicas avanzadas de grabado láser y labrado artesanal.',
  'Pioneros en Honduras con el servicio exclusivo Memorial Plus.',
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LADO IZQUIERDO: COMPOSICIÓN VISUAL CON TU IMAGEN NOSOTROS.PNG */}
          <div className="relative">
            {/* Marco decorativo de fondo */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-100/60 rounded-3xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-[#0e6251]/10 rounded-3xl -z-10" />

            {/* Contenedor de la Imagen */}
            <div className="relative h-[420px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <Image
                src="/images/nosotros.png"
                alt="Sobre Mármol y Metal S. de R.L."
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Tarjeta flotante de experiencia */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-100 shadow-xl flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#0e6251] text-white flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-[#0e6251]">+19 Años</span>
                <p className="text-xs text-gray-600 font-medium">Ofreciendo arte, respeto y durabilidad en cada trabajo.</p>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: TEXTO INFORMATIVO */}
          <div>
            <span className="text-[#0e6251] font-bold text-xs tracking-wider uppercase bg-emerald-100/80 px-3.5 py-1.5 rounded-full">
              Sobre Nosotros
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
              Honrando la memoria con calidad, empatía y maestría artesanal
            </h2>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              En <strong className="text-gray-900">Mármol y Metal S. de R.L.</strong> nos especializamos en la elaboración e instalación de lápidas, monumentos y placas conmemorativas. Combinamos la nobleza de la piedra con el detalle del metal para crear homenajes eternos.
            </p>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              Nuestro compromiso va más allá de la fabricación: entendemos el valor sentimental de cada proyecto y brindamos una atención empática, garantizando acabados de máxima calidad física y soluciones digitales innovadoras.
            </p>

            {/* LISTA DE PUNTOS CLAVE */}
            <div className="space-y-3.5 mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0e6251] flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* BOTÓN DE NAVEGACIÓN */}
            <div className="pt-6 border-t border-gray-100 flex items-center space-x-4">
              <a
                href="#servicios"
                className="bg-[#0e6251] hover:bg-[#0b4d3f] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-emerald-900/30"
              >
                Ver Nuestros Servicios
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}