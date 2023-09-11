import { Modal, ModalBody, ModalContent, Spinner } from "@nextui-org/react";
import { useUiStore } from "../../hooks";

export const LoadingModal = () => {

  const { isLoadingOpen, loadingMessage } = useUiStore();

  return (
    <>
      <Modal closeButton="text-white" isOpen={ isLoadingOpen }>
        <ModalContent>
          <ModalBody>
            <div className="flex flex-col items-center justify-center p-8">
                <p className="font-semibold text-xl"> { loadingMessage } </p>
                <Spinner className="mt-10" size="lg" color="secondary" />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

}

