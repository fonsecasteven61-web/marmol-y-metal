"use client";

import { useState } from "react";
import SubidorArchivo from "./SubidorArchivo";
import { crearMemorial } from "@/app/admin/memoriales/actions";

export default function FormularioMemorial({ clientes = [] }: { clientes?: any[] }) {
  const [fotoUrl, setFotoUrl] = useState("");
  const [fotoPortadaUrl, setFotoPortadaUrl] = useState("");
  const [musicaUrl, setMusicaUrl] = useState("");

  return (
    <div style={{ background: "white", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
      <h3 style={{ margin: "0 0 20px 0", color: "#374151" }}>Registrar Nuevo Memorial</h3>
      
      <form action={crearMemorial} style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <input type="hidden" name="fotoPrincipal" value={fotoUrl} />
        <input type="hidden" name="fotoPortada" value={fotoPortadaUrl} />
        <input type="hidden" name="musicaUrl" value={musicaUrl} />

        <input 
          type="text" 
          name="nombreDifunto" 
          placeholder="Nombre del Difunto *" 
          required
          style={{ flex: 2, minWidth: "220px", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
        />
        
        <div style={{ flex: 1, minWidth: "180px" }}>
          <label style={{ fontSize: "0.8rem", color: "#666", display: "block", marginBottom: "4px" }}>Cliente / Familiar (Opcional)</label>
          <select 
            name="clienteId" 
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
          >
            <option value="">-- Sin cliente asignado --</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre} ({c.telefono})
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1, minWidth: "150px" }}>
          <label style={{ fontSize: "0.8rem", color: "#666", display: "block", marginBottom: "4px" }}>Nacimiento *</label>
          <input 
            type="date" 
            name="fechaNacimiento" 
            required
            style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
          />
        </div>
        
        <div style={{ flex: 1, minWidth: "150px" }}>
          <label style={{ fontSize: "0.8rem", color: "#666", display: "block", marginBottom: "4px" }}>Fallecimiento *</label>
          <input 
            type="date" 
            name="fechaFallecimiento" 
            required
            style={{ width: "100%", padding: "9px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
          />
        </div>

        {/* Sección de Subida de Archivos Multimedia */}
        <div style={{ width: "100%", display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "10px" }}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <SubidorArchivo 
              label="Foto Principal del Memorial (Circular)" 
              tipo="image" 
              onUploadSuccess={(url) => setFotoUrl(url)} 
            />
            {fotoUrl && <p style={{ fontSize: "0.8rem", color: "#16a34a", marginTop: "4px" }}>¡Foto principal cargada!</p>}
          </div>

          <div style={{ flex: 1, minWidth: "250px" }}>
            <SubidorArchivo 
              label="Foto de Portada (Cabecera)" 
              tipo="image" 
              onUploadSuccess={(url) => setFotoPortadaUrl(url)} 
            />
            {fotoPortadaUrl && <p style={{ fontSize: "0.8rem", color: "#16a34a", marginTop: "4px" }}>¡Portada cargada!</p>}
          </div>

          <div style={{ flex: 1, minWidth: "250px" }}>
            <SubidorArchivo 
              label="Música de Fondo (MP3 Opcional)" 
              tipo="audio" 
              onUploadSuccess={(url) => setMusicaUrl(url)} 
            />
            {musicaUrl && <p style={{ fontSize: "0.8rem", color: "#16a34a", marginTop: "4px" }}>¡Audio cargado!</p>}
          </div>
        </div>

        {/* Nuevos Campos de Ubicación Guiada */}
        <div style={{ width: "100%", display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "10px" }}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontSize: "0.8rem", color: "#666", display: "block", marginBottom: "4px" }}>Lugar / Cementerio (Ubicación Texto)</label>
            <input 
              type="text" 
              name="ubicacionTexto" 
              placeholder="Ej. Cementerio Jardines de Paz, Nicho 14"
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
            />
          </div>

          <div style={{ flex: 1, minWidth: "250px" }}>
            <label style={{ fontSize: "0.8rem", color: "#666", display: "block", marginBottom: "4px" }}>Enlace de Google Maps / Waze (URL)</label>
            <input 
              type="url" 
              name="ubicacionUrl" 
              placeholder="Ej. https://maps.app.goo.gl/..."
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
            />
          </div>
        </div>
        
        <div style={{ width: "100%", marginTop: "10px" }}>
          <label style={{ fontSize: "0.8rem", color: "#666", display: "block", marginBottom: "4px" }}>Semblanza y Legado (Biografía detallada)</label>
          <textarea 
            name="biografia" 
            placeholder="Escribe la historia de vida, semblanza o legado que aparecerá en el memorial..." 
            rows={4}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff", resize: "vertical" }}
          />
        </div>
        
        <button 
          type="submit" 
          style={{ background: "#2563eb", color: "white", border: "none", padding: "12px 20px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", width: "100%", marginTop: "10px" }}
        >
          Guardar Memorial en Base de Datos
        </button>
      </form>
    </div>
  );
}
