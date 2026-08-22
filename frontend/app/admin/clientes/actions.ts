"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function crearCliente(formData: FormData) {
  const nombre = formData.get("nombre") as string;
  const telefono = formData.get("telefono") as string;
  const correo = formData.get("correo") as string;
  const direccion = formData.get("direccion") as string;

  if (!nombre || !telefono) {
    throw new Error("El nombre y el teléfono son obligatorios.");
  }

  try {
    await prisma.cliente.create({
      data: {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        correo: correo && correo.trim() !== "" ? correo.trim() : null,
        direccion: direccion && direccion.trim() !== "" ? direccion.trim() : null,
      },
    });

    revalidatePath("/admin/clientes");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error al crear cliente:", error);
    throw new Error("No se pudo guardar el cliente en la base de datos.");
  }
}

export async function actualizarCliente(formData: FormData) {
  const id = formData.get("id") as string;
  const nombre = formData.get("nombre") as string;
  const telefono = formData.get("telefono") as string;
  const correo = formData.get("correo") as string;
  const direccion = formData.get("direccion") as string;

  if (!id || !nombre || !telefono) {
    throw new Error("El ID, nombre y teléfono son obligatorios.");
  }

  try {
    await prisma.cliente.update({
      where: { id },
      data: {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        correo: correo && correo.trim() !== "" ? correo.trim() : null,
        direccion: direccion && direccion.trim() !== "" ? direccion.trim() : null,
      },
    });

    revalidatePath("/admin/clientes");
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    throw new Error("No se pudo actualizar el cliente.");
  }
}

export async function eliminarCliente(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("ID de cliente no válido.");
  }

  try {
    await prisma.cliente.delete({
      where: { id },
    });

    revalidatePath("/admin/clientes");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw new Error("No se pudo eliminar el cliente de la base de datos.");
  }
}