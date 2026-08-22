import { iniciarSesion } from "./actions";

export default function AdminLoginPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f3f4f6", fontFamily: "sans-serif" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "1.8rem", color: "#111827", margin: "0 0 8px 0" }}>Panel de Control</h1>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "0.95rem" }}>Mármol y Metal — Acceso Administrativo</p>
        </div>

        <form action={iniciarSesion} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#374151", marginBottom: "5px", fontWeight: "bold" }}>Correo electrónico</label>
            <input 
              type="email" 
              name="correo" 
              placeholder="admin@marmolymetal.com" 
              required 
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#374151", marginBottom: "5px", fontWeight: "bold" }}>Contraseña</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              required 
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff", boxSizing: "border-box" }}
            />
          </div>

          <button 
            type="submit" 
            style={{ background: "#2563eb", color: "white", border: "none", padding: "12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", marginTop: "10px", fontSize: "1rem" }}
          >
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
}