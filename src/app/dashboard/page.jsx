"use client";
import { useState, useEffect } from "react";
import { UserTables } from "@/components/UserTables";
import { signOut } from "next-auth/react";

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
        // Asignamos 'data' directamente a 'users'
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
      username:user.username,
      email: user.email,
      password: "",
      rol: user.rol,
    });
  };

  // Guardar cambios de usuario
  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/user?dni=${editedUser.username}`, {
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
          prevUsers.map((u) => (u.id === editingUserId ? updatedUser : u))
        );
        setEditingUserId(null); // Finalizar la edición
      } else {
        const errorText = await response.text();
        if (errorText) {
          try {
            const errorData = JSON.parse(errorText);
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
    <section className="flex flex-col justify-center mx-5 xl:mx-10 min-h-[100vh]">
      <UserTables users={users} handleEditClick={handleEditClick} />

      {editingUserId && (
        <div className="mt-4 p-4 border border-gray-300 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Editar Usuario</h2>
          <label className="block mb-2">
            Correo:
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="block mb-2">
            Contraseña:
            <input
              type="password"
              name="password"
              value={editedUser.password}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="block mb-2">
            Rol:
            <input
              type="text"
              name="rol"
              value={editedUser.rol}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <button
            onClick={handleSaveClick}
            className="bg-babyblue hover:bg-blue-300 text-white p-2 rounded mt-2"
          >
            Guardar Cambios
          </button>
          <button
            onClick={() => setEditingUserId(null)}
            className="bg-gray-500 text-white p-2 rounded mt-2 ml-2"
          >
            Cancelar
          </button>
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
