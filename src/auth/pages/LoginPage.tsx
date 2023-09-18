
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useAuthStore } from '../../hooks';
import { Button, Card, CardHeader, Input } from '@nextui-org/react';

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
    <div className='h-screen bg-background flex items-center justify-center'>

      <Card className="px-4 pt-2 pb-4 w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <form onSubmit={onSubmit}>

          <CardHeader>
            <div className='text-center w-full flex flex-col items-center justify-center'>
              <h1 className="text-xl font-semibold text-center w-full">
                SISTEMA DE PUBLICIDADES
              </h1>
              <h2>
                Ingreso al sistema
              </h2>
            </div>
          </CardHeader>

          {/* <h1 className="text-center text-2xl mb-2 text-slate-800"></h1> */}

          <Input
            className='mt-2'
            radius='none'
            type="text"
            {...register("username")}
            validationState={errors.username ? 'invalid' : 'valid'}
            errorMessage={errors?.username?.message}
            variant="bordered"
            label="Usuario"
          />

          <Input
            className='mt-4'
            radius='none'
            {...register("password")}
            type="password"
            validationState={errors.password ? 'invalid' : 'valid'}
            errorMessage={errors?.password?.message}
            variant="bordered"
            label="Contraseña"
          />

          {

            !isLoading

              ?

              <Button type="submit" className='w-full mt-4' color="secondary">
                Ingresar
              </Button>

              :

              <Button className='w-full mt-4' color="secondary" isLoading>
                Cargando
              </Button>

          }

        </form>
      </Card>

    </div>

  )
}

