import db from "@/libs/db"; // Importa tu conexión a la base de datos
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Obtenemos los datos del body

    // Validamos que ambos campos se hayan proporcionado
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Por favor, ingrese email y contraseña" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Buscamos el usuario en la base de datos
    const userFound = await db.user.findUnique({
      where: { email },
    });

    // Si el usuario no existe o no está activo, devolvemos un mensaje de error
    if (!userFound || userFound.estado !== "activo") {
      return new Response(
        JSON.stringify({ message: "Acceso denegado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verificamos la contraseña
    const matchPassword = await bcrypt.compare(password, userFound.password);

    if (!matchPassword) {
      return new Response(
        JSON.stringify({ message: "Acceso denegado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Creamos una variable de acceso simple y añadimos el nombre del usuario a la respuesta
    const accessVariable = `access_${userFound.id}_${Date.now()}`;

    return new Response(
      JSON.stringify({
        message: "Acceso concedido",
        accessVariable,
        nombre: userFound.nombres, // Incluimos el nombre del usuario
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
