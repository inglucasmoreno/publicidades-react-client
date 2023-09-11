import { Link } from "react-router-dom";
import { BookIcon, PlayIcon, ProductIcon } from "../../icons";
import { useAuthStore } from "../../hooks";

export const HomePage = () => {

  const { user }: any = useAuthStore();

  return (
    <>
      <div className="px-10 py-5 flex flex-wrap items-center justify-center">

        {

          user.role === 'ADMIN_ROLE' &&
          <Link to="/usuarios" className="border dark:bg-zinc-900 dark:text-zinc-300 w-40 mt-4 md:mt-0 border-slate-300 p-10 px-12 hover:bg-slate-200 hover:translate-y-2 duration-500 shadow-xl text-slate-600 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-people-fill w-10 h-10" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
            <span className="mt-5 font-semibold">
              Usuarios
            </span>
          </Link>

        }

        <Link to="/productos" className="border dark:bg-zinc-900 dark:text-zinc-300 w-40 mt-4 md:mt-0 md:ml-4 border-slate-300 p-10 px-12 hover:bg-slate-200 hover:translate-y-2 duration-500 shadow-xl text-slate-600 flex flex-col items-center justify-center">
          <ProductIcon className="h-10 w-10" />
          <span className="mt-5 font-semibold">
            Productos
          </span>
        </Link>

        <Link to="/publicidades" className="border dark:bg-zinc-900 dark:text-zinc-300 w-40 mt-4 md:mt-0 md:ml-4 border-slate-300 p-10 px-12 hover:bg-slate-200 hover:translate-y-2 duration-500 shadow-xl text-slate-600 flex flex-col items-center justify-center">
          <PlayIcon className="h-10 w-10" />
          <span className="mt-5 font-semibold">
            Publicidades
          </span>
        </Link>

        <Link to="/carta" className="border dark:bg-zinc-900 dark:text-zinc-300 w-40 mt-4 md:mt-0 md:ml-4 border-slate-300 p-10 px-12 hover:bg-slate-200 hover:translate-y-2 duration-500 shadow-xl text-slate-600 flex flex-col items-center justify-center">
          <BookIcon className="h-10 w-10" />
          <span className="mt-5 font-semibold">
            Carta
          </span>
        </Link>
      </div>
      <div>
        <img src="assets/logo.png" alt="Logo Equinoccio" className="flex items-center justify-center mx-auto w-1/4 mt-4" />
        <p className="text-center mt-5 text-gray-500">
          Copyright © 2023 Equinoccio Technology
        </p>
      </div>
    </>
  )
}

