import Link from "next/link";
import Image from 'next/image';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <header className="bg-babyblue flex justify-center py-3">
    <nav className="flex justify-center items-center  text-white py-3 md:px-24 w-[2000px]">
      <div className="flex items-center mr-10 md:mr-auto">
        {/* Logo visible en todos los tamaños */}
        <Link href="/">
        <Image src="/logo.png" alt="alt" width={64} height={64} className="mx-2" />
        </Link>

        {/* Texto "Recuerdame" solo visible en pantallas medianas o más grandes */}
        <h1 className="text-3xl font-bold hidden md:block ">Recuerdame</h1>
      </div>

      {/* Enlaces de navegación, visibles solo en pantallas medianas o más grandes */}
      <ul className="gap-x-8 flex flex-col lg:flex-row" >
        {!session?.user ? (
          <>
            <li>
              <Link href="/" className="hover:text-sky-100 text-[1rem] md:text-[20px]">Inicio</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-sky-100 text-[1rem] md:text-[20px]">Contáctanos</Link>
            </li>
            <li className=" mt-4 mr-4 lg:mt-0 ">
              <Link href="/auth/login" className="hover:text-sky-100 text-[1rem] md:text-[20px] bg-primary px-6 py-4 rounded-3xl">Iniciar sesión</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/dashboard" className="hover:text-sky-100">Dashboard</Link>
            </li>
            <li>
              <Link href="/auth/register" className="hover:text-sky-100">Registrar</Link>
            </li>
            <li>
              <Link href="/api/auth/signout" className="hover:text-sky-100">Salir</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
    </header>
  );
}

export default Navbar;
