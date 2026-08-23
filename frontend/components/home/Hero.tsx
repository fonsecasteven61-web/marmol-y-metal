import Image from 'next/image';
import { MessageCircle, QrCode } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[580px] bg-[#021814] text-white flex items-center overflow-hidden">
      {/* Contenedor de la Imagen (Ubicada a la derecha) */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[65%] lg:w-[60%] z-0 overflow-hidden">
        <Image
          src="/images/hero-bg3.png"
          alt="Lápida Mármol y Metal"
          fill
          priority
          className="object-cover object-right"
        />
        {/* Degradado para fundir el fondo verde con el fondo oscuro de la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#021814] via-[#021814]/70 to-transparent w-full md:w-1/2"></div>
      </div>

      {/* Contenido alineado a la izquierda */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 w-full z-10">
        <div className="max-w-md">
          {/* Badge */}
          <div className="inline-block bg-[#0e6251]/60 border border-emerald-500/30 text-emerald-200 text-xs font-medium px-3.5 py-1 rounded-full mb-5 backdrop-blur-sm">
            Más de 19 años creando arte para recordar
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            Mármol y Metal <br />
            S. de R.L.
          </h1>

          {/* Descripción corta */}
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
            Especialistas en lápidas y placas conmemorativas. Preserva el legado de tus seres queridos con nuestro servicio exclusivo <span className="text-white font-medium">Memorial Plus</span>.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/50493181006"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0e6251] hover:bg-[#0b4d3f] text-white px-5 py-3 rounded-lg flex items-center justify-center space-x-2 text-sm font-semibold transition-all shadow-lg hover:shadow-emerald-900/40"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Solicitar Cotización</span>
            </a>

            <a
              href="#memorial-plus"
              className="border border-white/30 bg-black/20 hover:bg-white/10 backdrop-blur-sm text-white px-5 py-3 rounded-lg flex items-center justify-center space-x-2 text-sm font-semibold transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>Conocer Memorial Plus</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}