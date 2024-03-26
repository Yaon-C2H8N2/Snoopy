import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import AdminList from "../AdminList.tsx";

type DeleteDialogProps = {
    isOpen: boolean,
    elem?: object | undefined,
    onDismiss?: () => void
    onConfirm?: (elem: object | undefined) => void
}

function DeleteDialog(props: DeleteDialogProps) {
    const tableColumns = props.elem
        ? Object.keys(props.elem)
            .map((key) => ({key: key, label: key}))
            .filter((column) => column.key !== "key")
        : [];

    return (
        <Modal isOpen={props.isOpen} onClose={props.onDismiss}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Suppression</ModalHeader>
                        <ModalBody>
                            <p>Êtes vous-sûr de vouloir supprimer ça ?</p>
                            {props.elem && (
                                <AdminList content={[props.elem]} columns={tableColumns}/>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={() => {
                                    props.onConfirm && props.onConfirm(props.elem);
                                    onClose();
                                }}
                                variant={"bordered"}
                                color={"danger"}
                            >
                                Supprimer
                            </Button>
                            <Button
                                onClick={onClose}
                                color={"primary"}
                                variant={"light"}
                            >
                                Annuler
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default DeleteDialog;