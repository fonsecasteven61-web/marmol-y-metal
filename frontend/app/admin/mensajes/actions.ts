"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function moderarMensaje(formData: FormData) {
  const mensajeId = formData.get("mensajeId") as string;
  const accion = formData.get("accion") as string; // "aprobar", "ocultar" o "eliminar"

  if (!mensajeId || !accion) return;

  try {
    if (accion === "aprobar") {
      await prisma.mensaje.update({
        where: { id: mensajeId },
        data: { aprobado: true },
      });
    } else if (accion === "ocultar") {
      await prisma.mensaje.update({
        where: { id: mensajeId },
        data: { aprobado: false },
      });
    } else if (accion === "eliminar") {
      await prisma.mensaje.delete({
        where: { id: mensajeId },
      });
    }

    // Obtenemos el slug para actualizar también la vista pública del memorial al instante
    const mensajeActualizado = await prisma.mensaje.findUnique({
      where: { id: mensajeId },
      include: { memorial: { select: { slug: true } } },
    });

    revalidatePath("/admin/mensajes");

    if (mensajeActualizado?.memorial?.slug) {
      revalidatePath(`/memorial/${mensajeActualizado.memorial.slug}`);
    }
  } catch (error) {
    console.error("Error al moderar mensaje:", error);
    throw new Error("No se pudo completar la acción de moderación.");
  }
}