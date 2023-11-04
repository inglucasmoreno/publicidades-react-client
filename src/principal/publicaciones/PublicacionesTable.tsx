import { Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { Key, useCallback, useMemo, useState } from "react";
import { useUiStore, usePublicidadesStore } from "../../hooks";
import { DislikeIcon, EditIcon, LikeIcon, MenuIcon, PlayIcon, ToolsIcon } from "../../icons";
import { format } from "date-fns";
import { IPublicidades } from "../../interfaces/Publicidades";
import { ActiveItems } from "../../constants";
import { useNavigate } from "react-router-dom";

export const PublicacionesTable = () => {

  const {
    publicidades,
    isLoadingPublicidades,
    setActivePublicidad,
    activeInactivePublicidad
  } = usePublicidadesStore();

  const { togglePublicidad } = useUiStore();
  const [filterValue, setFilterValue] = useState("");
  const [filterActiveValue, setFilterActiveValue] = useState("");
  const navigate = useNavigate();
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "descripcion",
    direction: "ascending",
  });

  // Open Modals

  const openUpdatePublicidadModal = (publicidad: IPublicidades) => {
    setActivePublicidad(publicidad);
    togglePublicidad();
  }

  // Navitate - Detalles
  const navigateDetalles = (publicidad) => {
    setActivePublicidad(publicidad);
    navigate(`/publicidades/configuraciones/${publicidad.id}`);
  }

  // Activate/Inactivate - Publicidad

  const activateInactivatePublicidadFnc = (publicidad: IPublicidades) => {

    let dataUpdate = {
      id: publicidad.id,
      activo: !publicidad.activo
    }

    activeInactivePublicidad(dataUpdate);

  }

  // TODO: Modificar y hacerlo variable

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(publicidades.length / rowsPerPage);

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

    let filteredElements: IPublicidades[] = [...publicidades];

    if (filterActiveValue) {
      filteredElements = filteredElements.filter(element => filterActiveValue === 'true' ? element.activo : !element.activo)
    }

    filteredElements = filteredElements.filter((element: IPublicidades) =>
      element.descripcion.includes(filterValue.toUpperCase())
    );

    return filteredElements;

  }, [publicidades, filterValue, filterActiveValue]);

  // Sort handler

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: IPublicidades, b: IPublicidades) => {
      const first = a[sortDescriptor.column as keyof IPublicidades] as number;
      const second = b[sortDescriptor.column as keyof IPublicidades] as number;
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
      key: "descripcion",
      label: "DESCRIPCION",
    },

    {
      key: "tema",
      label: "TEMA",
    },

    {
      key: "cantidad_muestra",
      label: "PRODUCTOS POR PAGINA",
    },

    {
      key: "activo",
      label: "ESTADO",
    },

    {
      key: "createdAt",
      label: "FECHA DE CREACION",
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

      case "activo":
        return (
          <Chip className="capitalize" color={statusColorMap[row.activo ? 'activo' : 'inactivo']} size="sm" variant="flat">
            {row.activo ? 'Activo' : 'Inactivo'}
          </Chip>
        );

      case "createdAt": return (format(new Date(row.createdAt), 'dd/MM/yyyy'));

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
              <DropdownItem onPress={() => navigate(`/reproducciones/${row.id}`)} key="reproducir-publicidad">
                <div className="flex items-center">
                  <div>
                    <PlayIcon />
                  </div>
                  <span className="ml-2">
                    Reproducir publicidad
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => navigateDetalles(row)} key="configurar-publicidad">
                <div className="flex items-center">
                  <div>
                    <ToolsIcon className="h-4 w-4" />
                  </div>
                  <span className="ml-2">
                    Configuraciones
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => openUpdatePublicidadModal(row)} key="editar-publicidad">
                <div className="flex items-center">
                  <div>
                    <EditIcon />
                  </div>
                  <span className="ml-2">
                    Editar publicidad
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => activateInactivatePublicidadFnc(row)} key="alta-baja-publicidad">
                <div className="flex items-center">
                  {
                    row.activo ? <DislikeIcon className="w-4 h-4" /> : <LikeIcon className="w-4 h-4" />
                  }
                  <span className="ml-2">
                    {row.activo ? 'Baja de publicidad' : 'Alta de publicidad'}
                  </span>
                </div>
              </DropdownItem>
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
      aria-label="Publicidades table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      topContent={topContentTable}
      bottomContent={bottomContentTable}
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn className="bg-secondary text-white" allowsSorting key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={"No se encontraron publicidades"}
        isLoading={isLoadingPublicidades}
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


