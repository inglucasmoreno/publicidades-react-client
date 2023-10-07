import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { usePublicidadesProductosStore } from "../../hooks/usePublicidadesProductos"
import { useUiStore } from "../../hooks";
import { Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { format } from "date-fns";
import { DeleteIcon, DislikeIcon, EditIcon, LikeIcon, MenuIcon } from "../../icons";
import { ActiveItems } from "../../constants";
import { useParams } from "react-router-dom";

export const PublicacionesProductosTable = () => {

  const {
    publicidadesProductos,
    isLoadingPublicidadesProductos,
    setActivePublicidadProducto,
    activeInactivePublicidadProducto,
    getAllPublicidadesProductos,
    deletePublicidadProducto,
  } = usePublicidadesProductosStore();

  const { idPublicidad } = useParams();

  useEffect(() => {
    getAllPublicidadesProductos({ publicidad: idPublicidad });
  }, []);

  const urlImagenes = 'uploads/imagenes';

  const { togglePublicidadProducto } = useUiStore();
  const [filterValue, setFilterValue] = useState("");
  const [filterActiveValue, setFilterActiveValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "peso",
    direction: "descending",
  });

  // Open Modals

  const openUpdatePublicidadProductoModal = (publicidadProducto: any) => {
    setActivePublicidadProducto(publicidadProducto);
    togglePublicidadProducto();
  }

  // Activate/Inactivate - Imagen

  const activateInactivatePublicidadProductoFnc = (publicidadProducto: any) => {

    let dataUpdate = {
      id: publicidadProducto.id,
      activo: !publicidadProducto.activo
    }

    activeInactivePublicidadProducto(dataUpdate);

  }

  // TODO: Modificar y hacerlo variable

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(publicidadesProductos.length / rowsPerPage);

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

    let filteredElements: any[] = [...publicidadesProductos];

    if (filterActiveValue) {
      filteredElements = filteredElements.filter(element => filterActiveValue === 'true' ? element.activo : !element.activo)
    }

    filteredElements = filteredElements.filter((element: any) =>
      element.comentarios.includes(filterValue.toUpperCase()) ||
      element.producto.unidadMedida.descripcion.includes(filterValue.toUpperCase()) ||
      element.producto.descripcion.includes(filterValue.toUpperCase())

    );

    return filteredElements;

  }, [publicidadesProductos, filterValue, filterActiveValue]);

  // Sort handler

  const sortedItems = useMemo(() => {


    // return [...filteredItems].sort((a: any, b: any) => {
    //   const first = a[sortDescriptor.column as keyof any] as number;
    //   const second = b[sortDescriptor.column as keyof any] as number;
    //   const cmp = first < second ? -1 : first > second ? 1 : 0;

    //   return sortDescriptor.direction === "descending" ? -cmp : cmp;

    return [...filteredItems].sort((a: any, b: any) => {

      let first = null;
      let second = null;
      let cmp = null;

      if (sortDescriptor.column === 'producto.descripcion') {
        first = a.producto.descripcion as number;
        second = b.producto.descripcion as number;
        cmp = first < second ? -1 : first > second ? 1 : 0;
      } else if (sortDescriptor.column === 'producto.precio') {
        first = a.producto.precio as number;
        second = b.producto.precio as number;
        cmp = first < second ? -1 : first > second ? 1 : 0;
      } else if (sortDescriptor.column === 'producto.unidadMedida.descripcion') {
        first = a.producto.unidadMedida.descripcion as number;
        second = b.producto.unidadMedida.descripcion as number;
        cmp = first < second ? -1 : first > second ? 1 : 0;
      }
      else {
        first = a[sortDescriptor.column as keyof any] as number;
        second = b[sortDescriptor.column as keyof any] as number;
        cmp = first < second ? -1 : first > second ? 1 : 0;
      }

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
      key: "peso",
      label: "PESO",
    },

    {
      key: "imagen",
      label: "IMAGEN",
    },

    {
      key: "tipo",
      label: "TIPO",
    },

    {
      key: "producto.descripcion",
      label: "PRODUCTO",
    },

    {
      key: "producto.precio",
      label: "PRECIO",
    },

    {
      key: "producto.unidadMedida.descripcion",
      label: "UNIDAD DE MEDIDA",
    },

    {
      key: "destacado",
      label: "DESTACADO",
    },

    {
      key: "activo",
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

      case "imagen":
        return (
          <img className="w-20 h-20" src={`${import.meta.env.VITE_API_URL}${urlImagenes}/${row.imagen.url}`} />
        );

      case "producto.descripcion":
        return (
          <div>
            {row.producto.descripcion}
          </div>
        );

      case "producto.precio":
        return (
          <div>
            ${Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.producto.precio)}
          </div>
        );

      case "producto.unidadMedida.descripcion":
        return (
          <div>
            {row.producto.unidadMedida.descripcion}
          </div>
        );

      case "comentarios":
        return (
          <div>
            {row.comentarios === '' ? 'Sin comentarios' : row.comentarios}
          </div>
        );

      case "destacado":
        return (
          <div>
            {
              row.destacado &&
              <img className="w-7" src="/assets/svg/estrella.svg" alt="estrella.svg" />
            }
          </div>
        );

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
              <DropdownItem onPress={() => openUpdatePublicidadProductoModal(row)} key="editar-producto">
                <div className="flex items-center">
                  <div>
                    <EditIcon />
                  </div>
                  <span className="ml-2">
                    Editar producto
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => activateInactivatePublicidadProductoFnc(row)} key="alta-baja-producto">
                <div className="flex items-center">
                  {
                    row.activo ? <DislikeIcon className="w-4 h-4" /> : <LikeIcon className="w-4 h-4" />
                  }
                  <span className="ml-2">
                    {row.activo ? 'Baja de producto' : 'Alta de producto'}
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => deletePublicidadProducto(row)} key="eliminar-producto">
                <div className="flex items-center text-red-500">
                  <div>
                    <DeleteIcon />
                  </div>
                  <span className="ml-2">
                    Eliminar producto
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
      aria-label="PublicidadesProductos table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      topContent={topContentTable}
      bottomContent={bottomContentTable}
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn allowsSorting key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={"No se encontraron productos"}
        isLoading={isLoadingPublicidadesProductos}
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

