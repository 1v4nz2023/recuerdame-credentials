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


      {/* <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard - Lista de Usuarios</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Email</th>
              <th className="border p-2">Password</th>
              <th className="border p-2">Rol</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">
                    {editingUserId === user.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        className="w-full border p-1"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="border p-2">
                    {editingUserId === user.id ? (
                      <input
                        type="password"
                        name="password"
                        value={editedUser.password}
                        onChange={handleInputChange}
                        className="w-full border p-1"
                      />
                    ) : (
                      "********" // No mostramos la contraseña real
                    )}
                  </td>
                  <td className="border p-2">
                    {editingUserId === user.id ? (
                      <select
                        name="rol"
                        value={editedUser.rol}
                        onChange={handleInputChange}
                        className="w-full border p-1"
                      >
                        <option value="admin">Administrador</option>
                        <option value="client">Paciente</option>
                      </select>
                    ) : (
                      user.rol
                    )}
                  </td>
                  <td className="border p-2">
                    {editingUserId === user.id ? (
                      <button
                        onClick={() => handleSaveClick(user)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No hay usuarios disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-center mt-6">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </div> */}