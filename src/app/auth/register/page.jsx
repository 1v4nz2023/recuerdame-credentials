"use client";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,  
    getValues, 
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // Función para consultar el DNI
  const consultarDni = async () => {
    const dni = getValues("username"); 
    if (!dni || dni.length != 8) {
      return Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un DNI válido',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

    try {
      const res = await fetch("https://api.consultasperu.com/api/v1/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: "f2b4b6603440b08ccf574a20e857127c6f9be1b1e048a59add63e145c9b0201e", 
          type_document: "dni",
          document_number: dni,
        }),
      });

      const responseData = await res.json();

      if (res.ok && responseData.success) {
        const data = responseData.data;
        setValue("nombres", `${data.full_name}`);
        setValue("email", `${data.number}@gmail.com`);

      } else {
        Swal.fire({
          title: 'Error',
          text: responseData.message || 'No se encontraron datos para este DNI',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Error al consultar el DNI:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al consultar los datos del DNI',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return Swal.fire({
        title: 'Error de registro',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        rol: "client",
        estado: "activo",
        nombres: data.nombres,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json(); 

    if (res.ok) {
      Swal.fire({
        title: 'Registro exitoso',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/dashboard");
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: responseData.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  });


  return (
    <div className="h-[100vh] flex justify-center items-center sm:my-10 my-20">
      <form onSubmit={onSubmit} className="w-1/2 xl:w-1/4">
        <h1 className=" text-primary font-bold text-2xl xl:text-4xl mb-4">Registrar</h1>
        
        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          DNI de usuario:
        </label>
        <div className="flex">
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
            className="p-3 rounded-l block mb-2 bg-slate-900 text-white w-full"
            placeholder="DNI"
          />
          <button
            type="button"
            onClick={consultarDni}
          >
            <FaSearch className="text-white text-[3rem] bg-gray-400 hover:bg-gray-500 px-2 mb-2 rounded-r" />
          </button>
        </div>
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
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-white w-full "
          placeholder="Nombres"
          disabled

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

        <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block text-sm">
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
          <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
        )}

        <button className="w-full bg-babyblue text-white p-3 rounded-lg mt-2 hover:bg-sky-700">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
