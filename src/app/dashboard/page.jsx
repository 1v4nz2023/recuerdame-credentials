"use client";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { UserTables } from "@/components/UserTables";
const DashboardPage = () => {
  const [users, setUsers] = useState([]); // Aseguramos que 'users' esté inicializado como un array vacío
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    email: "",
    password: "",
    rol: "",
  });

  // Obtener todos los usuarios al cargar el componente
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        // Asignamos 'data' directamente a 'users' en lugar de 'data.users'
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  // Manejar cambios en los campos editados
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  // Iniciar la edición de un usuario
  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUser({
      email: user.email,
      password: "",
      rol: user.rol,
    });
  };

  // Guardar cambios de usuario
  const handleSaveClick = async (user) => {
    try {
      const response = await fetch(`/api/user?dni=${user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        // Si la respuesta es válida, actualizamos la lista de usuarios con los datos actualizados
        const updatedUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? updatedUser : u))
        );
        setEditingUserId(null);
      } else {
        // Verificar si hay datos en la respuesta antes de hacer JSON.parse
        const errorText = await response.text(); // Obtener el contenido como texto
        if (errorText) {
          try {
            const errorData = JSON.parse(errorText); // Intentar analizarlo como JSON
            console.error("Error updating user:", errorData.message);
          } catch (e) {
            console.error("Error updating user, but response is not in JSON format:", errorText);
          }
        } else {
          console.error("Error updating user, no content in response.");
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div className="w-full max-w-4xl">
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
      </div>
    </section>
  );
};

export default DashboardPage;
