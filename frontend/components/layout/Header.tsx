import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-v2.png"
            alt="Mármol y Metal S. de R.L."
            width={320}
            height={90}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Menú de Navegación */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link
            href="/"
            className="text-[#0e6251] font-semibold relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-[#0e6251]"
          >
            Inicio
          </Link>
          <Link href="#nosotros" className="hover:text-[#0e6251] transition-colors">
            Nosotros
          </Link>
          <Link href="#servicios" className="hover:text-[#0e6251] transition-colors">
            Servicios
          </Link>
          <Link href="#memorial-plus" className="hover:text-[#0e6251] transition-colors">
            Memorial Plus
          </Link>
          <Link href="#contacto" className="hover:text-[#0e6251] transition-colors">
            Contacto
          </Link>
        </nav>

        {/* Botón Cotizar */}
        <div className="flex items-center space-x-6">
          <div className="hidden lg:block h-8 w-[1px] bg-gray-200"></div>
          <a
            href="https://wa.me/50488629149"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0e6251] hover:bg-[#0b4d3f] text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 font-medium transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Cotizar</span>
          </a>
        </div>
      </div>
    </header>
  );
}