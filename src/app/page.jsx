import Image from "next/image";
import Link from "next/link";
Link;
const Homepage = () => {
  return (
    <main className="h-[calc(100vh-7rem)] flex justify-center items-center mx-auto py-20">
      <section className="grid grid-cols-2 gap-4 m-2">
        <div className="p-6 border  bg-babyblue border-babyblue rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1 justify-center items-center hover:bg-secondary">
        <span className="text-[1rem] md:text-[2rem] text-white py-2">
            Descarga la app
          </span>
          <Link href="https://play.google.com/store/games?hl=es_419&pli=1" target="_blank">
            <Image
              src="/stores.jpg"
              alt="tiendas"
              width={350}
              height={100}
              className="rounded-md"
            />
          </Link>       
        </div>
        <div className="p-6 border  bg-babyblue border-babyblue rounded-[12px] flex flex-col gap-1 col-span-1 row-span-1 justify-center items-center  hover:bg-secondary" >
        <span className="text-[1rem] md:text-[2rem] text-white py-2">
           ¿Necesitas ayuda?
          </span>
          <Link href="https://wa.me/51933298821" target="_blank">
            <Image
              src="/wsp.png"
              alt="locales"
              layout="fit"
              width={200}
              height={200}
              className="rounded-md"
            />
          </Link>
        </div>

        <div className="p-6 border  bg-babyblue border-babyblue rounded-[12px] flex flex-col gap-1 col-span-2 row-span-1  hover:bg-secondary">
        <span className="text-[1rem] md:text-[2rem] text-white py-2">
            Servicios
          </span>
          <Link href="https://web.sisol.gob.pe/donde-me-atiendo/" target="_blank">
            <Image
              src="/servicios.png"
              alt="servicios"
              layout="responsive"
              width={800}
              height={800}
              className="rounded-md"
            />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
