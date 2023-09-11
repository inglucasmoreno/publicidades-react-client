import { useState } from 'react';
import { useAuthStore, useUiStore } from '../../../hooks';
import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileModal } from '../../../modals';
import { MoonIcon, SunIcon, UserSolidIcon } from '../../../icons';

export const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleProfile, toggleDarkMode, isDarkMode } = useUiStore();
  const location = useLocation();
  const navigate = useNavigate();

  const { logout, user }: any = useAuthStore();

  const navigateTo = (url) => {
    navigate(url);
    setIsMenuOpen(false);
  }

  return (
    <>
      <ProfileModal />
      <NavbarNextUI
        className='border-b dark:border-zinc-600 dark:bg-zinc-900 bg-zinc-50'
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={(event) => setIsMenuOpen(event)}>
        <NavbarContent>
          <NavbarMenuToggle
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">
              EQUINOCCIO
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">

          <NavbarItem className='cursor-pointer'>
            <Link onPress={() => navigate('/')} className={location.pathname === '/' && 'text-secondary'} color="foreground">
              Inicio
            </Link>
          </NavbarItem>

          <NavbarItem className='cursor-pointer'>
            <Link onPress={() => navigate('/productos')} className={location.pathname === '/productos' && 'text-secondary'} color="foreground">
              Productos
            </Link>
          </NavbarItem>

          <NavbarItem>

            <Dropdown className="ml-2">
              <DropdownTrigger className='cursor-pointer'>
                <Link color="foreground"> Servicios </Link>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onPress={() => navigate('/publicidades')} key="publicidades"> Publicidades </DropdownItem>
                <DropdownItem onPress={() => navigate('/carta')} key="carta_digital"> Carta digital </DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </NavbarItem>

          <NavbarItem>

            <Dropdown className="ml-2">
              <DropdownTrigger className='cursor-pointer'>
                <Link color="foreground"> Configuraciones </Link>
              </DropdownTrigger>
              <DropdownMenu>

                {
                  user.role === 'ADMIN_ROLE' &&
                  <DropdownItem onPress={() => navigate('/usuarios')} key="usuarios"> Usuarios </DropdownItem>
                }

                {
                  user.role === 'ADMIN_ROLE' &&
                  <DropdownItem onPress={() => navigate('/unidades_medida')} key="unidades_medida"> Unidades de medida </DropdownItem>
                }

                <DropdownItem onPress={() => navigate('/imagenes')} key="imagenes"> Imagenes </DropdownItem>

              </DropdownMenu>
            </Dropdown>

          </NavbarItem>

        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  // isBordered
                  as="button"
                  className="transition-transform text-md"
                  color="secondary"
                  name={user?.nombre?.substring(0, 1)}
                />
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem onPress={() => toggleProfile()} key="profile" className="h-14 gap-2">
                  <p className="text-slate-900 dark:text-slate-300"> Usuario </p>
                  <p className="font-semibold"> {user.apellido} {user.nombre} </p>
                </DropdownItem>
                <DropdownItem onPress={() => toggleProfile()} key="settings">

                  <div className='flex items-center'>
                    <UserSolidIcon className="w-4 h-4" />
                    <span className='ml-2'>
                      Perfil
                    </span>
                  </div>

                </DropdownItem>

                <DropdownItem
                  onPress={() => toggleDarkMode()}
                  key="dark_mode"
                >
                  <div className="flex items-center">

                    {
                      isDarkMode
                        ? <SunIcon className="w-4 h-4 mr-2" />
                        : <MoonIcon className="w-4 h-4 mr-2" />
                    }

                    <span>
                      {
                        isDarkMode ? 'Modo claro' : 'Modo oscuro'
                      }
                    </span>
                  </div>
                </DropdownItem>

                <DropdownItem className="text-danger-500" onClick={() => logout()} key="logout" color="danger">
                  Cerrar sesion
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {/* 
          {menuItems.map((item, index) => (
            <NavbarMenuItem className="w-full cursor-pointer" key={`${item.link}-${index}`}>
              <Link
                color="foreground"
                size="lg"
                className={location.pathname === item.url ? 'text-secondary w-full' : 'w-full'}
                onPress={() => navigateTo(item.url)}
              >
                {item.link}
              </Link>
            </NavbarMenuItem>
          ))} */}

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/')}
              key="inicio"
              size='lg'
              color='foreground'
              className={location.pathname === '/' ? 'text-secondary w-full' : 'w-full'}
            >
              Inicio
            </Link>
          </NavbarMenuItem>

          {
            user.role === 'ADMIN_ROLE' &&
            <NavbarMenuItem className='cursor-pointer'>
              <Link
                onPress={() => navigateTo('/usuarios')}
                key="usuarios"
                size='lg'
                color='foreground'
                className={location.pathname === '/usuarios' ? 'text-secondary w-full' : 'w-full'}
              >
                Usuarios
              </Link>
            </NavbarMenuItem>
          }

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/productos')}
              key="productos"
              size='lg'
              color='foreground'
              className={location.pathname === '/productos' ? 'text-secondary w-full' : 'w-full'}
            >
              Productos
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/publicidades')}
              key="publicidades"
              size='lg'
              color='foreground'
              className={location.pathname === '/publicidades' ? 'text-secondary w-full' : 'w-full'}
            >
              Publicidades
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/carta')}
              key="carta"
              size='lg'
              color='foreground'
              className={location.pathname === '/carta' ? 'text-secondary w-full' : 'w-full'}
            >
              Carta
            </Link>
          </NavbarMenuItem>

          {
            user.role === 'ADMIN_ROLE' &&
            <NavbarMenuItem className='cursor-pointer'>
              <Link
                onPress={() => navigateTo('/unidades_medida')}
                key="unidades_medida"
                size='lg'
                color='foreground'
                className={location.pathname === '/unidades_medida' ? 'text-secondary w-full' : 'w-full'}
              >
                Unidades de medida
              </Link>
            </NavbarMenuItem>
          }

          {
            user.role === 'ADMIN_ROLE' &&
            <NavbarMenuItem className='cursor-pointer'>
              <Link
                onPress={() => navigateTo('/imagenes')}
                key="imagenes"
                size='lg'
                color='foreground'
                className={location.pathname === '/imagenes' ? 'text-secondary w-full' : 'w-full'}
              >
                Imagenes
              </Link>
            </NavbarMenuItem>
          }

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => logout()}
              color='danger'
              size='lg'
              className='w-full'
            >
              Cerrar sesion
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </NavbarNextUI>

    </>

  )

}

