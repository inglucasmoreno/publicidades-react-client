
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { AddIcon, BackIcon, MenuIcon } from "../../../icons"
import { useNavigate } from "react-router-dom";

export const CartasDigitalesDetallesHeader = () => {

  const navigate = useNavigate();

  return (
    <div className="flex bg-gray-100 dark:bg-zinc-900 border mt-5 py-3 items-center justify-between w-full">

      <Button onPress={() => navigate(-1)} className="ml-2" isIconOnly variant="light" aria-label="Like">
        <BackIcon />
      </Button>

      <div className="flex-grow">
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-xl"> CARTAS DIGITALES </h1>
        </div>
      </div>

      <Dropdown>
        <DropdownTrigger>
          <Button variant="light">
            <MenuIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={() => { }}>
            <div className="flex items-center">
              <AddIcon className="h-4 w-4" />
              <span className="ml-2">
                Nueva carta
              </span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

    </div>
  )
}

