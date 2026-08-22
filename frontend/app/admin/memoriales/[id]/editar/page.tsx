import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { actualizarMemorial } from "../../actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarMemorialPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const [memorial, clientes] = await Promise.all([
    prisma.memorial.findUnique({ where: { id } }).catch(() => null),
    prisma.cliente.findMany({ orderBy: { nombre: "asc" } }).catch(() => []),
  ]);

  if (!memorial) {
    notFound();
  }

  // Formatear fechas para los inputs tipo "date" (YYYY-MM-DD)
  const formatInputDate = (date: Date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#f3f4f6", minHeight: "100vh", color: "#1f2937" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div>
            <h1 style={{ color: "#111827", fontSize: "2rem", margin: "0 0 8px 0" }}>Editar Memorial</h1>
            <p style={{ color: "#4b5563", margin: 0 }}>Modificando el perfil de: <strong>{memorial.nombreDifunto}</strong></p>
          </div>
          <Link 
            href="/admin/memoriales" 
            style={{ background: "#4b5563", color: "white", padding: "10px 16px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", fontSize: "0.9rem" }}
          >
            ← Volver
          </Link>
        </div>

        <div style={{ background: "white", borderRadius: "10px", padding: "30px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <form action={actualizarMemorial} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <input type="hidden" name="id" value={memorial.id} />

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "5px", color: "#4b5563" }}>Nombre del Difunto</label>
              <input 
                type="text" 
                name="nombreDifunto" 
                defaultValue={memorial.nombreDifunto} 
                required 
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "5px", color: "#4b5563" }}>Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  name="fechaNacimiento" 
                  defaultValue={formatInputDate(memorial.fechaNacimiento)} 
                  required 
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "5px", color: "#4b5563" }}>Fecha de Fallecimiento</label>
                <input 
                  type="date" 
                  name="fechaFallecimiento" 
                  defaultValue={formatInputDate(memorial.fechaFallecimiento)} 
                  required 
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "5px", color: "#4b5563" }}>Cliente / Familiar Asignado</label>
              <select 
                name="clienteId" 
                defaultValue={memorial.clienteId || ""}
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box", background: "white" }}
              >
                <option value="">Sin cliente asignado</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre} ({c.telefono || "Sin teléfono"})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "5px", color: "#4b5563" }}>Biografía / Mensaje</label>
              <textarea 
                name="biografia" 
                rows={3}
                defaultValue={memorial.biografia || ""} 
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
              />
            </div>

            <button 
              type="submit" 
              style={{ background: "#2563eb", color: "white", border: "none", padding: "12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
            >
              Guardar Cambios
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}