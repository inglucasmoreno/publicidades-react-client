import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Spinner, Textarea } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePublicidadesProductosStore } from "../../hooks/usePublicidadesProductos";
import { IPublicidadesProductos } from "../../interfaces";
import { useImagenesStore, useProductosStore, usePublicidadesStore } from "../../hooks";
import { DeleteIcon, ImageIcon } from "../../icons";
import { BackIcon } from "../../icons/BackIcon";

export const PublicacionesProductosModal = () => {

  const urlImagenes = 'uploads/imagenes';

  const [sectionShow, setSectionShow] = useState('Producto'); // Producto | Imagen
  const [imageSelected, setImageSelected] = useState(null);
  const [errorForm, setErrorForm] = useState(null);
  const { isPublicidadProductoOpen, togglePublicidadProducto } = useUiStore();
  const { activePublicidadProducto, updatePublicidadProducto, addNewPublicidadProducto, isLoadingPublicidadesProductosModal } = usePublicidadesProductosStore();
  const { productos, getAllProductos, isLoadingProductos } = useProductosStore();
  const { imagenes, getAllImagenes, isLoadingImagenes } = useImagenesStore();
  const { activePublicidad } = usePublicidadesStore();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<IPublicidadesProductos>();

  useEffect(() => {
    if (isPublicidadProductoOpen) {
      changeSection('Producto');
      setImageSelected(null);
      setErrorForm(null);
      getAllProductos({ activo: true });
      reset();
    }
  }, [isPublicidadProductoOpen])

  useEffect(() => {
    if (sectionShow === 'Imagenes') getAllImagenes({ activo: true });
    setErrorForm(null);
  }, [sectionShow])

  const onSubmit = handleSubmit((data: any) => {

    if (!imageSelected && activePublicidadProducto.id === 0) {
      setErrorForm('Debe seleccionar una imagen');
      return;
    }

    let sendData: any = {
      peso: Number(data.peso),
      comentarios: data.comentarios,
      frase: data.frase,
      destacado: data.destacado === 'true' ? true : false,
      descuento: Number(data.descuento),
      productoId: Number(data.productoId),
      publicidadId: activePublicidad.id
    }

    if (imageSelected) sendData.imagenId = imageSelected.id;

    if (activePublicidadProducto.id !== 0) {
      updatePublicidadProducto(sendData);
    } else {
      addNewPublicidadProducto(sendData);
    }

  })

  const changeSection = (sectionName: string) => {
    setSectionShow(sectionName);
  }

  const selectImage = (image: any) => {
    setImageSelected(image);
    changeSection('Producto');
  }

  const deleteImageSelected = () => {
    setImageSelected(null);
  }

  const ProductSection = () => {


    return (
      <form onSubmit={onSubmit}>

        {

          isLoadingProductos ?

            <div className="border-2 w-full flex items-center text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 p-3 mt-4 rounded-lg">
              <Spinner color="secondary" size="sm" />
              <span className="ml-2">
                Cargando productos
              </span>
            </div>

            :

            <select
              defaultValue={activePublicidadProducto.productoId ? activePublicidadProducto.productoId : null}
              className="border-2 w-full cursor-pointer dark:border-zinc-700 dark:bg-zinc-900 p-3 mt-2 rounded-lg"
              {...register('productoId', {
                required: { value: true, message: 'El campo es obligatorio' }
              })}
            >
              <option value=""> Seleccionar producto </option>
              {
                productos.map(producto => (
                  <option key={producto.id} value={producto.id}> {producto.descripcion} </option>
                ))
              }
            </select>
        }

        <select
          defaultValue={activePublicidadProducto.id !== 0 ? activePublicidadProducto.destacado : "false"}
          className="border-2 w-full cursor-pointer dark:border-zinc-700 dark:bg-zinc-900 p-3 mt-4 rounded-lg"
          {...register('destacado', {
            required: { value: true, message: 'El campo es obligatorio' }
          })}
        >
          <option value="false"> Producto sin destacar </option>
          <option value="true"> Producto destacado </option>
        </select>

        <Input
          type="number"
          className="mt-4"
          variant="bordered"
          validationState={errors.peso ? 'invalid' : 'valid'}
          defaultValue={activePublicidadProducto.id === 0 ? "100" : String(activePublicidadProducto.peso)}
          errorMessage={errors?.peso?.message}
          label="Peso"
          {...register('peso', {
            required: { value: true, message: 'El campo es obligatorio' },
            min: { value: 1, message: "Debe ser mayor que 0" }
          })}
        />

        <Input
          type="text"
          className="mt-4"
          variant="bordered"
          defaultValue={activePublicidadProducto.id === 0 ? "" : String(activePublicidadProducto.frase)}
          label="Frase"
          {...register('frase')}
        />

        <Input
          type="number"
          className="mt-4"
          variant="bordered"
          validationState={errors.peso ? 'invalid' : 'valid'}
          defaultValue={activePublicidadProducto.id === 0 ? "0" : String(activePublicidadProducto.descuento)}
          errorMessage={errors?.peso?.message}
          label="Descuento"
          {...register('descuento', {
            min: { value: 0, message: "Debe ser mayor que 0" }
          })}
        />

        <Textarea
          type="text"
          className="mt-4"
          variant="bordered"
          defaultValue={activePublicidadProducto.id === 0 ? "" : String(activePublicidadProducto.comentarios)}
          label="Comentarios"
          placeholder="Ej. Aqui colocar detalles"
          {...register('comentarios')}
        >

        </Textarea>

        {
          activePublicidadProducto.id !== 0 && !imageSelected &&
          <div className="w-1/2 mx-auto mt-4">
            <img className="shadow-lg border-2 border-gray-400" src={`${import.meta.env.VITE_API_URL}${urlImagenes}/${activePublicidadProducto?.imagen.url}`} alt="Imagen de producto" />
          </div>
        }

        {
          !imageSelected &&
          <Button onPress={() => changeSection('Imagenes')} variant="solid" color="secondary" className="mt-4 w-full">
            <ImageIcon />
            <span className="ml-1">
              {
                activePublicidadProducto.id !== 0 ? 'Cambiar imagen' : 'Seleccionar imagen'
              }
            </span>
          </Button>
        }

        {
          imageSelected &&
          <div className="w-full flex items-center mt-4">
            <div className="w-full bg-primary text-white dark:bg-zinc-800 border font-semibold border-primary dark:border-gray-300 rounded-xl p-2 text-center text-sm">
              {imageSelected.descripcion}
            </div>
            <Button onPress={() => deleteImageSelected()} isIconOnly className="ml-2" color="danger">
              <DeleteIcon className="w-5 h-5" />
            </Button>
          </div>
        }

        <p className="text-red-500 text-center mt-1 text-sm"> {errorForm && errorForm} </p>

        {
          !isLoadingPublicidadesProductosModal && !isLoadingProductos
            ?
            <Button type="submit" className="text-white mt-6 w-full" variant="solid" color="success">
              {
                activePublicidadProducto.id === 0 ? 'Crear producto' : 'Actualizar producto'
              }
            </Button>
            :
            <Button isLoading className="text-white mt-6 w-full" color="success" variant="solid">
              Cargando
            </Button>
        }

      </form>
    )
  }

  const ImageSection = () => {

    const [search, setSearch] = useState('');

    const filterImages = (event) => {
      setSearch(event.target.value);
    }

    let filteredImages = [];

    if (!search) {
      filteredImages = imagenes;
    } else {
      filteredImages = imagenes.filter((imagen: any) => (imagen.descripcion.includes(search.toUpperCase())));
    }

    return (

      <>

        {
          isLoadingImagenes
            ?
            <div className="flex items-center">
              <Spinner color="secondary" />
              <span className="ml-2">
                Cargando imagenes
              </span>
            </div>
            :
            <div className="w-full">

              <Input value={search} onChange={filterImages} variant="bordered" label="Buscar imagen" />

              <div className="flex flex-wrap items-center mt-5">

                {
                  filteredImages.map(imagen => (
                    <img key={imagen.id} onClick={() => selectImage(imagen)} className="w-20 h-20 mr-2 mt-2 rounded sepia hover:sepia-0 cursor-pointer grayscale-1" src={`${import.meta.env.VITE_API_URL}${urlImagenes}/${imagen.url}`} alt={imagen.descripcion} />
                  ))
                }
              </div>
            </div>
        }

      </>

    )
  }


  return (
    <Modal isDismissable={false} scrollBehavior="inside" isOpen={isPublicidadProductoOpen} onOpenChange={() => togglePublicidadProducto()}>
      <ModalContent>
        <>
          <ModalHeader className="flex items-center gap-1">

            {

              sectionShow === 'Imagenes' &&
              <Button onPress={() => changeSection('Producto')} isIconOnly variant="light" className="">
                <BackIcon />
              </Button>

            }

            <span>
              {
                activePublicidadProducto.id === 0 ? 'Nuevo producto' : 'Actualizando producto'
              }
            </span>
          </ModalHeader>

          <ModalBody className="pb-5">

            {

              sectionShow === 'Producto'
                ?
                <ProductSection />
                :
                <ImageSection />

            }

          </ModalBody>

        </>
      </ModalContent>
    </Modal>
  )

}

