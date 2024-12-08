"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return Swal.fire({
        title: "Error de registro",
        text: "Las contraseñas no coinciden",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    // Definir el objeto de datos a enviar
    const requestBody = {
      username: data.username,
      email: data.email,
      password: data.password,
      rol: "client",
      estado: "activo",
      nombres: data.nombres,
    };

    try {
      // Primera solicitud al API interno
      const resInternal = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Verificar la respuesta del API interno
      if (!resInternal.ok) {
        const errorData = await resInternal.json();
        return Swal.fire({
          title: "Error",
          text: errorData.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      // Segunda solicitud al API externo0
      const resExternal = await fetch("https://proyectosawscertus2025.lat/api/user", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Verificar la respuesta del API externo
      if (!resExternal.ok) {
        const errorData = await resExternal.json();
        return Swal.fire({
          title: "Error",
          text: errorData.message || "Error al registrar en el servidor externo",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      // Registro exitoso en ambos APIs
      Swal.fire({
        title: "Registro exitoso",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/dashboard");
        }
      });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un problema al registrar. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  });

  return (
    <div className="h-[100vh] flex justify-center items-center sm:my-10 my-20">
      <form onSubmit={onSubmit} className="w-1/2 xl:w-1/4">
        <h1 className="text-primary font-bold text-2xl xl:text-4xl mb-4">
          Registrar
        </h1>

        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          DNI de usuario:
        </label>
        <input
          type="number"
          {...register("username", {
            required: {
              value: true,
              message: "El dni de usuario es requerido",
            },
            pattern: {
              value: /^[0-9]{8}$/,
              message: "El DNI debe tener 8 dígitos",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-white w-full"
          placeholder="DNI"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">{errors.username.message}</span>
        )}

        <label htmlFor="nombres" className="text-slate-500 mb-2 block text-sm">
          Nombres de usuario:
        </label>
        <input
          type="text"
          {...register("nombres", {
            required: {
              value: true,
              message: "Los nombres de usuario son requeridos",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Por favor ingrese un nombre válido",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-white w-full"
          placeholder="Nombres"
        />
        {errors.nombres && (
          <span className="text-red-500 text-sm">{errors.nombres.message}</span>
        )}

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Correo:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Por favor ingrese un correo válido",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Por favor ingrese un correo electrónico válido",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-white w-full"
          placeholder="user@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Contraseña:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Por favor ingrese una contraseña",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-white w-full"
          placeholder="********"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirma la contraseña:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Por favor confirme su contraseña",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-white w-full"
          placeholder="********"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}

        <button className="w-full bg-babyblue text-white p-3 rounded-lg mt-2 hover:bg-sky-700">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
