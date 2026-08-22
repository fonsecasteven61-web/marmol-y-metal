import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { cerrarSesion } from "./login/actions"; 

export default async function AdminDashboard() {
  const totalMemoriales = await prisma.memorial.count().catch(() => 0);
  const totalClientes = await prisma.cliente.count().catch(() => 0);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      
      {/* Cabecera con Título y Botón de Cerrar Sesión */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h1 style={{ color: "#333", fontSize: "2rem", margin: "0 0 10px 0" }}>Panel Administrativo - Mármol y Metal</h1>
          <p style={{ color: "#666", margin: 0 }}>Bienvenido al sistema de gestión central.</p>
        </div>
        <form action={cerrarSesion}>
          <button 
            type="submit" 
            style={{ background: "#dc2626", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
          >
            Cerrar Sesión
          </button>
        </form>
      </div>

      {/* Tarjetas de estadísticas */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", flex: 1, minWidth: "200px" }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#444" }}>Memoriales Registrados</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#2563eb" }}>{totalMemoriales}</p>
        </div>

        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", flex: 1, minWidth: "200px" }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#444" }}>Clientes Registrados</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#059669" }}>{totalClientes}</p>
        </div>
      </div>

      {/* Botones de navegación rápida */}
      <h3 style={{ color: "#374151", marginBottom: "15px" }}>Accesos Rápidos</h3>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link 
          href="/admin/memoriales" 
          style={{ background: "#2563eb", color: "white", padding: "15px 25px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
        >
          🪦 Gestionar Memoriales
        </Link>
        <Link 
          href="/admin/clientes" 
          style={{ background: "#059669", color: "white", padding: "15px 25px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
        >
          👥 Gestionar Clientes
        </Link>
        <Link 
          href="/admin/mensajes" 
          style={{ background: "#d97706", color: "white", padding: "15px 25px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
        >
          💬 Moderar Mensajes
        </Link>
      </div>
    </div>
  );
}