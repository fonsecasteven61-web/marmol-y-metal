"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function enviarMensajeCondolencia(formData: FormData) {
  const memorialId = formData.get("memorialId") as string;
  const slug = formData.get("slug") as string;
  const nombre = formData.get("nombre") as string;
  const relacion = formData.get("relacion") as string;
  const mensaje = formData.get("mensaje") as string;

  if (!nombre || !mensaje || !memorialId) {
    throw new Error("El nombre y el mensaje son obligatorios.");
  }

  try {
    await prisma.mensaje.create({
      data: {
        memorialId,
        nombre: nombre.trim(),
        relacion: relacion ? relacion.trim() : null,
        mensaje: mensaje.trim(),
        aprobado: false, // Entra desaprobado por defecto para moderación en el panel admin
      },
    });

    revalidatePath(`/memorial/${slug}`);
  } catch (error) {
    console.error("Error al guardar mensaje:", error);
    throw new Error("No se pudo enviar el mensaje.");
  }
}

export async function agregarFotoGaleria(formData: FormData) {
  const memorialId = formData.get("memorialId") as string;
  const slug = formData.get("slug") as string;
  const urlImagen = formData.get("urlImagen") as string;
  const descripcion = formData.get("descripcion") as string;

  if (!urlImagen || !memorialId) {
    throw new Error("La URL de la imagen es obligatoria.");
  }

  try {
    await prisma.fotografia.create({
      data: {
        memorialId,
        urlImagen: urlImagen.trim(),
        descripcion: descripcion ? descripcion.trim() : null,
      },
    });

    revalidatePath(`/memorial/${slug}`);
  } catch (error) {
    console.error("Error al guardar foto:", error);
    throw new Error("No se pudo agregar la fotografía.");
  }
}

export async function encenderVela(formData: FormData) {
  const memorialId = formData.get("memorialId") as string;
  const slug = formData.get("slug") as string;

  if (!memorialId) return;

  try {
    await prisma.memorial.update({
      where: { id: memorialId },
      data: {
        velasContador: {
          increment: 1,
        },
      },
    });

    revalidatePath(`/memorial/${slug}`);
  } catch (error) {
    console.error("Error al encender vela:", error);
  }
}