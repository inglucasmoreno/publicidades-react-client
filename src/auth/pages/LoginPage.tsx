
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useAuthStore } from '../../hooks';
import { Button, Input } from '@nextui-org/react';


type FormLogin = {
  username: string,
  password: string
}

const validationSchema = z.object({
  username: z.string()
    .min(4, { message: 'Debe tener como minimo 4 caracteres' })
    .max(20, { message: 'Puede tener como maximo 20 caracteres' }),
  password: z.string()
    .min(5, { message: 'Debe tener como minimo 5 caracteres' })
});

export const LoginPage = () => {

  const { isLoading, login } = useAuthStore();

  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormLogin>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = handleSubmit((data: any) => {
    login(data);
    reset();
  })

  return (
    <div>


      <div className="flex">

        <div className="w-full md:w-1/2 mt-20 md:mt-0 md:flex md:items-center md:justify-center">
          <form onSubmit={onSubmit} className="w-11/12 mx-auto md:w-1/2">
            <div className="text-center">
              <img src="/assets/equinoccio-design.png" className="w-24 md:w-36 mx-auto" alt="Equinoccio-Designe" />
              <h1 className="text-2xl md:text-3xl font-semibold mt-5 text-secondary"> INGRESO AL SISTEMA </h1>
              <p className="font-semibold mt-2 text-primary"> Version 1.0.0 </p>
            </div>
            <div className="mt-10">
              <Input
                label="Usuario"
                variant='bordered'
                color="secondary"
                placeholder='Escribe tu usuario'
                {...register("username")}
                validationState={errors.username ? 'invalid' : 'valid'}
                errorMessage={errors?.username?.message}
                size='lg' />
            </div>
            <div className="mt-10">
              <Input
                label="Contraseña"
                variant='bordered'
                color="secondary"
                {...register("password")}
                type="password"
                validationState={errors.password ? 'invalid' : 'valid'}
                errorMessage={errors?.password?.message}
                placeholder='Escribe tu contraseña'
                size='lg' />
            </div>
            <Button isLoading={isLoading} type="submit" color='secondary' size='lg' className="w-full mt-10 py-6">
              { isLoading ? 'Comprobando' : 'Iniciar sesion' }
            </Button>
          </form>
        </div>

        <div className="w-1/2 hidden bg-secondary md:flex flex-col items-center justify-center h-screen">
          <img src="/assets/svg/login.svg" alt="logo.png" />
        </div>

      </div>

    </div>

  )
}

