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
  Switch,
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
        className='border-b dark:border-zinc-600 bg-opacity-40 dark:bg-zinc-900 bg-zinc-200'
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={(event) => setIsMenuOpen(event)}>
        <NavbarContent>
          <NavbarMenuToggle
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link onPress={() => navigate('/')} className="flex items-center text-inherit cursor-pointer" color="foreground">
              <img src="/assets/equinoccio-design.png" className="w-10" alt="logo.svg" />
              <div>
                <p className="text-secondary font-semibold ml-2"> EQUINOCCIO </p>
                <p className="text-primary font-semibold text-xs ml-2"> Design </p>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">

          <NavbarItem className='cursor-pointer'>
            <Link onPress={() => navigate('/')} className={location.pathname === '/' && 'text-white bg-primary rounded p-2'} color="foreground">
              Inicio
            </Link>
          </NavbarItem>

          <NavbarItem className='cursor-pointer'>
            <Link onPress={() => navigate('/productos')} className={location.pathname === '/productos' && 'text-white bg-primary rounded p-2'} color="foreground">
              Productos
            </Link>
          </NavbarItem>

          <NavbarItem>

            <Dropdown className="ml-2">
              <DropdownTrigger className='cursor-pointer'>
                <Link
                  className={
                    (location.pathname === '/publicidades' ||
                      location.pathname === '/carta-digital' ||
                      location.pathname === '/carta')
                    && 'text-white bg-primary rounded p-2'}
                  color="foreground"> Servicios
                </Link>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onPress={() => navigate('/publicidades')} key="publicidades"> Publicidades </DropdownItem>
                <DropdownItem onPress={() => navigate('/carta-digital')} key="carta_digital"> Carta digital </DropdownItem>
                <DropdownItem onPress={() => navigate('/carta')} key="carta_digital"> Carta digital (PDF) </DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </NavbarItem>

          <NavbarItem>

            <Dropdown className="ml-2">
              <DropdownTrigger className='cursor-pointer'>
                <Link
                  color="foreground"
                  className={
                    (
                      location.pathname === '/usuarios' ||
                      location.pathname === '/unidades_medida' ||
                      location.pathname === '/imagenes'
                    )
                    && 'text-white bg-primary rounded p-2'}
                > Configuraciones </Link>
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
          <Switch
            defaultSelected={!isDarkMode}
            onChange={() => toggleDarkMode()}
            size="md"
            color="secondary"
            thumbIcon={({ isSelected, className }) =>
              !isDarkMode ? (
                <SunIcon className={className + `${isSelected} ? text-orange-500`} />
              ) : (
                <MoonIcon className={className + `${isSelected} ? text-zinc-800`} />
              )
            }
          >
          </Switch>
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
              className={location.pathname === '/' ? 'bg-primary p-2 bg-opacity-90 rounded text-white w-full' : 'w-full'}
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
                className={location.pathname === '/usuarios' ? 'bg-primary p-2 bg-opacity-90 rounded text-white w-full' : 'w-full'}
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
              className={location.pathname === '/productos' ? 'bg-primary p-2 bg-opacity-90 rounded text-white w-full' : 'w-full'}
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
              className={location.pathname === '/publicidades' ? 'bg-primary p-2 bg-opacity-90 rounded text-white w-full' : 'w-full'}
            >
              Publicidades
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/carta-digital')}
              key="carta-digital"
              size='lg'
              color='foreground'
              className={location.pathname === '/carta-digital' ? 'bg-primary p-2 bg-opacity-90 rounded text-white w-full' : 'w-full'}
            >
              Carta digital
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/carta')}
              key="carta"
              size='lg'
              color='foreground'
              className={location.pathname === '/carta' ? 'bg-primary p-2 bg-opacity-90 rounded text-white w-full' : 'w-full'}
            >
              Carta digital (PDF)
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
                className={location.pathname === '/unidades_medida' ? 'bg-primary p-2 bg-opacity-90 rounded text-white w-full' : 'w-full'}
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
                className={location.pathname === '/imagenes' ? 'bg-primary p-2 bg-opacity-90 rounded text-white w-full' : 'w-full'}
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

