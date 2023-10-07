import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { usePublicidadesStore } from "../../hooks";
import gsap from 'gsap';
import './ReproduccionesPage.css';
import { usePublicidadesProductosStore } from "../../hooks/usePublicidadesProductos";
import { Spinner } from "@nextui-org/react";

const urlImagenes = 'uploads/imagenes';

export const ReproduccionesPage = () => {

  let imagenRef = useRef(null);
  let imagenNormalRef = useRef(null);
  let precioRef = useRef(null);
  let descripcionRef = useRef(null);
  let descuentoRef = useRef(null);
  let comentariosRef = useRef(null);
  let fraseRef = useRef(null);

  let cantidadMuestra = 10;
  let limitSuperior = cantidadMuestra;

  const [contador, setContador] = useState(0);
  const [contadorVenezia, setContadorVenezia] = useState(0);
  const [limiteInferior, setLimiteInferior] = useState(0);
  const [limiteSuperior, setLimiteSuperior] = useState(cantidadMuestra);
  const [numeroFondo, setNumeroFondo] = useState(0);
  const [imageSrc, setImageSrc] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const {
    getPublicidad,
    activePublicidad
  } = usePublicidadesStore();

  const {
    getAllPublicidadesProductos,
    publicidadesProductos,
    isLoadingPublicidadesProductos
  } = usePublicidadesProductosStore();

  const { idPublicidad } = useParams();

  const localStorageReset = () => {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (key.startsWith("http")) {
        localStorage.removeItem(key);
      }
    }
  }

  useEffect(() => {
    localStorageReset();
    getPublicidad(Number(idPublicidad));
    getAllPublicidadesProductos({ publicidad: idPublicidad, activo: true });
  }, [])

  useEffect(() => {
    if (publicidadesProductos.length !== 0) {

      cantidadMuestra = activePublicidad.cantidad_muestra;
      limitSuperior = cantidadMuestra;
      setLimiteSuperior(cantidadMuestra);

      loadImage(publicidadesProductos[0].imagen.url);
      const comentarioConSaltoTMP = publicidadesProductos[0].comentarios.split('\n');
      setComentarios(comentarioConSaltoTMP);

      // Interval - Change product
      const intervalId = setInterval(changeProduct, 6000);
      return () => clearInterval(intervalId);

    }
  }, [isLoadingPublicidadesProductos])

  useEffect(() => {

    if (publicidadesProductos.length === 0) return;

    const descripcionProducto = descripcionRef.current;
    const divImagen = imagenRef.current;
    const divImagenNormal = imagenNormalRef.current;
    const divPrecio = precioRef.current;
    const divDescuento = descuentoRef.current;
    const divComentarios = comentariosRef.current;
    const divFrase = fraseRef.current;

    // Estilos aleatorios

    // Generar numero estilo entero entre 0 y 3
    const numeroEstilo = Math.floor(Math.random() * 3);
    const numeroFondo = Math.floor(Math.random() * 3);

    setNumeroFondo(numeroFondo);

    // gsap.from(divImagenNormal, { translateY: -100, duration: 0.5, opacity: 0, ease: "sine" });
    gsap.from(divImagenNormal, { translateY: -100, duration: 0.5, opacity: 0, ease: "sine" });

    if (numeroEstilo === 0) { // Animacion elastica
      gsap.from(descripcionProducto, { x: 100, opacity: 0, delay: 1, duration: 2, ease: "elastic" });
      gsap.from(divImagen, { y: -1000, delay: 1, opacity: 0, duration: 2, ease: "elastic" });
      gsap.from(divPrecio, { delay: 2, y: 50, duration: 1, opacity: 0, ease: "elastic" });
      gsap.from(divComentarios, { delay: 2, translateX: -1000, duration: 0.2, opacity: 0, ease: "sine" });
      gsap.from(divDescuento, { delay: 3, width: 0, duration: 1, opacity: 0, ease: "elastic" });
      gsap.from(divFrase, { delay: 4, translateX: -100, duration: 1, opacity: 0, ease: "elastic" });

    } else if (numeroEstilo === 1) { // Animacion de aparicion
      gsap.from(descripcionProducto, { x: 100, opacity: 0, delay: 1, duration: 2, ease: "elastic" });
      gsap.from(divImagen, { width: 0, delay: 1, opacity: 0, duration: 1, ease: "bounce" });  // Bounce
      gsap.from(divPrecio, { delay: 2, y: 50, duration: 1, opacity: 0, ease: "elastic" });
      gsap.from(divComentarios, { delay: 2, translateX: -1000, duration: 0.2, opacity: 0, ease: "bounce" });
      gsap.from(divDescuento, { rotate: 360, translateY: -200, translateX: 200, opacity: 0, duration: 1, delay: 3, ease: "bounce" });
      gsap.from(divFrase, { delay: 4, translateX: -100, duration: 1, opacity: 0, ease: "elastic" });
    } else { // Animacion de giro
      gsap.from(descripcionProducto, { x: 100, opacity: 0, delay: 1, duration: 2, ease: "elastic" });
      gsap.from(divImagen, { rotate: 360, delay: 1, translateY: -200, translateX: 200, opacity: 0, duration: 1, ease: "bounce" }); // Giro
      gsap.from(divPrecio, { delay: 2, y: 50, duration: 1, opacity: 0, ease: "elastic" });
      gsap.from(divComentarios, { delay: 2, translateX: -1000, duration: 0.2, opacity: 0, ease: "sine" });
      gsap.from(divDescuento, { delay: 3, width: 0, duration: 1, opacity: 0, ease: "elastic" });
      gsap.from(divFrase, { delay: 4, translateX: -100, duration: 1, opacity: 0, ease: "elastic" });
    }

  }, [contador]);

  const changeProduct = () => {

    // Muestra -> pantalla venezia
    setContadorVenezia((prev) => {
      if (prev === 5) {
        return 0;
      } else {
        return prev + 1;
      }
    });

    // Muestra normal de productos
    setContador((prev) => {

      if (prev + 1 === publicidadesProductos.length) {

        const proximo = 0;
        loadImage(publicidadesProductos[proximo].imagen.url);
        const comentarioConSaltoTMP = publicidadesProductos[proximo].comentarios.split('\n');
        setComentarios(comentarioConSaltoTMP);
        setLimiteInferior(0);
        setLimiteSuperior(cantidadMuestra);
        limitSuperior = cantidadMuestra;
        return 0;

      } else {

        if ((prev + 1) >= limitSuperior) {
          setLimiteInferior(limitSuperior);
          setLimiteSuperior(limitSuperior + cantidadMuestra);
          limitSuperior = limitSuperior + cantidadMuestra;
        }

        const proximo = prev + 1;
        loadImage(publicidadesProductos[proximo].imagen.url);
        const comentarioConSalto = publicidadesProductos[proximo].comentarios.split('\n');
        setComentarios(comentarioConSalto);
        return proximo;

      }

    });
  }

  const loadImage = async (urlImage) => {

    const url = `${import.meta.env.VITE_API_URL}${urlImagenes}/${urlImage}`;
    const cachedImage = localStorage.getItem(url);

    if (cachedImage) {
      setImageSrc(cachedImage);
      return;
    } else {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setImageSrc(objectURL);
      localStorage.setItem(url, objectURL);
    }

  }

  return (

    <>

      {
        publicidadesProductos.length > 0
          ?
          <div>

            {
              contadorVenezia > 100

                ?

                <div className="h-screen flex bg-white flex-col items-center justify-center">
                  <img src="/assets/venezia.png" className="w-1/3" alt="Panaderia venezia" />
                </div>

                :

                <div>

                  {
                    !publicidadesProductos[contador]?.destacado
                      ?
                      <div className="flex fondo-listado">
                        <div className="w-1/2">
                          <div className="text-white border-r-3 border-red-800 h-screen">
                            {/* <h2 className="font-semibold px-10 py-4 text-6xl text-center titulo-listado mt-10"> NUESTRO PRODUCTOS </h2> */}
                            <img src="/assets/venezia-blanco.png" className="w-1/3 pt-7 mx-auto logoVenezia" alt="Venezia" />
                            <div className="text-3xl listadoProductos pl-2 bg-black bg-opacity-50 mx-5 pr-10 pb-4 pt-5 mt-10">
                              {
                                publicidadesProductos.map((elemento, index) => (
                                  <div className="pl-5 item-listado mt-4">
                                    {
                                      (limiteInferior <= index && index < limiteSuperior) &&
                                      <div className={elemento.id === publicidadesProductos[contador]?.id
                                        ? 'flex bg-red-100 border-l-8 border-red-900 text-red-800 items-center ml-4 px-4 justify-between'
                                        : 'flex items-center ml-4 px-4 justify-between'}>
                                        <div className="flex items-center">
                                          {
                                            elemento.destacado &&
                                            <img className="w-10 estrella" src="/assets/svg/estrella.svg" alt="estrella" />
                                          }
                                          <p className={elemento.destacado ? "py-4 ml-3 text-yellow-300" : "py-4"}>
                                            {elemento?.producto?.descripcion}
                                          </p>
                                        </div>
                                        <p className={elemento.destacado ? "text-yellow-300" : ""}>
                                          ${elemento?.producto?.precio}
                                        </p>
                                      </div>
                                    }
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                        <div className="w-1/2">
                          <img ref={imagenNormalRef} className="w-full h-screen" src={imageSrc} alt="Imagen" />
                        </div>
                      </div>
                      :
                      <div className={`h-screen transition duration-500 fondo${numeroFondo}`}>

                        {/* Contenido de publicidad */}

                        {/* <img ref={logoVeneziaRef} src="/assets/venezia.png" className="w-96 fixed p-10 left-20 bottom-20" alt="Venezia" /> */}

                        <div className="z-10">
                          <div className="z-30 w-full mt-10 fixed ml-10">
                            <p ref={descripcionRef} className="text-6xl 2xl:text-8xl text-white font-semibold descripcion">
                              {publicidadesProductos[contador]?.producto?.descripcion}
                            </p>
                            <p ref={fraseRef} className={publicidadesProductos[contador]?.frase ? `text-4xl 2xl:text-6xl frase${numeroFondo} fixed shadow-xl bottom-0 left-0 p-10 text-white font-semibold descripcion` : ``}>
                              {publicidadesProductos[contador]?.frase}
                            </p>
                            <div ref={comentariosRef} className={comentarios.length <= 1 ? 'text-left text-white comentarios w-max' : 'text-left text-white comentarios px-20 rounded pb-10 mt-10 pt-1 bg-gray-800 bg-opacity-20 w-max'}>
                              {

                                comentarios.length <= 1 ?
                                  comentarios?.map((comentario, index) => {
                                    return (
                                      <p className="leading-relaxed text-5xl" key={index}>
                                        {comentario}
                                        <br />
                                      </p>
                                    )
                                  })
                                  :
                                  comentarios?.map((comentario, index) => {
                                    return (
                                      <div>
                                        <p className="mt-10 text-lg 2xl:text-xl" key={index}>
                                          {comentario}
                                          <br />
                                        </p>
                                      </div>
                                    )
                                  })
                              }

                            </div>
                          </div>
                          <div className={publicidadesProductos[contador]?.descuento === 0 ? 'hidden' : 'block'}>
                            <div ref={descuentoRef} className={`right-0 text-white fixed h-80 w-80 2xl:h-96 2xl:w-96 flex flex-col items-center justify-center shadow p-2 rounded-full mr-10 mt-10 2xl:mr-36 2xl:mt-32 text-7xl 2xl:text-9xl descuento${numeroFondo} font-semibold text-center`}>
                              <p className="mt-1"> {publicidadesProductos[contador]?.descuento}% </p>
                              <p> OFF! </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center mt-10 w-full fixed h-screen">
                            <img className="z-20 max-w-xl 2xl:max-w-2xl" ref={imagenRef} src={imageSrc} alt="Imagen" />
                          </div>
                          <div ref={precioRef} className="right-0 precio text-white bottom-0 fixed mr-20 mb-10 text-5xl 2xl:text-7xl text-center">
                            <p className=""> ${publicidadesProductos[contador]?.producto?.precio} </p>
                          </div>
                        </div>

                        {/* Fondo de pantalla */}
                        <svg className="h-screen w-full animate_background" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                          {/* <path fill="#FF7F3F" className="primero" d="m38.52809,-5c-12.1832,-9.7 -32.04489,-14.1 -47.29949,-5c-19.75931,11.8 -24.05926,41.1 -10.85226,59c15.86888,21.5 53.8518,22 68.79926,2.3c12.28558,-16.3 6.44993,-42.8 -10.6475,-56.3z" /> */}
                          <path fill={numeroFondo === 0 ? "#BC7AF9" : numeroFondo === 1 ? "#C449C2" : "#D80032"} className="segundo" d="m23.53736,4.22653c-9.82841,-2.86149 -24.57103,-1.76091 -31.23251,7.81406c-9.06398,13.0968 -0.21841,37.85966 16.81751,42.70217s37.89399,-12.21634 36.69274,-28.06457c-0.87364,-11.44594 -12.66773,-19.70023 -22.27773,-22.45166z" />
                          {/* <path fill="#F6D860" className="tercero" d="m105.9,50.88357c-12.4,-7.98865 -29.3,-4.67628 -39.4,0.77938c-23.4,12.47008 -37.7,50.56228 -19.1,72.19008s63.9,14.90564 76,-5.45566c7.6,-12.95719 1.8,-30.2984 -2.3,-42.67106c-3.5,-10.52163 -6.4,-19.28966 -15.2,-24.84274z" /> */}
                          <path fill={numeroFondo === 0 ? "#EA5C2B" : numeroFondo === 1 ? "#ffb17d" : "#f8ccaa"} className="cuarto" d="m101.37962,63.69679c-10.14754,-6.47895 -23.25478,-3.29258 -31.18255,2.12425c-16.27835,11.36472 -20.7179,39.82961 -8.03347,50.76948s37.94758,4.14228 47.03808,-13.27654c6.44792,-12.53305 4.75666,-31.65126 -7.82206,-39.61719z" />
                        </svg>

                      </div>
                  }


                </div>
            }

          </div>

          : isLoadingPublicidadesProductos ?

            <div className="w-full h-screen flex items-center bg-zinc-900 justify-center">
              <div className="text-3xl">
                <img className="w-1/2 mx-auto" src="/assets/logo.png" alt="logo.png" />
                <p className="text-xl text-center mt-3">
                  <Spinner labelColor="secondary" color="secondary">
                    Cargando publicidad
                  </Spinner>
                </p>
              </div>
            </div>

            :

            <div className="w-full h-screen flex items-center bg-zinc-900 justify-center">
              <div className="text-3xl">
                <img className="w-1/2 mx-auto" src="/assets/logo.png" alt="logo.png" />
                <p className="text-zinc-300 mt-10 mx-auto text-center">
                  LA PUBLICIDAD NO TIENE PRODUCTOS CARGADOS
                </p>
                <p className="text-zinc-300 text-xl text-center mt-3">
                  Cargar al menos un producto para ejecutarla
                </p>
              </div>
            </div>

      }

    </>

  )
}

