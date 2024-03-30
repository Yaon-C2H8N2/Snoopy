import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import UtilisateurAddForm from "./UtilisateurAddForm.tsx";
import PrestationAddForm from "./PrestationAddForm.tsx";
import ClientAddForm from "./ClientAddForm.tsx";
import TypePrestationAddForm from "./TypePrestationAddForm.tsx";
import { useEffect, useRef, useState } from "react";

type AddDialogProps = {
    isOpen: boolean;
    type?: string;
    onDismiss?: () => void;
    onConfirm?: (elem: object | undefined) => void;
};

function AddDialog(props: AddDialogProps) {
    const forms = {
        utilisateur: UtilisateurAddForm,
        prestation: PrestationAddForm,
        typePrestation: TypePrestationAddForm,
        client: ClientAddForm,
    };

    const submitRef = useRef();
    const [formValues, setFormValues] = useState({});

    /*
     * without the useEffect hook, the onConfirm function would be called before the state is updated
     * and the formValues would be empty. This way, the onConfirm function is called only when the
     * formValues state is updated.
     */
    useEffect(() => {
        if (Object.keys(formValues).length > 0) {
            props.onConfirm &&
                props.onConfirm({ ...formValues, type: props.type });
            props.onDismiss && props.onDismiss();
            setFormValues({});
        }
    }, [formValues, props]);

    return (
        <Modal isOpen={props.isOpen} onClose={props.onDismiss} size={"xl"}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Ajouter</ModalHeader>
                        <ModalBody>
                            {(props.type &&
                                // @ts-expect-error props.type is used to select the form to display
                                forms[props.type] &&
                                // @ts-expect-error props.type is used to select the form to display
                                forms[props.type]({
                                    submitRef: submitRef,
                                    onSubmit: (formValues: object) =>
                                        setFormValues(formValues),
                                })) || <div>Erreur</div>}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={() => {
                                    // @ts-expect-error submitRef here is used to trigger the form submit in the child component
                                    submitRef.current.click();
                                }}
                                color={"primary"}
                            >
                                Ajouter
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
    );
}

export default AddDialog;
