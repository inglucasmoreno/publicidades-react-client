import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect } from "react";

export const ConfirmModal = ({props}) => {

  useEffect(() => {
    console.log(props);
  },[])

  return (
    <>
      {/* <Modal isOpen={true} onOpenChange={onOpenChange}> */}
      <Modal isOpen={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
								Confirmar accion
							</ModalHeader>
              
							<ModalBody>
								Esta por eliminar una imagen
              </ModalBody>

              <ModalFooter className="w-full flex items-center">
                <Button className="w-1/2 text-white" color="success" onPress={onClose}>
                  Aceptar
                </Button>
                <Button className="w-1/2" color="danger" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

