"use client"
import { signOut } from "next-auth/react"

const LogoutPage = () => {
  return (
<section className="h-[calc(100vh-7rem)] flex justify-center items-center">
    <div>
    <h1 className="text-white text-5xl ">¿Seguro de cerrar sesión?</h1>
    <button className="bg-white text-black px-4 py-2 rounded-md mt-4" onClick={()=>signOut()}>Cerrar sesión</button>
    </div>
</section>
  )
}

export default LogoutPage