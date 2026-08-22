"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface SubidorProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
  tipo?: "image" | "video" | "auto";
}

export default function SubidorArchivo({ onUploadSuccess, label = "Subir Archivo", tipo = "image" }: SubidorProps) {
  const [urlSubida, setUrlSubida] = useState<string>("");

  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ fontSize: "0.85rem", color: "#4b5563", display: "block", marginBottom: "5px", fontWeight: "bold" }}>
        {label}
      </label>
      
      <CldUploadWidget 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "marmolymetal_preset"}
        options={{ resourceType: tipo }}
        onSuccess={(result: any) => {
          const secureUrl = result?.info?.secure_url;
          if (secureUrl) {
            setUrlSubida(secureUrl);
            onUploadSuccess(secureUrl);
          }
        }}
      >
        {({ open }) => {
          return (
            <button 
              type="button"
              onClick={() => open()} 
              style={{ background: "#4f46e5", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "bold" }}
            >
              {urlSubida ? "Archivo cargado con éxito ✓" : "Seleccionar archivo"}
            </button>
          );
        }}
      </CldUploadWidget>

      {urlSubida && (
        <input type="hidden" name="urlFinal" value={urlSubida} />
      )}
    </div>
  );
}