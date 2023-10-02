import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { usePublicidadesStore } from "../../hooks";
import gsap from 'gsap';
import './ReproduccionesPage.css';
import confetti from 'canvas-confetti';
import { usePublicidadesProductosStore } from "../../hooks/usePublicidadesProductos";
import { Spinner } from "@nextui-org/react";

const urlImagenes = 'uploads/imagenes';

export const ReproduccionesPage = () => {

  let imagenRef = useRef(null);
  let precioRef = useRef(null);
  let descripcionRef = useRef(null);
  let donutRef = useRef(null);
  let cupcakeRef = useRef(null);
  let logoVeneziaRef = useRef(null);
  let frase1Ref = useRef(null);
  let frase2Ref = useRef(null);
  let frase3Ref = useRef(null);
  let frase4Ref = useRef(null);
  let frase5Ref = useRef(null);
  let frase6Ref = useRef(null);
  let frase7Ref = useRef(null);

  const [contador, setContador] = useState(0);
  const [imageSrc, setImageSrc] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const {
    getPublicidad,
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

      loadImage(publicidadesProductos[0].imagen.url);
      const comentarioConSaltoTMP = publicidadesProductos[0].comentarios.split('\n');
      setComentarios(comentarioConSaltoTMP);

      // Animation svg
      const donut = donutRef.current;
      gsap.from(donut, { rotate: 360, duration: 3, ease: "sine", repeat: -1, yoyo: true });

      const cupCake = cupcakeRef.current;
      gsap.from(cupCake, { rotateZ: -25, duration: 0.5, ease: "sine", repeat: -1, yoyo: true });

      const logoVenezia = logoVeneziaRef.current;
      gsap.from(logoVenezia, { translateY: -20, duration: 1, ease: "sine", repeat: -1, yoyo: true });

      // Interval - Change product
      const intervalId = setInterval(changeProduct, 5000);
      return () => clearInterval(intervalId);

    }
  }, [isLoadingPublicidadesProductos])

  useEffect(() => {

    if (publicidadesProductos.length === 0) return;

    if (publicidadesProductos[contador]?.destacado) {

      if (publicidadesProductos[contador]?.tipo !== 'Pasteleria') {
        var colors = ['#bb0000', '#EBCA57'];
      }

      confetti({
        particleCount: 1500,
        angle: 60,
        spread: 1000,
        origin: { x: 0.2, y: 0 },
        colors: colors
      });
      confetti({
        particleCount: 1500,
        angle: 120,
        spread: 1000,
        origin: { x: 0.8, y: 0 },
        colors: colors
      });

    }

    const descripcionProducto = descripcionRef.current;
    const divImagen = imagenRef.current;
    const divPrecio = precioRef.current;
    const divFrase1 = frase1Ref.current;
    const divFrase2 = frase2Ref.current;
    const divFrase3 = frase3Ref.current;
    const divFrase4 = frase4Ref.current;
    const divFrase5 = frase5Ref.current;
    const divFrase6 = frase6Ref.current;
    const divFrase7 = frase7Ref.current;

    gsap.from(divFrase1, { delay: 1, y: 50, duration: 0.5, opacity: 0, ease: "elastic" });
    gsap.from(divFrase2, { delay: 1, y: 50, duration: 0.5, opacity: 0, ease: "elastic" });
    gsap.from(divFrase3, { delay: 1, y: 50, duration: 0.5, opacity: 0, ease: "elastic" });
    gsap.from(divFrase4, { delay: 1, y: 50, duration: 0.5, opacity: 0, ease: "elastic" });
    gsap.from(divFrase5, { delay: 1, y: 50, duration: 0.5, opacity: 0, ease: "elastic" });
    gsap.from(divFrase6, { delay: 1, y: 50, duration: 0.5, opacity: 0, ease: "elastic" });
    gsap.from(divFrase7, { delay: 1, y: 50, duration: 0.5, opacity: 0, ease: "elastic" });

    if (publicidadesProductos[contador]?.tipo === 'Generico') {
      gsap.from(descripcionProducto, { x: 100, opacity: 0, duration: 1, ease: "sine" });
      gsap.from(divImagen, { y: 100, opacity: 0, duration: 1, ease: "sine" });
      gsap.from(divPrecio, { delay: 0.2, y: 50, duration: 1, opacity: 0 });
    } else if (publicidadesProductos[contador]?.tipo === 'Pasteleria') {
      gsap.from(descripcionProducto, { x: 100, opacity: 0, duration: 2, ease: "elastic" });
      gsap.from(divImagen, { y: 100, opacity: 0, duration: 2, ease: "elastic" });
      gsap.from(divPrecio, { delay: 0.2, y: 50, duration: 2, opacity: 0 });
    } else {
      gsap.from(descripcionProducto, { x: 100, opacity: 0, duration: 1, ease: "sine" });
      gsap.from(divImagen, { y: 100, opacity: 0, duration: 1, ease: "sine" });
      gsap.from(divPrecio, { delay: 0.2, y: 50, duration: 1, opacity: 0 });
    }

  }, [contador]);

  const changeProduct = () => {
    setContador((prev) => {
      if (prev + 1 === publicidadesProductos.length) {
        const proximo = 0;
        loadImage(publicidadesProductos[proximo].imagen.url);
        const comentarioConSaltoTMP = publicidadesProductos[proximo].comentarios.split('\n');
        setComentarios(comentarioConSaltoTMP);
        return 0;
      } else {
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
          <div
            className={
              publicidadesProductos[contador].tipo === 'Generico' ?
                "body-generico" :
                publicidadesProductos[contador].tipo === 'Pasteleria' ?
                  "body-pasteleria" :
                  "body-cafeteria"
            }>

            <img ref={logoVeneziaRef} src={
              publicidadesProductos[contador].tipo === 'Pasteleria' ?
                "/assets/venezia.png" :
                "/assets/venezia-blanco.png"
            } className="w-40 md:w-80 xl:w-72 fixed right-14 top-14" alt="Venezia" />

            <div className="flex items-center h-full pt-16 w-full">

              <div className={
                publicidadesProductos[contador]?.tipo === 'Generico' ?
                  'w-full flex justify-center items-center' :
                  'w-full flex pl-40 mb-40 items-center'
              }>

                <div className="relative">

                  {/* Frases */}
                  <img ref={frase1Ref} className={
                    publicidadesProductos[contador].frase === 'frase_1' ? "absolute frase" : 'hidden frase'
                  } src="/assets/frases/frase_1.png" alt="frase1" />
                  <img ref={frase2Ref} className={
                    publicidadesProductos[contador].frase === 'frase_2' ? "absolute frase" : 'hidden frase'
                  } src="/assets/frases/frase_2.png" alt="frase2" />
                  <img ref={frase3Ref} className={
                    publicidadesProductos[contador].frase === 'frase_3' ? "absolute frase" : 'hidden frase'
                  } src="/assets/frases/frase_3.png" alt="frase3" />
                  <img ref={frase4Ref} className={
                    publicidadesProductos[contador].frase === 'frase_4' ? "absolute frase" : 'hidden frase'
                  } src="/assets/frases/frase_4.png" alt="frase4" />
                  <img ref={frase5Ref} className={
                    publicidadesProductos[contador].frase === 'frase_5' ? "absolute frase" : 'hidden frase'
                  } src="/assets/frases/frase_5.png" alt="frase5" />
                  <img ref={frase6Ref} className={
                    publicidadesProductos[contador].frase === 'frase_6' ? "absolute frase" : 'hidden frase'
                  } src="/assets/frases/frase_6.png" alt="frase6" />
                  <img ref={frase7Ref} className={
                    publicidadesProductos[contador].frase === 'frase_7' ? "absolute frase" : 'hidden frase'
                  } src="/assets/frases/frase_7.png" alt="frase7" />

                  <img ref={imagenRef} className={
                    publicidadesProductos[contador]?.tipo === 'Generico' && !publicidadesProductos[contador]?.sinFondo ?
                      'border-5 object-cover min-w-2xl rounded-full imagen border-red-700 shadow-2xl' :
                      publicidadesProductos[contador]?.tipo === 'Pasteleria' && !publicidadesProductos[contador]?.sinFondo ?
                        'border-5 object-cover rounded-full imagen border-pink-700 shadow-2xl' :
                        publicidadesProductos[contador]?.tipo === 'Cafeteria' && !publicidadesProductos[contador]?.sinFondo ?
                          'border-5 object-cover rounded-full imagen border-zinc-800 shadow-2xl' :
                          'imagen-generico'
                  }
                    src={imageSrc} alt="Imagen" />
                </div>

                <div ref={descripcionRef} className="text-center flex flex-col items-center justify-center ml-32 mt-4 text-pink-700">

                  <div
                    className={
                      publicidadesProductos[contador]?.tipo === 'Pasteleria' ?
                        'flex items-center' : 'items-center hidden'}>
                    <img ref={donutRef} className="w-32" src="/assets/svg/donut.svg" alt="" />
                    <img ref={cupcakeRef} className="w-20" src="/assets/svg/cupcake.svg" alt="" />
                  </div>

                  {/* Descripcion de producto */}

                  <p
                    className={
                      publicidadesProductos[contador]?.tipo === 'Generico' ?
                        'text-7xl descripcionGenerico text-white font-semibold' :
                        publicidadesProductos[contador]?.tipo === 'Pasteleria' ?
                          'text-7xl descripcionPasteleria text-pink-700' :
                          'text-7xl descripcionCafeteria text-zinc-200'
                    }>
                    {publicidadesProductos[contador]?.producto?.descripcion}
                  </p>

                  {/* Comentarios */}

                  <p
                    className={
                      publicidadesProductos[contador]?.tipo === 'Generico' ?
                        'text-4xl comentariosGenerico mt-4 text-white' :
                        publicidadesProductos[contador]?.tipo === 'Pasteleria' ?
                          'text-4xl comentariosPasteleria font-semibold mt-4 text-pink-700' :
                          'text-4xl comentariosCafeteria mt-4 text-white'
                    }
                  >
                    <div className={comentarios.length <= 1 ? 'text-center' : 'text-left'}>
                      {
                        // publicidadesProductos[contador]?.comentarios

                        comentarios.length <= 1 ?
                          comentarios?.map((comentario, index) => {
                            return (
                              <p className="leading-relaxed" key={index}>
                                {comentario}
                                <br />
                              </p>
                            )
                          })
                          :
                          comentarios?.map((comentario, index) => {
                            return (
                              <li className="mt-10" key={index}>
                                {comentario}
                                <br />
                              </li>
                            )
                          })
                      }

                    </div>
                  </p>

                  {/* Precio */}

                  <p className={
                    publicidadesProductos[contador]?.tipo === 'Generico' ?
                      'text-6xl text-white bg-zinc-900 border-2 border-white precioGenerico w-max p-4 shadow mt-10' :
                      publicidadesProductos[contador]?.tipo === 'Pasteleria' ?
                        'text-6xl precioPasteleria w-max bg-white p-4 shadow-xl border-4 border-pink-700 text-black mt-10' :
                        'text-6xl text-white precioCafeteria w-max p-4 border-t-4 mt-10'
                  }>
                    ${Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(publicidadesProductos[contador]?.producto?.precio)}
                  </p>

                </div>
              </div>

            </div>

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

