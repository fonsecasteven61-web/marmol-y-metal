"use client";

import { useState, useTransition, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { agregarFotoGaleria, agregarVideoMemorial } from "../actions";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DetalleAdminMemorialPage({ params }: PageProps) {
  // Resolvemos los params usando use()
  const resolvedParams = use(params);
  const memorialId = resolvedParams.id;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Estados para el formulario de Foto
  const [urlImagen, setUrlImagen] = useState("");
  const [descFoto, setDescFoto] = useState("");
  const [subiendoFoto, setSubiendoFoto] = useState(false);

  // Estados para el formulario de Video
  const [urlVideo, setUrlVideo] = useState("");
  const [tituloVideo, setTituloVideo] = useState("");
  const [subiendoVideo, setSubiendoVideo] = useState(false);

  // Función para subir archivos directamente a Cloudinary
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, tipo: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (tipo === "image") setSubiendoFoto(true);
    else setSubiendoVideo(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "marmolymetal_preset");

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "kymwxbyg";
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${tipo}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        if (tipo === "image") {
          setUrlImagen(data.secure_url);
        } else {
          setUrlVideo(data.secure_url);
        }
      } else {
        alert("Error al subir el archivo a Cloudinary.");
      }
    } catch (error) {
      console.error("Error de subida:", error);
      alert("Hubo un error al conectar con el servidor de archivos.");
    } finally {
      if (tipo === "image") setSubiendoFoto(false);
      else setSubiendoVideo(false);
    }
  };

  // Enviar formulario de foto
  const handleGuardarFoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlImagen) return alert("Sube o ingresa una imagen primero.");

    const formData = new FormData();
    formData.append("memorialId", memorialId);
    formData.append("urlImagen", urlImagen);
    formData.append("descripcion", descFoto);

    startTransition(async () => {
      await agregarFotoGaleria(formData);
      setUrlImagen("");
      setDescFoto("");
      router.refresh();
    });
  };

  // Enviar formulario de video
  const handleGuardarVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlVideo) return alert("Sube o ingresa un video primero.");

    const formData = new FormData();
    formData.append("memorialId", memorialId);
    formData.append("urlVideo", urlVideo);
    formData.append("titulo", tituloVideo);

    startTransition(async () => {
      await agregarVideoMemorial(formData);
      setUrlVideo("");
      setTituloVideo("");
      router.refresh();
    });
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#f3f4f6", minHeight: "100vh", color: "#1f2937" }}>
      
      {/* Cabecera */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1 style={{ color: "#111827", fontSize: "2rem", margin: "0 0 8px 0" }}>Administrar Multimedia (Carga Directa)</h1>
          <p style={{ color: "#4b5563", margin: 0 }}>ID de Memorial: {memorialId}</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link 
            href="/admin/memoriales" 
            style={{ background: "#4b5563", color: "white", padding: "10px 16px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", fontSize: "0.9rem" }}
          >
            ← Volver a Memoriales
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "start" }}>
        
        {/* COLUMNA IZQUIERDA: Formularios con subida directa */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          
          {/* Formulario Foto */}
          <div style={{ background: "white", borderRadius: "10px", padding: "25px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#374151", fontSize: "1.2rem" }}>Subir Foto a la Galería</h3>
            
            <form onSubmit={handleGuardarFoto} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "5px", color: "#4b5563" }}>Seleccionar Imagen</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "image")}
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box", background: "#f9fafb" }}
                />
                {subiendoFoto && <p style={{ fontSize: "0.8rem", color: "#2563eb", marginTop: "5px" }}>Subiendo imagen a la nube...</p>}
              </div>

              {urlImagen && (
                <div style={{ fontSize: "0.85rem", color: "#059669", background: "#ecfdf5", padding: "8px", borderRadius: "4px" }}>
                  ✓ Imagen lista para guardar
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "5px", color: "#4b5563" }}>Descripción o Recuerdo (Opcional)</label>
                <input 
                  type="text" 
                  value={descFoto}
                  onChange={(e) => setDescFoto(e.target.value)}
                  placeholder="Ej. Celebración de cumpleaños" 
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box", color: "#000" }}
                />
              </div>

              <button 
                type="submit" 
                disabled={subiendoFoto || !urlImagen || isPending}
                style={{ background: subiendoFoto || !urlImagen ? "#9ca3af" : "#059669", color: "white", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
              >
                {isPending ? "Guardando..." : "+ Guardar Fotografía en la Galería"}
              </button>
            </form>
          </div>

          {/* Formulario Video */}
          <div style={{ background: "white", borderRadius: "10px", padding: "25px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#374151", fontSize: "1.2rem" }}>Subir Video Conmemorativo</h3>
            
            <form onSubmit={handleGuardarVideo} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "5px", color: "#4b5563" }}>Seleccionar Video (MP4)</label>
                <input 
                  type="file" 
                  accept="video/mp4,video/quicktime"
                  onChange={(e) => handleFileUpload(e, "video")}
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box", background: "#f9fafb" }}
                />
                {subiendoVideo && <p style={{ fontSize: "0.8rem", color: "#2563eb", marginTop: "5px" }}>Subiendo video (esto puede tardar unos segundos)...</p>}
              </div>

              {urlVideo && (
                <div style={{ fontSize: "0.85rem", color: "#059669", background: "#ecfdf5", padding: "8px", borderRadius: "4px" }}>
                  ✓ Video listo para guardar
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "5px", color: "#4b5563" }}>Título del Video (Opcional)</label>
                <input 
                  type="text" 
                  value={tituloVideo}
                  onChange={(e) => setTituloVideo(e.target.value)}
                  placeholder="Ej. Palabras en su honor" 
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box", color: "#000" }}
                />
              </div>

              <button 
                type="submit" 
                disabled={subiendoVideo || !urlVideo || isPending}
                style={{ background: subiendoVideo || !urlVideo ? "#9ca3af" : "#059669", color: "white", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
              >
                {isPending ? "Guardando..." : "+ Guardar Video Conmemorativo"}
              </button>
            </form>
          </div>

        </div>

        {/* COLUMNA DERECHA: Instrucción de uso */}
        <div style={{ background: "white", borderRadius: "10px", padding: "25px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 15px 0", color: "#374151", fontSize: "1.2rem" }}>Instrucciones</h3>
          <p style={{ color: "#4b5563", lineHeight: "1.6", fontSize: "0.95rem" }}>
            1. Selecciona la foto o video directamente desde tu computadora o teléfono utilizando los botones de selección.<br/><br/>
            2. Espera a que el sistema indique que el archivo está listo (aparecerá un aviso verde).<br/><br/>
            3. Añade opcionalmente una descripción o título y haz clic en el botón de guardar.<br/><br/>
            4. El contenido se reflejará automáticamente en la página pública del memorial.
          </p>
        </div>

      </div>
    </div>
  );
}