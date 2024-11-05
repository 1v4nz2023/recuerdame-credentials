import Link from "next/link";
import Image from 'next/image';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <nav className="flex justify-between items-center bg-babyblue text-white px-6 py-3 md:px-24">
      <div className="flex items-center">
        {/* Logo visible en todos los tamaños */}
        <Image src="/logo.png" alt="alt" width={50} height={50} className="mx-2" />

        {/* Texto "Recuerdame" solo visible en pantallas medianas o más grandes */}
        <h1 className="text-xl font-bold hidden md:block ">Recuerdame</h1>
      </div>

      {/* Enlaces de navegación, visibles solo en pantallas medianas o más grandes */}
      <ul className="flex gap-x-2  md:flex">
        {!session?.user ? (
          <>
            <li>
              <Link href="/" className="hover:text-sky-100 text-[1rem] md:text-[20px]">Inicio</Link>
            </li>
            <li>
              <Link href="/auth/login" className="hover:text-sky-100 text-[1rem] md:text-[20px]">Iniciar sesión</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/dashboard" className="hover:text-sky-100">Dashboard</Link>
            </li>
            <li>
              <Link href="/auth/register" className="hover:text-sky-100">Register</Link>
            </li>
            <li>
              <Link href="/api/auth/signout" className="hover:text-sky-100">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
