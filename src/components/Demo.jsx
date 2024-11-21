import Image from "next/image";

export const Demo = () => {
  return (
    <section className="bg-babyblue mt-2 pt-1 pb-10">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[2rem] xl:text-[3.5rem] text-center font-bold text-white my-10">
          ¿Cómo funciona?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="mx-auto ">
            <h3 className="text-[1rem] xl:text-[2rem] text-center font-bold text-white my-5">
              1. Inicia sesión{" "}
            </h3>
            <Image
              alt="login"
              width={360}
              height={800}
              src="/login.png"
              className="w-full max-w-[200px] sm:max-w-[360px]"
            />
          </div>
          <div className="mx-auto">
            <h3 className="text-[1rem] xl:text-[2rem] text-center font-bold text-white my-5">
              2. Añade tu receta{" "}
            </h3>
            <Image
              alt="app"
              width={360}
              height={800}
              src="/app.png"
              className="w-full max-w-[200px] sm:max-w-[360px]"
            />
          </div>
          <div className="mx-auto">
            <h3 className="text-[1rem] xl:text-[2rem] text-center font-bold text-white my-5">
              3. Recibe las alertas
            </h3>
            <Image
              alt="alert"
              width={360}
              height={800}
              src="/alert.png"
              className="w-full max-w-[200px] sm:max-w-[360px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
