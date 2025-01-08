import Image from "next/image";
import Link from "next/link";
import { Demo } from "@/components/Demo";
const Homepage = () => {
  return (
    <main className="justify-center mx-auto min-h-[100vh]">
      <section id="portada" className="">
        <div className="">
          <div className="grid grid-cols-1 xl:grid-cols-2 text-black">
            <div className="relative">
              <Image
                src="/bg-portada.png"
                alt="alt"
                width={1920}
                height={1080}
              />
              <div className="absolute bottom-[-5px] w-full right-[-2px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="#fff"
                    fillOpacity="1"
                    d="M0,64L12.6,106.7C25.3,149,51,235,76,229.3C101.1,224,126,128,152,117.3C176.8,107,202,181,227,208C252.6,235,278,213,303,192C328.4,171,354,149,379,149.3C404.2,149,429,171,455,197.3C480,224,505,256,531,240C555.8,224,581,160,606,149.3C631.6,139,657,181,682,213.3C707.4,245,733,267,758,245.3C783.2,224,808,160,834,149.3C858.9,139,884,181,909,170.7C934.7,160,960,96,985,74.7C1010.5,53,1036,75,1061,106.7C1086.3,139,1112,181,1137,170.7C1162.1,160,1187,96,1213,80C1237.9,64,1263,96,1288,101.3C1313.7,107,1339,85,1364,69.3C1389.5,53,1415,43,1427,37.3L1440,32L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="p-10 w-[900px]">
                <h2 className=" text-[2rem] xl:text-[3.5rem] text-center font-bold text-primary mb-5">
                  ¿Olvidaste tomar tus medicamentos?
                </h2>
                <p className="text-[1rem] xl:text-[1.5rem] my-5">
                Con Recuerdame2, nunca más te preocupes por olvidar tus medicamentos. Nuestro aplicativo te permite subir tus recetas médicas y programar tus dosis, enviándote notificaciones puntuales para cada toma.
                </p>
                <p className="text-[1rem] xl:text-[1.5rem] my-5">
                Además, es colaborativo: puedes añadir a familiares o amigos para que ellos también reciban alertas y te ayuden a recordar tus dosis importantes. Simplifica el manejo de tus tratamientos y cuida de tu salud de manera más segura y acompañada.
                </p>
                <p className="text-[1rem] xl:text-[1.2rem] my-5">
                Disponible en dispositivos Android y iOS
                </p>
                <div className="flex flex-col lg:flex-row items-center justify-center mt-10">
                  <div>
                    <Image
                      src="/btn-playstore.png"
                      alt="alt"
                      width={5920}
                      height={2064}
                      className="w-full max-w-[200px] sm:max-w-[360px]"

                    />
                  </div>
                  <div>
                    <Image
                      src="/btn-appstore.png"
                      alt="alt"
                      width={5920}
                      height={2064}
                      className="w-full max-w-[200px] sm:max-w-[360px]"

                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
          <Demo/>
      <section className="my-20">
        <h2 className=" text-[2rem] xl:text-[3.5rem] text-center text-primary font-bold my-10">
          Beneficios
        </h2>
        <p className="text-center text-1xl xl:text-3xl mb-5">
          Conoce los beneficios que tendrás con nuestra app!
        </p>
        <div className="grid grid-cols-1 w-[300px] justify-center mx-auto xl:grid-cols-4 xl:w-[1200px] ">
          <div className="card__beneficios shadow-xl mr-0 xl:mr-5">
            <div>
              <div className="card__header">
                <h3 className="mb-5">Soporte Colaborativo</h3>
              </div>
              <div className="card__body">
                <Image
                  className="w-full max-w-[150px] sm:max-w-[360px] mx-auto mb-5"
                  src="/ico-comunidad.png"
                  alt="alt"
                  width={1920}
                  height={1080}
                  
                />
                <p>
                Con Recuerdame, puedes agregar a familiares o amigos para que te ayuden a recordar tus medicamentos en caso de que te olvides.
               </p>
              </div>
            </div>
          </div>
          <div className="card__beneficios shadow-xl mr-0 xl:mr-5">
            <div>
              <div className="card__header">
                <h3 className="mb-5">Notificaciones de Dosis
                </h3>
              </div>
              <div className="card__body">
                <Image
                  className="w-full max-w-[150px] sm:max-w-[360px] mx-auto mb-5"
                  src="/ico-reloj.png"
                  alt="alt"
                  width={1920}
                  height={1080}
                />
                <p>
                Recibe recordatorios puntuales para cada dosis programada, asegurándote de que nunca más olvides tomar tus medicamentos.
              </p>
              </div>
            </div>
          </div>
          <div className="card__beneficios shadow-xl mr-0 xl:mr-5">
            <div>
              <div className="card__header">
                <h3 className="mb-5">Alertas Personalizadas</h3>
              </div>
              <div className="card__body">
                <Image
                  className="w-full max-w-[150px] sm:max-w-[360px] mx-auto mb-5"
                  src="/ico-alarma.png"
                  alt="alt"
                  width={1920}
                  height={1080}
                />
              </div>
              <p>
              Configura las notificaciones según tus necesidades y preferencias, con la tranquilidad de recibir un aviso cuando sea el momento.
              </p>
            </div>
          </div>
          <div className="card__beneficios shadow-xl mr-0 xl:mr-5">
            <div>
              <div className="card__header">
                <h3 className="mb-5">Gestión de Recetas
                </h3>
              </div>
              <div className="card__body">
                <Image
                  className="w-full max-w-[150px] sm:max-w-[360px] mx-auto mb-5"
                  src="/ico-receta.png"
                  alt="alt"
                  width={1920}
                  height={1080}
                />
                <p>
                Guarda y organiza todas tus recetas en un solo lugar, para un acceso fácil y seguro cuando lo necesites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
