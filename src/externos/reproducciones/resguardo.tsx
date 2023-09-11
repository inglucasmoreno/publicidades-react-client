import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { usePublicidadesStore } from "../../hooks";
import gsap from 'gsap';
import './ReproduccionesPage.css';
import confetti from 'canvas-confetti';

const urlImagenes = 'uploads/imagenes';

export const ReproduccionesPage = () => {

  let imagenRef = useRef(null);
  let precioRef = useRef(null);
  let descripcionRef = useRef(null);
  let donutRef = useRef(null);
  let cupcakeRef = useRef(null);
  let logoVeneziaRef = useRef(null);

  const [contador, setContador] = useState(0);
  const [productos, setProductos] = useState([]);
  const {
    getPublicidad,
    activePublicidad,
    isLoadingPublicidades
  } = usePublicidadesStore();
  const { idPublicidad } = useParams();

  useEffect(() => {
    getPublicidad(Number(idPublicidad));
  }, [])

  useEffect(() => {
    if (activePublicidad.id !== 0) {

      const arrayProductos = activePublicidad?.publicidadesProductos.filter( producto => producto.activo );

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
  }, [isLoadingPublicidades])


  useEffect(() => {

    if (activePublicidad?.publicidadesProductos[contador]?.destacado) {

      if (activePublicidad?.publicidadesProductos[contador]?.tipo !== 'Pasteleria') {
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
  
    if(activePublicidad?.publicidadesProductos[contador]?.tipo === 'Generico') {
      gsap.from(descripcionProducto, { x: 100, opacity: 0, duration: 1, ease: "sine" });
      gsap.from(divImagen, { y: 100, opacity: 0, duration: 1, ease: "sine" });
      gsap.from(divPrecio, { delay: 0.2, y: 50, duration: 1, opacity: 0 });   
    }else if(activePublicidad?.publicidadesProductos[contador]?.tipo === 'Pasteleria') {
      gsap.from(descripcionProducto, { x: 100, opacity: 0, duration: 2, ease: "elastic" });
      gsap.from(divImagen, { y: 100, opacity: 0, duration: 2, ease: "elastic" });
      gsap.from(divPrecio, { delay: 0.2, y: 50, duration: 2, opacity: 0 });
    }else {
      gsap.from(descripcionProducto, { x: 100, opacity: 0, duration: 1, ease: "sine" });
      gsap.from(divImagen, { y: 100, opacity: 0, duration: 1, ease: "sine" });
      gsap.from(divPrecio, { delay: 0.2, y: 50, duration: 1, opacity: 0 });
    }

  }, [contador]);

  const changeProduct = () => {

    setContador((prev) => {
      if (prev + 1 === activePublicidad.publicidadesProductos.length) {
        return 0;
      } else {
        return prev + 1
      }
    });

  }

  return (

    <>
      {

        activePublicidad.id !== 0
          ?
          <div 
            className={
            activePublicidad.publicidadesProductos[contador].tipo === 'Generico' ? 
            "body-generico" :
            activePublicidad.publicidadesProductos[contador].tipo === 'Pasteleria' ? 
            "body-pasteleria" : 
            "body-cafeteria"
            }>

            <img ref={logoVeneziaRef} src="/assets/venezia.png" className="w-40 md:w-80 fixed right-14 top-14" alt="Venezia" />

            <div className="flex items-center w-full">

              <div className="w-full flex pl-40 mt-36 items-center">

                <img ref={imagenRef} className={
                  activePublicidad?.publicidadesProductos[contador]?.tipo === 'Generico' ?
                  'border-5 object-cover rounded-xl imagen border-zinc-800 shadow-2xl' :
                  activePublicidad?.publicidadesProductos[contador]?.tipo === 'Pasteleria' ?
                    'border-5 object-cover rounded-full imagen border-pink-700 shadow-2xl' :
                    'border-5 object-cover rounded-full imagen border-zinc-800 shadow-2xl'
                }
                  src={`http://localhost:3000/${urlImagenes}/${activePublicidad?.publicidadesProductos[contador]?.imagen.url}`} alt="Imagen" />

                <div ref={descripcionRef} className="text-center flex flex-col items-center justify-center ml-32 text-pink-700">

                  <div 
                    className={
                      activePublicidad?.publicidadesProductos[contador]?.tipo === 'Pasteleria' ? 
                      'flex items-center' : 'items-center hidden'}>
                    <img ref={donutRef} className="w-32" src="/assets/svg/donut.svg" alt="" />
                    <img ref={cupcakeRef} className="w-20" src="/assets/svg/cupcake.svg" alt="" />
                  </div>

                  {/* Descripcion de producto */}

                  <p
                    className={
                      activePublicidad?.publicidadesProductos[contador]?.tipo === 'Generico' ? 
                      'text-6xl descripcionGenerico text-white' :
                      activePublicidad?.publicidadesProductos[contador]?.tipo === 'Pasteleria' ?
                      'text-6xl descripcionPasteleria  text-pink-700' :
                      'text-6xl descripcionCafeteria text-zinc-200'
                      }>
                    {activePublicidad?.publicidadesProductos[contador]?.producto?.descripcion}
                  </p>

                  {/* Comentarios */}

                  <p 
                    className={
                      activePublicidad?.publicidadesProductos[contador]?.tipo === 'Generico' ? 
                      'text-3xl comentariosGenerico mt-4 text-white' :
                      activePublicidad?.publicidadesProductos[contador]?.tipo === 'Paseteleria' ?
                      'text-3xl comentariosPasteleria mt-4 text-pink-700' :
                      'text-3xl comentariosCafeteria mt-4 text-white'
                    }>
                    {activePublicidad?.publicidadesProductos[contador]?.comentarios}
                  </p>

                  {/* Precio */}

                  <p className={
                    activePublicidad?.publicidadesProductos[contador]?.tipo === 'Generico' ? 
                    'text-6xl text-white precioGenerico w-max p-4 border-t-4 mt-10' :
                    activePublicidad?.publicidadesProductos[contador]?.tipo === 'Pasteleria' ? 
                    'text-6xl precioPasteleria w-max bg-white p-4 shadow-xl border-4 border-pink-700 text-black mt-10' : 
                    'text-6xl text-white precioCafeteria w-max p-4 border-t-4 mt-10'
                  }>
                    ${Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(activePublicidad?.publicidadesProductos[contador]?.producto?.precio)}
                  </p>

                </div>
              </div>

            </div>

          </div>
          :
          <span> Cargando... </span>

      }

    </>

  )
}

