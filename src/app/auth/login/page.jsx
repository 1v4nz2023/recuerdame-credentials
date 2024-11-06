"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter()
  const [error, setError] = useState(null)

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect:false,
    });
    if(res.error){
      setError(res.error)
    }else{
      router.push('/dashboard')
      router.refresh()
    }

  });



  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-full mx-10 lg:w-1/4">

        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded">{error}</p>
        )}

        <h1 className="text-primary font-bold text-4xl mb-4">
          Iniciar sesión
        </h1>
        <label htmlFor="email" className="text-primary mb-2 block text-sm">
          Email:
        </label>
        <input
          type="text"
          {...register("email", {
            required: {
              value: true,
              message: "El nombre de correo es requerido",
            },
          })}
          className="p-3 rounded block mb-2 bg-primary text-white w-full"
          placeholder="user@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">
            {errors.email.message}
          </span>
        )}
        <label htmlFor="password" className="text-primary mb-2 block text-sm">
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
          className="p-3 rounded block mb-2 bg-primary text-white w-full"
          placeholder="********"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
        <button className="w-full bg-babyblue text-white p-3 rounded-lg mt-2 hover:bg-sky-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
