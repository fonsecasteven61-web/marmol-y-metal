import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { enviarMensajeCondolencia } from "./actions";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function MemorialPublicoPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const memorial = await prisma.memorial.findUnique({
    where: { slug },
    include: {
      fotografias: { orderBy: { orden: "asc" } },
      videos: true,
      mensajes: {
        where: { aprobado: true },
        orderBy: { fecha: "desc" },
      },
    },
  }).catch(() => null);

  if (!memorial) {
    notFound();
  }

  return (
    <div style={{ fontFamily: "Georgia, serif", backgroundColor: "#f3f4f6", minHeight: "100vh", paddingBottom: "60px", color: "#1f2937" }}>
      
      {/* 1. Foto de Portada o Cabecera Solemne */}
      <div style={{ 
        position: "relative", 
        width: "100%", 
        height: "280px", 
        backgroundImage: memorial.fotoPortada ? `url(${memorial.fotoPortada})` : "linear-gradient(to right, #1f2937, #374151)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center"
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.4)" }}></div>
        
        {/* Reproductor de Música de Fondo (si está activa) */}
        {memorial.musicaActiva && memorial.musicaUrl && (
          <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 10, background: "rgba(0, 0, 0, 0.6)", padding: "8px 15px", borderRadius: "20px", backdropFilter: "blur(5px)" }}>
            <audio controls autoPlay loop style={{ height: "30px", width: "200px" }}>
              <source src={memorial.musicaUrl} type="audio/mpeg" />
              Tu navegador no soporta audio.
            </audio>
          </div>
        )}
      </div>

      <div style={{ maxWidth: "800px", margin: "-60px auto 0 auto", padding: "0 20px", position: "relative", zIndex: 2 }}>
        
        {/* 2. Tarjeta Principal con Foto, Nombres y Fechas */}
        <div style={{ background: "white", borderRadius: "12px", padding: "40px 30px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", textAlign: "center", marginBottom: "30px", borderTop: "5px solid #4b5563" }}>
          {memorial.fotoPrincipal && (
            <img 
              src={memorial.fotoPrincipal} 
              alt={memorial.nombreDifunto} 
              style={{ width: "160px", height: "160px", objectFit: "cover", borderRadius: "50%", margin: "0 auto 20px auto", border: "5px solid white", boxShadow: "0 4px 10px rgba(0,0,0,0.15)" }}
            />
          )}
          
          <h1 style={{ fontSize: "2.3rem", margin: "0 0 10px 0", color: "#111827", fontWeight: "normal" }}>{memorial.nombreDifunto}</h1>
          <p style={{ fontSize: "1.1rem", color: "#6b7280", margin: "0 0 25px 0", fontStyle: "italic" }}>
            {new Date(memorial.fechaNacimiento).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })} 
            {" — "} 
            {new Date(memorial.fechaFallecimiento).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "20px 0" }} />

          <h3 style={{ color: "#374151", marginBottom: "15px", fontSize: "1.3rem" }}>Semblanza y Legado</h3>
          <p style={{ color: "#4b5563", lineHeight: "1.8", fontSize: "1.05rem", whiteSpace: "pre-line" }}>
            {memorial.biografia || "Recordando su legado con amor y respeto eterno."}
          </p>
        </div>

        {/* 3. Galería de Fotografías (Actualizada con object-fit para evitar recortes extraños) */}
        {memorial.fotografias && memorial.fotografias.length > 0 && (
          <div style={{ background: "white", borderRadius: "12px", padding: "30px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
            <h3 style={{ color: "#374151", marginBottom: "20px", fontSize: "1.3rem" }}>Galería de Fotografías</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
              {memorial.fotografias.map((foto: any) => (
                <div key={foto.id} style={{ borderRadius: "12px", overflow: "hidden", background: "#f9f9f9", border: "1px solid #e5e7eb", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                  <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                    <img 
                      src={foto.urlImagen} 
                      alt={foto.descripcion || "Recuerdo"} 
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }} 
                    />
                  </div>
                  {foto.descripcion && <p style={{ padding: "12px", fontSize: "0.85rem", color: "#4b5563", margin: 0 }}>{foto.descripcion}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Sección de Videos */}
        {memorial.videos && memorial.videos.length > 0 && (
          <div style={{ background: "white", borderRadius: "12px", padding: "30px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
            <h3 style={{ color: "#374151", marginBottom: "20px", fontSize: "1.3rem" }}>Videos Conmemorativos</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {memorial.videos.map((vid: any) => (
                <div key={vid.id} style={{ borderRadius: "8px", overflow: "hidden", background: "#000" }}>
                  <video controls style={{ width: "100%", height: "200px", display: "block" }}>
                    <source src={vid.urlVideo} type="video/mp4" />
                    Tu navegador no soporta la reproducción de videos.
                  </video>
                  {vid.titulo && <p style={{ padding: "10px", fontSize: "0.9rem", color: "#fff", margin: 0, background: "#1f2937" }}>{vid.titulo}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4.5. Sección de Ubicación Guiada */}
        {memorial.ubicacionUrl && (
          <div style={{ background: "white", borderRadius: "12px", padding: "30px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", marginBottom: "30px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <h3 style={{ color: "#374151", margin: "0 0 5px 0", fontSize: "1.3rem" }}>Ubicación Guiada 📍</h3>
              <p style={{ color: "#4b5563", margin: 0, fontSize: "1rem" }}>
                {memorial.ubicacionTexto || "Consulta el mapa exacto para llegar al monumento o nicho."}
              </p>
            </div>
            <a 
              href={memorial.ubicacionUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                backgroundColor: "#0e6251", 
                color: "white", 
                padding: "10px 20px", 
                borderRadius: "8px", 
                textDecoration: "none", 
                fontWeight: "bold", 
                fontSize: "0.95rem",
                boxShadow: "0 4px 10px rgba(14, 98, 81, 0.3)"
              }}
            >
              Abrir Mapa ↗
            </a>
          </div>
        )}

        {/* 5. Libro de Condolencias e Interacción */}
        <div style={{ background: "white", borderRadius: "12px", padding: "30px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
          <h3 style={{ color: "#374151", marginBottom: "20px", fontSize: "1.3rem" }}>Libro de Condolencias</h3>
          
          <form action={enviarMensajeCondolencia} style={{ background: "#f9fafb", padding: "20px", borderRadius: "8px", marginBottom: "30px", border: "1px solid #e5e7eb" }}>
            <input type="hidden" name="memorialId" value={memorial.id} />
            <input type="hidden" name="slug" value={memorial.slug} />
            <h4 style={{ margin: "0 0 15px 0", color: "#374151", fontSize: "1.1rem" }}>Deja unas palabras de aliento</h4>
            
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
              <input 
                type="text" 
                name="nombre" 
                placeholder="Tu nombre completo *" 
                required 
                style={{ flex: 2, minWidth: "200px", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
              />
              <input 
                type="text" 
                name="relacion" 
                placeholder="Relación (Ej. Amigo, Hijo)..." 
                style={{ flex: 1, minWidth: "150px", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff" }}
              />
            </div>
            
            <textarea 
              name="mensaje" 
              placeholder="Escribe tu mensaje de condolencias aquí... (Será visible tras moderación)" 
              required 
              rows={3}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", color: "#000", backgroundColor: "#fff", marginBottom: "10px", resize: "vertical" }}
            />
            
            <button 
              type="submit" 
              style={{ background: "#2563eb", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
            >
              Enviar Condolencia
            </button>
          </form>

          {(!memorial.mensajes || memorial.mensajes.length === 0) ? (
            <p style={{ color: "#6b7280", fontStyle: "italic", textAlign: "center" }}>Aún no hay mensajes públicos publicados.</p>
          ) : (
            memorial.mensajes.map((msg: any) => (
              <div key={msg.id} style={{ borderBottom: "1px solid #e5e7eb", padding: "15px 0" }}>
                <p style={{ margin: "0 0 5px 0", fontWeight: "bold", color: "#111827" }}>
                  {msg.nombre} <span style={{ fontWeight: "normal", color: "#6b7280", fontSize: "0.85rem" }}>({msg.relacion || "Familiar/Amigo"})</span>
                </p>
                <p style={{ margin: 0, color: "#4b5563" }}>{msg.mensaje}</p>
              </div>
            ))
          )}
        </div>

        {/* 6. Botón de Contacto por WhatsApp */}
        <div style={{ background: "white", borderRadius: "12px", padding: "30px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", textAlign: "center" }}>
          <h3 style={{ color: "#374151", marginBottom: "10px", fontSize: "1.2rem" }}>¿Deseas un homenaje similar o información?</h3>
          <p style={{ color: "#6b7280", fontSize: "0.95rem", marginBottom: "20px" }}>
            Ponte en contacto con el equipo de Mármol y Metal para asesorarte con placas, lápidas o servicios memoriales.
          </p>
          <a 
            href={`https://wa.me/50493181006?text=Hola,%20estoy%20viendo%20el%20memorial%20de%20${encodeURIComponent(memorial.nombreDifunto)}%20y%20me%20gustaría%20más%20información.`}
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "inline-block", 
              backgroundColor: "#25d366", 
              color: "white", 
              padding: "12px 24px", 
              borderRadius: "30px", 
              textDecoration: "none", 
              fontWeight: "bold", 
              fontSize: "1rem",
              boxShadow: "0 4px 10px rgba(37, 211, 102, 0.3)"
            }}
          >
            💬 Contactar por WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}