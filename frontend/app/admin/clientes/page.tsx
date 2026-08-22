import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { crearCliente, actualizarCliente, eliminarCliente } from "./actions";

export default async function AdminClientesPage() {
  const clientes = await prisma.cliente.findMany({
    orderBy: { fechaRegistro: "desc" },
    include: {
      memoriales: {
        select: { nombreDifunto: true, slug: true },
      },
    },
  }).catch(() => []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1 style={{ color: "#333", fontSize: "2rem", margin: "0 0 10px 0" }}>Gestión de Clientes</h1>
          <p style={{ color: "#666", margin: 0 }}>Administra los familiares y compradores de los servicios.</p>
        </div>
        <Link 
          href="/admin" 
          style={{ background: "#4b5563", color: "white", padding: "10px 20px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}
        >
          ← Volver al Panel
        </Link>
      </div>

      {/* Formulario para registrar cliente */}
      <div style={{ background: "white", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <h3 style={{ margin: "0 0 20px 0", color: "#374151" }}>Registrar Nuevo Cliente</h3>
        <form action={crearCliente} style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <input 
            type="text" 
            name="nombre" 
            placeholder="Nombre completo del cliente *" 
            required
            style={{ flex: 2, minWidth: "220px", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
          />
          <input 
            type="text" 
            name="telefono" 
            placeholder="Teléfono / WhatsApp *" 
            required
            style={{ flex: 1, minWidth: "150px", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
          />
          <input 
            type="email" 
            name="correo" 
            placeholder="Correo electrónico (Opcional)" 
            style={{ flex: 1, minWidth: "180px", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
          />
          <input 
            type="text" 
            name="direccion" 
            placeholder="Dirección o Ciudad (Opcional)" 
            style={{ flex: 2, minWidth: "220px", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
          />
          <button 
            type="submit" 
            style={{ background: "#059669", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", width: "100%" }}
          >
            Guardar Cliente
          </button>
        </form>
      </div>

      {/* Tabla de clientes */}
      <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f3f4f6", borderBottom: "1px solid #e5e7eb", color: "#374151" }}>
              <th style={{ padding: "15px" }}>Nombre del Cliente</th>
              <th style={{ padding: "15px" }}>Teléfono</th>
              <th style={{ padding: "15px" }}>Correo</th>
              <th style={{ padding: "15px" }}>Memoriales Asociados</th>
              <th style={{ padding: "15px" }}>Registro</th>
              <th style={{ padding: "15px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "30px", textAlign: "center", color: "#6b7280" }}>
                  No hay clientes registrados todavía.
                </td>
              </tr>
            ) : (
              clientes.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "15px", fontWeight: "bold", color: "#111827" }}>{c.nombre}</td>
                  <td style={{ padding: "15px", color: "#4b5563" }}>{c.telefono}</td>
                  <td style={{ padding: "15px", color: "#4b5563" }}>{c.correo || "No registrado"}</td>
                  <td style={{ padding: "15px" }}>
                    {c.memoriales.length === 0 ? (
                      <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Sin memorial asociado</span>
                    ) : (
                      c.memoriales.map((m) => (
                        <div key={m.slug} style={{ fontSize: "0.9rem" }}>
                          <Link href={`/memorial/${m.slug}`} target="_blank" style={{ color: "#2563eb", textDecoration: "none" }}>
                            {m.nombreDifunto} ↗
                          </Link>
                        </div>
                      ))
                    )}
                  </td>
                  <td style={{ padding: "15px", color: "#6b7280", fontSize: "0.9rem" }}>
                    {new Date(c.fechaRegistro).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "center" }}>
                      
                      {/* Formulario de Edición Directa (Actualizar campos mediante inputs en línea o Server Action) */}
                      <details style={{ background: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                        <summary style={{ color: "#1e40af", fontWeight: "bold", cursor: "pointer", fontSize: "0.85rem" }}>
                          Editar ✏️
                        </summary>
                        <form 
                          action={async (formData) => {
                            "use server";
                            await actualizarCliente(formData);
                          }} 
                          style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px", minWidth: "220px", textAlign: "left" }}
                        >
                          <input type="hidden" name="id" value={c.id} />
                          <input type="text" name="nombre" defaultValue={c.nombre} placeholder="Nombre" required style={{ padding: "6px", fontSize: "0.85rem", borderRadius: "4px", border: "1px solid #d1d5db", color: "#000" }} />
                          <input type="text" name="telefono" defaultValue={c.telefono} placeholder="Teléfono" required style={{ padding: "6px", fontSize: "0.85rem", borderRadius: "4px", border: "1px solid #d1d5db", color: "#000" }} />
                          <input type="email" name="correo" defaultValue={c.correo || ""} placeholder="Correo" style={{ padding: "6px", fontSize: "0.85rem", borderRadius: "4px", border: "1px solid #d1d5db", color: "#000" }} />
                          <input type="text" name="direccion" defaultValue={c.direccion || ""} placeholder="Dirección" style={{ padding: "6px", fontSize: "0.85rem", borderRadius: "4px", border: "1px solid #d1d5db", color: "#000" }} />
                          <button type="submit" style={{ background: "#2563eb", color: "white", border: "none", padding: "6px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", fontSize: "0.85rem" }}>
                            Actualizar
                          </button>
                        </form>
                      </details>

                      {/* Botón de Eliminar */}
                      <form 
                        action={async (formData) => {
                          "use server";
                          await eliminarCliente(formData);
                        }}
                      >
                        <input type="hidden" name="id" value={c.id} />
                        <button 
                          type="submit" 
                          style={{ background: "#fee2e2", color: "#991b1b", padding: "8px 10px", borderRadius: "6px", border: "1px solid #f87171", fontSize: "0.8rem", fontWeight: "bold", cursor: "pointer" }}
                        >
                          Eliminar 🗑️
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