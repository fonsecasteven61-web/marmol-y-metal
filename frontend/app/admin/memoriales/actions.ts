"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function crearMemorial(formData: FormData) {
  const nombreDifunto = formData.get("nombreDifunto") as string;
  const fechaNacimientoStr = formData.get("fechaNacimiento") as string;
  const fechaFallecimientoStr = formData.get("fechaFallecimiento") as string;
  const biografia = formData.get("biografia") as string;
  const fotoPrincipal = formData.get("fotoPrincipal") as string;
  const fotoPortada = formData.get("fotoPortada") as string;
  const musicaUrl = formData.get("musicaUrl") as string;
  const clienteId = formData.get("clienteId") as string;
  const ubicacionTexto = formData.get("ubicacionTexto") as string;
  const ubicacionUrl = formData.get("ubicacionUrl") as string;

  if (!nombreDifunto || nombreDifunto.trim() === "") {
    throw new Error("El nombre del difunto es obligatorio.");
  }

  if (!fechaNacimientoStr || !fechaFallecimientoStr) {
    throw new Error("Las fechas de nacimiento y fallecimiento son obligatorias.");
  }

  const slugBase = nombreDifunto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
    
  const slugUnico = `${slugBase}-${Date.now().toString().slice(-4)}`;

  try {
    await prisma.memorial.create({
      data: {
        nombreDifunto: nombreDifunto.trim(),
        fechaNacimiento: new Date(fechaNacimientoStr),
        fechaFallecimiento: new Date(fechaFallecimientoStr),
        biografia: biografia ? biografia.trim() : null,
        fotoPrincipal: fotoPrincipal && fotoPrincipal.trim() !== "" 
          ? fotoPrincipal.trim() 
          : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
        fotoPortada: fotoPortada && fotoPortada.trim() !== "" ? fotoPortada.trim() : null,
        musicaUrl: musicaUrl && musicaUrl.trim() !== "" ? musicaUrl.trim() : null,
        slug: slugUnico,
        activo: true,
        clienteId: clienteId && clienteId.trim() !== "" ? clienteId : null,
        ubicacionTexto: ubicacionTexto && ubicacionTexto.trim() !== "" ? ubicacionTexto.trim() : null,
        ubicacionUrl: ubicacionUrl && ubicacionUrl.trim() !== "" ? ubicacionUrl.trim() : null,
      },
    });

    revalidatePath("/admin/memoriales");
    revalidatePath("/admin/clientes");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Detalle completo del error en Prisma:", error);
    throw new Error("No se pudo guardar el memorial en la base de datos.");
  }

  redirect("/admin/memoriales");
}

export async function actualizarMemorial(formData: FormData) {
  const id = formData.get("id") as string;
  const nombreDifunto = formData.get("nombreDifunto") as string;
  const fechaNacimientoStr = formData.get("fechaNacimiento") as string;
  const fechaFallecimientoStr = formData.get("fechaFallecimiento") as string;
  const biografia = formData.get("biografia") as string;
  const clienteId = formData.get("clienteId") as string;
  const ubicacionTexto = formData.get("ubicacionTexto") as string;
  const ubicacionUrl = formData.get("ubicacionUrl") as string;

  if (!id || !nombreDifunto || nombreDifunto.trim() === "") {
    throw new Error("El ID y el nombre del difunto son obligatorios.");
  }

  if (!fechaNacimientoStr || !fechaFallecimientoStr) {
    throw new Error("Las fechas de nacimiento y fallecimiento son obligatorias.");
  }

  try {
    await prisma.memorial.update({
      where: { id },
      data: {
        nombreDifunto: nombreDifunto.trim(),
        fechaNacimiento: new Date(fechaNacimientoStr),
        fechaFallecimiento: new Date(fechaFallecimientoStr),
        biografia: biografia ? biografia.trim() : null,
        clienteId: clienteId && clienteId.trim() !== "" ? clienteId : null,
        ubicacionTexto: ubicacionTexto && ubicacionTexto.trim() !== "" ? ubicacionTexto.trim() : null,
        ubicacionUrl: ubicacionUrl && ubicacionUrl.trim() !== "" ? ubicacionUrl.trim() : null,
      },
    });

    revalidatePath("/admin/memoriales");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error detallado al actualizar el memorial:", error);
    throw new Error("No se pudo actualizar el memorial en la base de datos.");
  }

  redirect("/admin/memoriales");
}

export async function eliminarMemorial(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("ID de memorial no válido.");
  }

  try {
    await prisma.memorial.delete({
      where: { id },
    });

    revalidatePath("/admin/memoriales");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error al eliminar el memorial:", error);
    throw new Error("No se pudo eliminar el memorial de la base de datos.");
  }
}

export async function agregarFotoGaleria(formData: FormData) {
  const memorialId = formData.get("memorialId") as string;
  const urlImagen = formData.get("urlImagen") as string;
  const descripcion = formData.get("descripcion") as string;

  if (!memorialId || !urlImagen) {
    throw new Error("La imagen y el memorial son obligatorios.");
  }

  try {
    await prisma.fotografia.create({
      data: {
        memorialId,
        urlImagen: urlImagen.trim(),
        descripcion: descripcion ? descripcion.trim() : null,
      },
    });

    revalidatePath("/admin/memoriales");
  } catch (error) {
    console.error("Error al agregar foto a la galería:", error);
    throw new Error("No se pudo guardar la fotografía.");
  }
}

export async function agregarVideoMemorial(formData: FormData) {
  const memorialId = formData.get("memorialId") as string;
  const urlVideo = formData.get("urlVideo") as string;
  const titulo = formData.get("titulo") as string;

  if (!memorialId || !urlVideo) {
    throw new Error("El video y el memorial son obligatorios.");
  }

  try {
    await prisma.video.create({
      data: {
        memorialId,
        urlVideo: urlVideo.trim(),
        titulo: titulo ? titulo.trim() : null,
      },
    });

    revalidatePath("/admin/memoriales");
  } catch (error) {
    console.error("Error al agregar video:", error);
    throw new Error("No se pudo guardar el video.");
  }
}