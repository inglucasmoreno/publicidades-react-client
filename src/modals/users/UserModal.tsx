
import { useUiStore } from '../../hooks/useUiStore';
import { useForm } from 'react-hook-form';
import { useUsersStore } from '../../hooks/useUsersStore';
import { useEffect } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { IUsers } from '../../interfaces';
import { UserRoles } from '../../constants';

export const UserModal = () => {

  const { isUserOpen, toggleUser } = useUiStore();
  const { addNewUser, updateUser, isLoadingUsersModal, activeUser } = useUsersStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<IUsers>();

  useEffect(() => {
    if (isUserOpen) reset();
  }, [isUserOpen])

  const onSubmit = handleSubmit((data: any) => {
    if (activeUser.id !== 0) {  
      updateUser(data);
    } else {                                    // Creacion
      const { repetir, ...createData } = data;               // Actualizacion
      addNewUser(createData);
    }
  });

  return (
    <Modal className='pb-2' scrollBehavior="inside" onOpenChange={toggleUser} isDismissable={false} isOpen={isUserOpen}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {activeUser.id !== 0 ? 'Actualizando usuario' : 'Creando usuario'}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={onSubmit}>
                <Input
                  {...register('usuario', {
                    required: { value: true, message: 'El campo es obligatorio' },
                    minLength: { value: 4, message: 'Debe tener como minimo 4 caracteres' }
                  })}
                  type="text"
                  autoFocus
                  defaultValue={activeUser.usuario ? activeUser.usuario : ''}
                  variant="bordered"
                  label="Usuario"
                  validationState={errors.usuario ? 'invalid' : 'valid'}
                  errorMessage={errors?.usuario?.message}
                />

                <Input
                  {...register('apellido', {
                    required: { value: true, message: 'El campo es obligatorio' },
                  })}
                  className="mt-2"
                  type="text"
                  defaultValue={activeUser.apellido ? activeUser.apellido : ''}
                  variant="bordered"
                  label="Apellido"
                  validationState={errors.apellido ? 'invalid' : 'valid'}
                  errorMessage={errors?.apellido?.message}
                />

                <Input
                  {...register('nombre', {
                    required: { value: true, message: 'El campo es obligatorio' },
                  })}
                  className="mt-2"
                  type="text"
                  defaultValue={activeUser.nombre ? activeUser.nombre : ''}
                  variant="bordered"
                  label="Nombre"
                  validationState={errors.nombre ? 'invalid' : 'valid'}
                  errorMessage={errors?.nombre?.message}
                />

                <Input
                  {...register('dni', {
                    required: { value: true, message: 'El campo es obligatorio' },
                  })}
                  className="mt-2"
                  type="text"
                  defaultValue={activeUser.dni ? activeUser.dni : ''}
                  variant="bordered"
                  label="DNI"
                  validationState={errors.dni ? 'invalid' : 'valid'}
                  errorMessage={errors?.dni?.message}
                />

                <Input
                  {...register('email', {
                    required: { value: true, message: 'El campo es obligatorio' },
                  })}
                  className="mt-2"
                  type="text"
                  defaultValue={activeUser.email ? activeUser.email : ''}
                  variant="bordered"
                  label="Email"
                  validationState={errors.email ? 'invalid' : 'valid'}
                  errorMessage={errors?.email?.message}
                />

                <select
                  {...register('role', {
                    required: { value: true, message: 'El campo es obligatorio' }
                  })}
                  defaultValue={activeUser.role ? activeUser.role : 'ADMIN_ROLE'}
                  className="border-2 w-full cursor-pointer dark:border-zinc-700 dark:bg-zinc-900 p-3 mt-2 rounded-lg">
                  {UserRoles.map((role) => (
                    <option key={role.key} value={role.key}>
                      {role.value}
                    </option>
                  ))}
                </select>

                {

                  activeUser.id === 0 &&

                  <div>

                    <Input
                      {...register('password', {
                        required: { value: true, message: 'El campo es obligatorio' },
                        minLength: { value: 6, message: 'Debe tener como minimo 6 caracteres' }
                      })}
                      className="mt-2"
                      type="password"
                      variant="bordered"
                      label="Password"
                      validationState={errors.password ? 'invalid' : 'valid'}
                      errorMessage={errors?.password?.message}
                    />

                    <Input
                      {...register('repetir', {
                        required: { value: true, message: 'El campo es obligatorio' },
                        minLength: { value: 6, message: 'Debe tener como minimo 6 caracteres' },
                        validate: (value) => {
                          if (value === watch('password')) return true
                          else return 'Las contraseñas no coinciden';
                        }
                      })}
                      className="mt-2"
                      type="password"
                      variant="bordered"
                      label="Repetir password"
                      validationState={errors.repetir ? 'invalid' : 'valid'}
                      errorMessage={errors?.repetir?.message}
                    />

                  </div>

                }

                {

                  !isLoadingUsersModal ?
                    <Button type="submit" className='w-full mt-4 text-white' color="success">
                      {
                        activeUser.id !== 0 ? 'Actualizar usuario' : 'Crear usuario'
                      }
                    </Button>
                    :
                    <Button isLoading className='w-full mt-4 text-white' color='success'>
                      Cargando
                    </Button>
                }

              </form>
            </ModalBody>

          </>
        )}
      </ModalContent>
    </Modal>
  )
}
