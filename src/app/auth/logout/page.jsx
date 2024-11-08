"use client"
import { signOut } from "next-auth/react"
import Link from "next/link";


const LogoutPage = () => {
  return (
<section className="h-[calc(100vh-7rem)] flex justify-center items-center">
    <div className="flex flex-col items-center justify-center">
    <h1 className="text-primary text-5xl text-center">¿Seguro de cerrar sesión?</h1>
    <div>
    <button className="bg-primary hover:bg-babyblue text-white  px-4 py-2 rounded-md mt-4 mx-2" onClick={()=>signOut()}>Cerrar sesión</button>
    <Link href="/dashboard" className="bg-babyblue hover:bg-primary text-white  px-4 py-2 rounded-md mt-4 mx-2">Volver</Link>
    </div>


    </div>
</section>
  )
}

export default LogoutPage