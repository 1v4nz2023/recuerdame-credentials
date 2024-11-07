const { NextResponse } = require("next/server");
import db from "@/libs/db";
import bcrypt from "bcrypt";

//BUSCAR USUARIO POR DNI
export const GET = async (req) => {
  try {
    const params = new URL(req.url).searchParams;
    const dni = params.get("dni");
    const usuarioPorDni = await db.user.findUnique({
      where: {
        username: dni,
      },
    });

    if (!usuarioPorDni) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(usuarioPorDni);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

//ACTUALIZAR USUARIO
export const PUT = async (req) => {
  try {
    const dataReceived = await req.json();
    const params = new URL(req.url).searchParams;
    const dni = params.get("dni");
    if (!dni) {
      return NextResponse.json(
        { message: "El parámetro 'dni' es requerido" },
        { status: 400 }
      );
    }

    // const hashedPassword = await bcrypt.hash(dataReceived.password, 10);
    // const updateUser = await db.user.update({
    //   where: {
    //     username: dni,
    //   },
    //   data: {
    //     email: dataReceived.email,
    //     password: hashedPassword,
    //     rol: dataReceived.rol,
    //   },
    // });

    // return NextResponse.json(updateUser);

    const updateUserData = {
        email: dataReceived.email,
        rol: dataReceived.rol,
      };
      
      // Solo agregamos la propiedad password si dataReceived.password es válida
      if (dataReceived.password) {
        updateUserData.password = await bcrypt.hash(dataReceived.password, 10);
      }
      
      const updateUser = await db.user.update({
        where: { username: dni },
        data: updateUserData,
      });
      
      return NextResponse.json(updateUser);
      


  } catch (error) {
    // Si el usuario no se encuentra, Prisma lanzará un error
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Manejo de otros errores
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

//BORRAR USUARIO

export const DELETE = async (req) => {

    try {
        const params = new URL(req.url).searchParams;
        const dni = params.get("dni");
        if (!dni) {
          return NextResponse.json(
            { message: "El parámetro 'dni' es requerido" },
            { status: 400 }
          );
        }
        const deleteUser = await db.user.delete({
          where:{
              username:dni,
          }
        })
      
        return NextResponse.json({message:"Usuario borrado satisfactoriamente",deleteUser})        
    } catch (error) {
          // Si el usuario no se encuentra, Prisma lanzará un error
    if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Usuario no encontrado, no se puede eliminar" },
          { status: 404 }
        );
      }
  
      // Manejo de otros errores
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );  
    }


};
