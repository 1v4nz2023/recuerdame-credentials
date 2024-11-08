import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        // Buscamos al usuario solo por email
        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Si no encuentra el usuario, lanzamos un error
        if (!userFound) throw new Error("Usuario no encontrado");

        console.log(userFound);
        if (userFound.estado !== "activo")
          throw new Error("Acceso denegado: este usuario no esta activo");
        // Verificamos la contraseña
        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        // Si la contraseña no coincide, lanzamos un error
        if (!matchPassword) throw new Error("Contraseña incorrecta");
        // Si el usuario existe pero no tiene rol de admin, lanzamos un error
        if (userFound.rol !== "admin")
          throw new Error("Acceso denegado: es usuario no tiene privilegios de administrador");
        // Si todo es correcto, retornamos los datos del usuario autenticado
        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
