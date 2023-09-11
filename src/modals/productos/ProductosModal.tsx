import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Spinner } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useProductosStore, useUnidadesMedidaStore } from "../../hooks";
import { IProductos } from "../../interfaces";

export const ProductosModal = () => {

  const [submitActive, setSubmitActive] = useState(false);
  const [unidadesSelector, setUnidadesSelector] = useState([]);
  const [unidadSelected, setUnidadSelected] = useState('');
  const { isProductoOpen, toggleProducto } = useUiStore();
  const { unidadesMedida, getAllUnidadesMedida, isLoadingUnidadesMedida } = useUnidadesMedidaStore();
  const { activeProducto, updateProducto, addNewProducto, isLoadingProductosModal } = useProductosStore();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<IProductos>();

  // Component inicialization
  useEffect(() => {
    if (isProductoOpen) {
      getAllUnidadesMedida();
      setSubmitActive(false);
      reset();
    }
  }, [isProductoOpen])

  // Unidades de medidad - Selector (Filter)
  useEffect(() => {
    setUnidadesSelector(unidadesMedida.filter(unidad => unidad.activo));
    const valueSelected = activeProducto.id === 0 ? '' : activeProducto.unidadMedidaId;
    setUnidadSelected(valueSelected)
  }, [unidadesMedida])

  const onSubmit = handleSubmit((dataForm: IProductos) => {

    setSubmitActive(true);

    if (unidadSelected !== '') {
      const { descripcion, precio } = dataForm;

      const data = {
        descripcion,
        precio: Number(precio),
        unidadMedidaId: Number(unidadSelected),
      }

      if (activeProducto.id !== 0) {
        updateProducto(data);
      } else {
        addNewProducto(data);
      }
    }


  })

  const changeUnidad = (event) => {
    setUnidadSelected(event.target.value);
  }

  return (
    <Modal isDismissable={false} isOpen={isProductoOpen} onOpenChange={() => toggleProducto()}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {
              activeProducto.id === 0 ? 'Nuevo producto' : 'Actualizando producto'
            }
          </ModalHeader>

          <ModalBody className="pb-5">

            <form onSubmit={onSubmit}>
              <Input
                type="text"
                autoFocus
                variant="bordered"
                defaultValue={activeProducto.id === 0 ? '' : activeProducto.descripcion}
                validationState={errors.descripcion ? 'invalid' : 'valid'}
                errorMessage={errors?.descripcion?.message}
                label="Descripcion"
                {...register('descripcion', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              <Input
                type="number"
                step="0.01"
                className="mt-4"
                variant="bordered"
                defaultValue={activeProducto.id === 0 ? null : activeProducto.precio}
                validationState={errors.precio ? 'invalid' : 'valid'}
                errorMessage={errors?.precio?.message}
                label="Precio (ARG)"
                {...register('precio', {
                  required: { value: true, message: 'El campo es obligatorio' },
                  min: { value: 1, message: "Debe ser mayor que 0" }
                })}
              />

              {

                isLoadingUnidadesMedida ?

                  <div className="border-2 w-full flex items-center text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 p-3 mt-4 rounded-lg">
                    <Spinner color="secondary" size="sm" />
                    <span className="ml-2">
                      Cargando unidades
                    </span>
                  </div>

                  :

                  <Select
                    items={unidadesSelector}
                    label="Unidades de medida"
                    variant="bordered"
                    placeholder="Seleccionar unidad"
                    onChange={changeUnidad}
                    selectedKeys={String(unidadSelected)}
                    required
                    validationState={(unidadSelected === '' && submitActive) ? 'invalid' : 'valid'}
                    errorMessage={(unidadSelected === '' && submitActive) && 'El campo es obligatorio'}
                    className="w-full mt-4"
                  >
                    {(unidad) => <SelectItem key={unidad.id}>{unidad.descripcion}</SelectItem>}
                  </Select>

                // <select
                //   onChange={changeUnidad}
                //   value={unidadSelected}
                //   required
                //   className="border-2 w-full dark:border-zinc-700 dark:bg-zinc-900 p-3 mt-4 rounded-lg">
                //   <option value=""> Seleccionar unidad </option>
                //   {unidadesSelector.map((unidad) => (
                //     <option key={unidad.id} value={unidad.id}>
                //       {unidad.descripcion}
                //     </option>
                //   ))}
                // </select>

              }

              {
                !isLoadingProductosModal && !isLoadingUnidadesMedida
                  ?
                  <Button type="submit" className="text-white mt-6 w-full" variant="solid" color="success">
                    {
                      activeProducto.id === 0 ? 'Crear producto' : 'Actualizar producto'
                    }
                  </Button>
                  :
                  <Button isLoading className="text-white mt-6 w-full" color="success" variant="solid">
                    Cargando
                  </Button>
              }

            </form>

          </ModalBody>

        </>
      </ModalContent>
    </Modal>
  )

}

