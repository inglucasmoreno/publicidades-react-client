import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { MenuIcon, NewUserIcon } from "../../icons"
import { useUiStore, useUsersStore } from "../../hooks";

export const UsersHeader = () => {

  const {
    users,
    setActiveUser
  } = useUsersStore();

  const { toggleUser } = useUiStore();

  const openNewUserModal = () => {
    setActiveUser({
      id: 0,
      usuario: '',
      apellido: '',
      nombre: '',
      dni: '',
      email: '',
      role: 'ADMIN_ROLE',
      password: '',
      repetir: '',
    })
    toggleUser();
  }

  return (
    <div className="flex items-center justify-between mb-4 mt-5">
      <div></div>
      <div className="text-center ml-20">
        <h1 className="font-semibold text-xl"> LISTADO DE USUARIOS </h1>
        <h4 className="text-sm text-gray-400"> Total de usuarios: {users.length} </h4>
      </div>
      <div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="light"
            >
              <MenuIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem onPress={() => openNewUserModal()} key="new">
              <div className="flex items-center">
                <NewUserIcon />
                <span className="ml-2">
                  Nuevo usuario
                </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

