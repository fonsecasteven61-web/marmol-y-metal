import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* LOGO E IDENTIDAD */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-white rounded-lg p-1">
              <Image 
                src="/images/logo.png" 
                alt="Mármol & Metal" 
                fill 
                className="object-contain" 
              />
            </div>
            <div>
              <span className="text-white font-bold text-base block leading-none">Mármol y Metal S. de R.L.</span>
              <span className="text-xs text-slate-500">Arte para recordar</span>
            </div>
          </div>

          {/* MENÚ DE NAVEGACIÓN RÁPIDA */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a href="#inicio" className="hover:text-emerald-400 transition-colors">Inicio</a>
            <a href="#nosotros" className="hover:text-emerald-400 transition-colors">Nosotros</a>
            <a href="#servicios" className="hover:text-emerald-400 transition-colors">Servicios</a>
            <a href="#memorial-plus" className="hover:text-emerald-400 transition-colors">Memorial Plus</a>
            <a href="#contacto" className="hover:text-emerald-400 transition-colors">Contacto</a>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Mármol y Metal S. de R.L. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">Diseñado para honrar el legado y la memoria.</p>
        </div>
      </div>
    </footer>
  );
}