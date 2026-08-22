import { Award, HeartHandshake, QrCode, MapPin } from 'lucide-react';

const stats = [
  {
    icon: Award,
    value: '+19',
    label: 'Años de Experiencia',
    description: 'Creando homenajes con acabados de alta calidad',
  },
  {
    icon: HeartHandshake,
    value: '100%',
    label: 'Atención Personalizada',
    description: 'Acompañamiento empático en cada proyecto',
  },
  {
    icon: QrCode,
    value: 'QR',
    label: 'Memorial Plus',
    description: 'Perfiles digitales interactivos en la lápida',
  },
  {
    icon: MapPin,
    value: 'HN',
    label: 'Cobertura Nacional',
    description: 'Envíos e instalaciones en todo Honduras',
  },
];

export default function Stats() {
  return (
    <section className="bg-gray-50/80 py-12 -mt-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Detalle decorativo superior en hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#0e6251] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Contenedor del Icono */}
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0e6251] flex items-center justify-center mb-4 group-hover:bg-[#0e6251] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Cifra/Métrica */}
                <span className="text-3xl font-extrabold text-[#0e6251] tracking-tight mb-1">
                  {stat.value}
                </span>

                {/* Etiqueta Principal */}
                <h3 className="text-gray-900 font-semibold text-base mb-1">
                  {stat.label}
                </h3>

                {/* Subtexto descriptivo corto */}
                <p className="text-gray-500 text-xs leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}