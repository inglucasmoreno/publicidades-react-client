import { useAuthStore, useUiStore } from "../../hooks"
import { useState, useEffect } from 'react';
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";

type formChangePassword = {
  password_actual: string,
  password_nuevo: string,
  password_nuevo_repetir: string
}

export const ProfileModal = () => {

  const { toggleProfile, isProfileOpen } = useUiStore();
  const { user }: any = useAuthStore();
  const { changeMyPassword, isLoadingChangePassword } = useAuthStore();
  const { register, formState: { errors }, reset, handleSubmit, watch } = useForm<formChangePassword>();
  const [showChangePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (isProfileOpen) {
      setChangePassword(false);
      reset();
    };
  }, [isProfileOpen])


  const onSubmit = handleSubmit((data) => {
    changeMyPassword(data);
    reset();
    console.log('Formulario controlado')
  });


  return (
    <Modal scrollBehavior="inside" isOpen={isProfileOpen} onOpenChange={toggleProfile} isDismissable={false}>
      <ModalContent>
        {() => (
          <>

            <ModalHeader className="flex flex-col gap-1"> Perfil de usuario </ModalHeader>

            <ModalBody>

              {

                !showChangePassword &&
                <div>
                  <div className="mb-3">
                    <p className="font-semibold"> Usuario en sistema </p>
                    <p> <span>  {user.usuario} </span> <small> ({user.role === 'ADMIN_ROLE' ? 'Administrador' : 'Estandar'}) </small> </p>
                  </div>
                  <Divider />
                  <div className="my-3">
                    <p className="font-semibold"> Apellido  y Nombre </p>
                    <p> {`${user.apellido} ${user.nombre}`} </p>
                  </div>
                  <Divider />
                  <div className="my-3">
                    <p className="font-semibold"> Identificación (DNI) </p>
                    <p> {user.dni} </p>
                  </div>
                  <Divider />
                  <div className="my-3">
                    <p className="font-semibold"> Correo electronico </p>
                    <p> {user.email} </p>
                  </div>
                  <Divider />
                </div>
              }

              <form onSubmit={onSubmit}>

                <p className="font-semibold mb-3"> Contraseña </p>

                {

                  !showChangePassword
                    ?
                    <div>
                      <Button onPress={() => setChangePassword(true)} variant="solid" className="mb-4" color="secondary">
                        Actualizar clave
                      </Button>
                    </div>
                    :
                    <div className="mb-4">

                      <Input
                        {...register('password_actual', {
                          required: { value: true, message: 'El campo es obligatorio' },
                          minLength: { value: 5, message: 'Debe tener como minimo 5 caracteres' }
                        })}
                        type="password"
                        variant="bordered"
                        label="Contraseña actual"
                        validationState={errors.password_actual ? 'invalid' : 'valid'}
                        errorMessage={errors?.password_actual?.message}
                      />

                      <Input
                        {...register('password_nuevo', {
                          required: { value: true, message: 'El campo es obligatorio' },
                          minLength: { value: 5, message: 'Debe tener como minimo 5 caracteres' }
                        })}
                        className="mt-2"
                        type="password"
                        variant="bordered"
                        label="Nueva contraseña"
                        validationState={errors.password_nuevo ? 'invalid' : 'valid'}
                        errorMessage={errors?.password_nuevo?.message}
                      />

                      <Input
                        {...register('password_nuevo_repetir', {
                          required: { value: true, message: 'El campo es obligatorio' },
                          minLength: { value: 5, message: 'Debe tener como minimo 5 caracteres' },
                          validate: (value) => {
                            if (value === watch('password_nuevo')) return true
                            else return 'Las contraseñas no coinciden';
                          }
                        })}
                        className="mt-2"
                        type="password"
                        variant="bordered"
                        label="Repetir nueva contraseña"
                        validationState={errors.password_nuevo_repetir ? 'invalid' : 'valid'}
                        errorMessage={errors?.password_nuevo_repetir?.message}
                      />

                      <div className="flex items-center mt-5 mb-2">

                        {

                          !isLoadingChangePassword ?
                            <Button type="submit" className="w-1/2 text-white" variant="solid" color="success">
                              Actualizar
                            </Button>
                            :
                            <Button type="submit" className="w-1/2 text-white" isLoading variant="solid" color="success">
                              Cargando
                            </Button>

                        }

                        <Button className="w-1/2 ml-2" variant="solid" color="danger" onPress={() => setChangePassword(false)}>
                          Cancelar
                        </Button>
                      </div>

                    </div>

                }

              </form>

            </ModalBody>

          </>
        )}
      </ModalContent>
    </Modal >
  )
}

