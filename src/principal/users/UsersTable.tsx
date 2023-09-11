import { Avatar, Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { Key, useCallback, useMemo, useState } from "react";
import { DislikeIcon, EditIcon, LikeIcon, LockCloseIcon, MenuIcon } from "../../icons";
import { useAuthStore, useUiStore, useUsersStore } from "../../hooks";
import { IUsers } from "../../interfaces";
import { ActiveItems } from "../../constants";

export const UsersTable = () => {

  const {
    users,
    activeInactiveUser,
    isLoadingUsers,
    setActiveUser
  } = useUsersStore();

  const { user }: any = useAuthStore();
  const { toggleUser, toggleChangePassword } = useUiStore();
  const [filterValue, setFilterValue] = useState("");
  const [filterActiveValue, setFilterActiveValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "descripcion",
    direction: "ascending",
  });


  // Open modales

  const openEditUserModal = (user) => {
    setActiveUser(user);
    toggleUser();
  }

  const openChangePasswordModal = (user) => {
    setActiveUser(user);
    toggleChangePassword();
  }

  // Activate/Inactivate - Usuario

  const activateInactivateUserFnc = (user: any) => {

    let dataUpdate = {
      id: user.id,
      activo: !user.activo
    }

    activeInactiveUser(dataUpdate);

  }

  // TODO: Modificar y hacerlo variable

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  let pages = Math.ceil(users?.length / rowsPerPage);

  // Filter handler
  
  const handleActiveSelectFilter = (event) => {
    setFilterActiveValue(event.target.value);
    setPage(1);
  }

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredItems = useMemo(() => {

    let filteredElements: IUsers[] = [...users];

    if (filterActiveValue) {
      filteredElements = filteredElements.filter(element => filterActiveValue === 'true' ? element.activo : !element.activo)
    }

    filteredElements = filteredElements.filter((element: IUsers) =>
      element.apellido.includes(filterValue.toUpperCase()) ||
      element.nombre.includes(filterValue.toUpperCase()) ||
      element.dni.includes(filterValue) ||
      element.usuario.includes(filterValue)
    );

    return filteredElements;

  }, [users, filterValue, filterActiveValue]);


  // Sort handler

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: IUsers, b: IUsers) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  // Pagination handler

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedItems.slice(start, end);
  }, [page, sortedItems]);

  // Table columns

  const columns = [
    {
      key: "actions",
      label: "ACCIONES",
    },
    {
      key: "avatar",
      label: "AVATAR",
    },
    {
      key: "usuario",
      label: "USUARIO",
    },
    {
      key: "apellido",
      label: "APELLIDO",
    },
    {
      key: "nombre",
      label: "NOMBRE",
    },
    {
      key: "dni",
      label: "DNI",
    },
    {
      key: "role",
      label: "ROL",
    },
    {
      key: "status",
      label: "ESTADO",
    },
  ];

  // Table rows

  const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
  };

  const renderCell = useCallback((row: any, columnKey: Key) => {

    const cellValue = row[columnKey as keyof any];

    switch (columnKey) {
      case "avatar":
        return (
          <Avatar
            // isBordered
            className="transition-transform text-md border border-slate-500"
            color={row?.id !== user?.userId ? 'default' : 'secondary'}
            name={row?.nombre?.substring(0, 1)}
          />
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{row.role === 'ADMIN_ROLE' ? 'Administrador' : 'Estandar'}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[row.activo ? 'activo' : 'inactivo']} size="sm" variant="flat">
            {row.activo ? 'Activo' : 'Inactivo'}
          </Chip>
        );
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
              >
                <MenuIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem onPress={() => openEditUserModal(row)} key="editar-usuario">
                <div className="flex items-center">
                  <div>
                    <EditIcon />
                  </div>
                  <span className="ml-2">
                    Editar usuario
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => openChangePasswordModal(row)} key="cambiar-clave">
                <div className="flex items-center">
                  <div>
                    <LockCloseIcon className="w-4 h-4" />
                  </div>
                  <span className="ml-2">
                    Cambiar contraseña
                  </span>
                </div>
              </DropdownItem>

              {
                user.userId !== row.id &&
                <DropdownItem onPress={() => activateInactivateUserFnc(row)} key="alta-baja-usuario">
                  <div className="flex items-center">
                    {
                      row.activo ? <DislikeIcon className="w-4 h-4" /> : <LikeIcon className="w-4 h-4" />
                    }
                    <span className="ml-2">
                      {row.activo ? 'Baja de usuario' : 'Alta de usuario'}
                    </span>
                  </div>
                </DropdownItem>
              }

            </DropdownMenu>
          </Dropdown>
        );
      default:
        return cellValue;
    }
  }, []);

  // Top content table

  const topContentTable = useMemo(() => {
    return (
      <div className="flex items-center justify-center">
        <Input
          variant="bordered"
          size="sm"
          label="Buscar"
          className="w-52"
          onValueChange={onSearchChange}
        />
        <Select
          items={ActiveItems}
          label="Estado"
          placeholder="Todos los estados"
          variant="bordered"
          size="sm"
          className="w-52 ml-2"
          onChange={handleActiveSelectFilter}
        >
          {(ActiveItem) => <SelectItem key={ActiveItem.key} value={ActiveItem.key}>{ActiveItem.value}</SelectItem>}
        </Select>
      </div>

    )
  }, [])

// Bottom content table

const bottomContentTable = useMemo(() => {
  return (
    <div className="flex w-full justify-center">
      <Pagination
        isCompact
        showControls
        className="ml-10"
        showShadow
        color="secondary"
        page={page}
        total={pages}
        variant="light"
        onChange={(page) => setPage(page)}
      />
    </div>
  )
}, [items.length, page, pages]);

  return (
    <Table
      isStriped
      className="mt-4 pb-4"
      aria-label="User table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      topContent={ topContentTable }
      bottomContent={ bottomContentTable }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >

      <TableHeader columns={columns}>
        {(column) => <TableColumn allowsSorting key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={"No se encontraron usuarios"}
        isLoading={isLoadingUsers}
        loadingContent={<Spinner label="Cargando..." />}
        items={items}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

