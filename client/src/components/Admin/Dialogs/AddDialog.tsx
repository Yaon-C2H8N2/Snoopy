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

  return (
    <Modal isOpen={props.isOpen} onClose={props.onDismiss}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Ajouter</ModalHeader>
            <ModalBody>
              {
                // @ts-expect-error type nécessaire pour le formulaire dynamique
                (props.type && forms[props.type] && forms[props.type]()) || (
                  <div>Erreur</div>
                )
              }
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  props.onConfirm &&
                    props.onConfirm({ message: "Ajout " + props.type });
                  onClose();
                }}
                color={"primary"}
              >
                Ajouter
              </Button>
              <Button onClick={onClose} color={"primary"} variant={"light"}>
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
