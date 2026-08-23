import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { moderarMensaje } from "./actions";

export default async function AdminMensajesPage() {
  const mensajes = await prisma.mensaje.findMany({
    orderBy: { fecha: "desc" },
    include: {
      memorial: {
        select: { nombreDifunto: true, slug: true },
      },
    },
  }).catch(() => []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1 style={{ color: "#333", fontSize: "2rem", margin: "0 0 10px 0" }}>Moderación de Condolencias</h1>
          <p style={{ color: "#666", margin: 0 }}>Aprueba, oculta o elimina los mensajes enviados a los libros de condolencias.</p>
        </div>
        <Link 
          href="/admin" 
          style={{ background: "#4b5563", color: "white", padding: "10px 20px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}
        >
          ← Volver al Panel
        </Link>
      </div>

      {/* Tabla de mensajes */}
      <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f3f4f6", borderBottom: "1px solid #e5e7eb", color: "#374151" }}>
              <th style={{ padding: "15px" }}>Memorial</th>
              <th style={{ padding: "15px" }}>Autor / Relación</th>
              <th style={{ padding: "15px" }}>Mensaje</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Estado</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mensajes.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "#6b7280" }}>
                  No hay mensajes de condolencia registrados todavía.
                </td>
              </tr>
            ) : (
              mensajes.map((m: any) => (
                <tr key={m.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "15px" }}>
                    <Link 
                      href={`/memorial/${m.memorial.slug}`} 
                      target="_blank" 
                      style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold", fontSize: "0.95rem" }}
                    >
                      {m.memorial.nombreDifunto} ↗
                    </Link>
                  </td>
                  <td style={{ padding: "15px" }}>
                    <div style={{ fontWeight: "bold", color: "#111827" }}>{m.nombre}</div>
                    <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>{m.relacion || "Familiar/Amigo"}</div>
                  </td>
                  <td style={{ padding: "15px", color: "#4b5563", maxWidth: "300px", fontSize: "0.95rem" }}>
                    &ldquo;{m.mensaje}&rdquo;
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    {m.aprobado ? (
                      <span style={{ background: "#d1fae5", color: "#065f46", padding: "4px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold" }}>
                        Aprobado
                      </span>
                    ) : (
                      <span style={{ background: "#fef3c7", color: "#92400e", padding: "4px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold" }}>
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "center" }}>
                      <form action={moderarMensaje}>
                        <input type="hidden" name="mensajeId" value={m.id} />
                        <input type="hidden" name="accion" value={m.aprobado ? "ocultar" : "aprobar"} />
                        <button 
                          type="submit" 
                          style={{ 
                            background: m.aprobado ? "#d97706" : "#059669", 
                            color: "white", 
                            border: "none", 
                            padding: "6px 12px", 
                            borderRadius: "6px", 
                            fontSize: "0.8rem", 
                            fontWeight: "bold", 
                            cursor: "pointer" 
                          }}
                        >
                          {m.aprobado ? "Ocultar" : "Aprobar"}
                        </button>
                      </form>

                      <form action={moderarMensaje}>
                        <input type="hidden" name="mensajeId" value={m.id} />
                        <input type="hidden" name="accion" value="eliminar" />
                        <button 
                          type="submit" 
                          style={{ 
                            background: "#dc2626", 
                            color: "white", 
                            border: "none", 
                            padding: "6px 12px", 
                            borderRadius: "6px", 
                            fontSize: "0.8rem", 
                            fontWeight: "bold", 
                            cursor: "pointer" 
                          }}
                        >
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}