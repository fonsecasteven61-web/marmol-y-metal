"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function iniciarSesion(formData: FormData) {
  const correo = formData.get("correo") as string;
  const password = formData.get("password") as string;

  if (!correo || !password) {
    throw new Error("El correo y la contraseña son obligatorios.");
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { correo: correo.trim() },
    });

    // Validamos que el usuario exista y que la contraseña coincida con la columna "contrasena"
    if (!usuario || usuario.contrasena !== password) {
      throw new Error("Credenciales inválidas.");
    }

    // Creamos una cookie de sesión segura
    const cookieStore = await cookies();
    cookieStore.set("admin_session", JSON.stringify({ id: usuario.id, rol: usuario.rol }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    });
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    throw new Error("No se pudo iniciar sesión. Verifica tus datos.");
  }

  redirect("/admin");
}

export async function cerrarSesion() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}