import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FormularioMemorial from "@/components/FormularioMemorial";
import { eliminarMemorial } from "./actions";

export default async function AdminMemorialesPage() {
  const [memoriales, clientes] = await Promise.all([
    prisma.memorial.findMany({
      orderBy: { creadoEn: "desc" },
      include: { cliente: true },
    }).catch(() => []),
    prisma.cliente.findMany({
      orderBy: { nombre: "asc" },
    }).catch(() => []),
  ]);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1 style={{ color: "#333", fontSize: "2rem", margin: "0 0 10px 0" }}>Gestión de Memoriales</h1>
          <p style={{ color: "#666", margin: 0 }}>Registra y administra los perfiles conmemorativos de Mármol y Metal.</p>
        </div>
        <Link 
          href="/admin" 
          style={{ background: "#4b5563", color: "white", padding: "10px 20px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}
        >
          ← Volver al Panel
        </Link>
      </div>

      {/* Formulario interactivo que maneja Cloudinary */}
      <FormularioMemorial clientes={clientes} />

      {/* Tabla de memoriales existentes */}
      <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", overflow: "hidden", marginTop: "30px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f3f4f6", borderBottom: "1px solid #e5e7eb", color: "#374151" }}>
              <th style={{ padding: "15px" }}>Slug / Enlace</th>
              <th style={{ padding: "15px" }}>Nombre del Difunto</th>
              <th style={{ padding: "15px" }}>Cliente / Familiar</th>
              <th style={{ padding: "15px" }}>Fechas</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Ubicación GPS</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Editar Datos</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Multimedia (Fotos/Videos)</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Código QR (Taller)</th>
              <th style={{ padding: "15px" }}>Registro</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {memoriales.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ padding: "30px", textAlign: "center", color: "#6b7280" }}>
                  No hay memoriales registrados todavía.
                </td>
              </tr>
            ) : (
              memoriales.map((m: any) => {
                const urlPublica = `${baseUrl}/memorial/${m.slug}`;
                const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(urlPublica)}`;

                return (
                  <tr key={m.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "15px" }}>
                      <Link 
                        href={`/memorial/${m.slug}`} 
                        target="_blank" 
                        style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}
                      >
                        {m.slug} ↗
                      </Link>
                    </td>
                    <td style={{ padding: "15px", color: "#111827", fontWeight: "bold" }}>{m.nombreDifunto}</td>
                    <td style={{ padding: "15px", color: "#4b5563", fontSize: "0.9rem" }}>
                      {m.cliente ? m.cliente.nombre : <span style={{ color: "#9ca3af" }}>Sin asignar</span>}
                    </td>
                    <td style={{ padding: "15px", color: "#4b5563", fontSize: "0.9rem" }}>
                      {new Date(m.fechaNacimiento).getFullYear()} — {new Date(m.fechaFallecimiento).getFullYear()}
                    </td>
                    
                    {/* Indicador de Ubicación */}
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      {m.ubicacionUrl ? (
                        <span style={{ background: "#d1fae5", color: "#065f46", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "bold" }}>
                          Configurada 📍
                        </span>
                      ) : (
                        <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>Sin mapa</span>
                      )}
                    </td>

                    {/* Botón exclusivo para Editar Datos Generales */}
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <Link 
                        href={`/admin/memoriales/${m.id}/editar`} 
                        style={{ background: "#dbeafe", color: "#1e40af", padding: "8px 14px", borderRadius: "6px", textDecoration: "none", fontSize: "0.85rem", fontWeight: "bold", display: "inline-block", border: "1px solid #bfdbfe" }}
                      >
                        Editar ✏️
                      </Link>
                    </td>

                    {/* Botón original: Gestionar Fotos y Videos */}
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <Link 
                        href={`/admin/memoriales/${m.id}`} 
                        style={{ background: "#e5e7eb", color: "#374151", padding: "8px 14px", borderRadius: "6px", textDecoration: "none", fontSize: "0.85rem", fontWeight: "bold", display: "inline-block", border: "1px solid #d1d5db" }}
                      >
                        Gestionar ⚙️
                      </Link>
                    </td>

                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <div style={{ display: "inline-block", background: "white", padding: "5px", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
                        <img 
                          src={qrApiUrl} 
                          alt={`QR de ${m.nombreDifunto}`} 
                          style={{ width: "65px", height: "65px", display: "block", margin: "0 auto" }} 
                        />
                        <a 
                          href={qrApiUrl} 
                          download={`QR-${m.slug}.png`}
                          target="_blank"
                          style={{ fontSize: "0.75rem", color: "#2563eb", textDecoration: "none", display: "block", marginTop: "4px", fontWeight: "bold" }}
                        >
                          Descargar QR
                        </a>
                      </div>
                    </td>
                    <td style={{ padding: "15px", color: "#6b7280", fontSize: "0.9rem" }}>
                      {new Date(m.creadoEn).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                    </td>

                    {/* Botón para Eliminar Memorial */}
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <form 
                        action={async (formData) => {
                          "use server";
                          await eliminarMemorial(formData);
                        }}
                      >
                        <input type="hidden" name="id" value={m.id} />
                        <button 
                          type="submit" 
                          style={{ background: "#fee2e2", color: "#991b1b", padding: "8px 12px", borderRadius: "6px", border: "1px solid #f87171", fontSize: "0.85rem", fontWeight: "bold", cursor: "pointer" }}
                        >
                          Eliminar 🗑️
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}