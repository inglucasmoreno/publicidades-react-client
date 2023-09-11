import { Avatar, Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useForm } from "react-hook-form";
import { useAuthStore, useUiStore, useUsersStore } from "../../hooks";
import { useEffect } from "react";

type FormChangePassword = {
  password: string,
  repetir: string
}

export const ChangePasswordModal = () => {

  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm<FormChangePassword>();
  const { isChangePasswordOpen, toggleChangePassword } = useUiStore();
  const { activeUser, changePassword, isLoadingUsersModal } = useUsersStore();
  const { user }: any = useAuthStore();

  useEffect(() => {
    if(isChangePasswordOpen) reset();
  },[isChangePasswordOpen])

  const onSubmit = handleSubmit((data) => {
    changePassword(data);
  });

  return (
    <Modal isDismissable={false} isOpen={isChangePasswordOpen} onOpenChange={toggleChangePassword}>
      <ModalContent className="pb-3">
        <ModalHeader>
          <h1> Cambiando contraseña </h1>
        </ModalHeader>
        <ModalBody>
          <p className="mb-2 flex items-center">
            <Avatar
              className={
                activeUser?.id !== user?.userId ?
                  'transition-transform text-md border border-slate-500'
                  : 'transition-transform text-md border border-secondary'}
              color={activeUser?.id !== user?.userId ? 'default' : 'secondary'}
              name={activeUser?.nombre?.substring(0, 1)}
            />
            <span className={activeUser?.id !== user?.userId ? 'ml-2 font-semibold' : 'ml-2 font-semibold text-secondary'}>
              {`${activeUser.apellido} ${activeUser.nombre}`}
            </span>
          </p>
          <form onSubmit={onSubmit}>
            <Input
              type="password"
              variant="bordered"
              label="Nueva contraseña"
              validationState={errors.password ? 'invalid' : 'valid'}
              errorMessage={errors?.password?.message}
              {...register('password', {
                required: { value: true, message: 'El campo es obligatorio' },
                minLength: { value: 5, message: 'Debe tener como minimo 5 caracteres' }
              })}
            />
            <Input
              type="password"
              variant="bordered"
              label="Repetir contraseña"
              className="mt-4"
              validationState={errors.repetir ? 'invalid' : 'valid'}
              errorMessage={errors?.repetir?.message}
              {...register('repetir', {
                required: { value: true, message: 'El campo es obligatorio' },
                minLength: { value: 5, message: 'Debe tener como minimo 5 caracteres' },
                validate: (value) => {
                  if (value === watch('password')) return true
                  else return 'Las contraseñas no coinciden'
                }
              })}
            />


            {
              !isLoadingUsersModal ?
                <Button type="submit" variant="solid" className="text-white mt-5 w-full" color="success">
                  Actualizar
                </Button>
                :
                <Button isLoading className="text-white mt-5 w-full" color="success">
                  Cargando
                </Button>
            }

          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

