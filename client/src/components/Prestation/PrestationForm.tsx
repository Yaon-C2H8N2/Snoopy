import {Autocomplete, AutocompleteItem, Button, Checkbox, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {FormEvent, useState} from "react";
import SignatureCanvas from 'react-signature-canvas';

//definition des props
type PrestationFormProps = {
    typePrestations: { nomTypePrestation: string, idTypePrestation: number }[],
    intervenants: { nom: string, prenom: string, idEmploye: number }[],
    prestations: { nomPrestation: string, idTypePrestation: number, idPrestation: number }[],
    clients: { idClient: number, nomEntreprise: string, adresse: string, adresseMail: string }[],
    onValidate: (prestationIntervention: object) => void,
}

function PrestationForm(props: PrestationFormProps) {
    const [selectedIntervenants, setSelectedIntervenants] = useState(Array<{
        nom: string,
        prenom: string,
        idEmploye: number
    }>);
    const [selectedIntervenantId, setSelectedIntervenantId] = useState<number>();

    let canvasRef: SignatureCanvas | null;

    const handleAjoutIntervenant = () => {
        if (selectedIntervenantId) {
            const intervenant = props.intervenants.find((intervenant) => intervenant.idEmploye === selectedIntervenantId);
            if (intervenant && !selectedIntervenants.includes(intervenant)) {
                setSelectedIntervenants([...selectedIntervenants, intervenant]);
            }
        }
    }

    const handleValidate = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const prestationIntervention = {
            idPrestation: formData.get("idPrestation"),
            idClient: formData.get("idClient"),
            datePrestation: "",
            heureDebut: formData.get("heureDebut"),
            heureFin: formData.get("heureFin"),
            interieur: formData.get("interieur") !== null,
            exterieur: formData.get("exterieur") !== null,
            commentaire: formData.get("commentaire"),
            confirmationSignature: !formData.get("confirmation_signature"),
            //problem with format (it includes the type of the image, ence the split, which isn't needed here as the api only supports base64)
            signature: canvasRef?.toDataURL().split(",", 2)[1] || "",
        };
        props.onValidate(prestationIntervention);
    }

    return (
        <form onSubmit={handleValidate} className={"flex flex-wrap justify-center shrink-0 space-x-5 space-y-5 mt-40"}>
            <div className={"w-2/6 min-w-96 flex flex-col space-y-5"}>
                <div className={"flex flex-row items-center"}>
                    <div>Type de prestation</div>
                    <Select
                        id={"typePrestation"}
                        label="Sélectionnez un type de prestation"
                        name={"typePrestation"}
                    >
                        {props.typePrestations.map((typePrestation) => (
                            <SelectItem key={typePrestation.idTypePrestation}
                                        value={typePrestation.idTypePrestation}>
                                {typePrestation.nomTypePrestation}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className={"flex flex-col space-y-2.5"}>
                    <h2>Intervenants sur la prestation :</h2>
                    <ol>
                        {selectedIntervenants.length > 0 ? selectedIntervenants.map((selectedIntervenant) => (
                            <li key={selectedIntervenant?.idEmploye}>{selectedIntervenant?.prenom + " " + selectedIntervenant?.nom}</li>
                        )) : <li>Aucun intervenant sélectionné</li>
                        }
                    </ol>
                    <div className={"flex flex-row items-center space-x-5"}>
                        <Autocomplete
                            label="Ajouter un intervenant"
                            placeholder="Nom de l'intervenant"
                            onSelectionChange={(value) => setSelectedIntervenantId(Number(value))}
                            name={"listIntervenants"}
                        >
                            {props.intervenants.map((intervenant) => {
                                return (
                                    <AutocompleteItem
                                        key={intervenant.idEmploye}
                                    >
                                        {intervenant.prenom + " " + intervenant.nom}
                                    </AutocompleteItem>
                                )
                            })}
                        </Autocomplete>
                        <Button
                            color={"primary"}
                            variant={"shadow"}
                            onClick={() => handleAjoutIntervenant()}
                        >
                            Ajouter
                        </Button>
                    </div>
                </div>
                <div className={"flex flex-col space-y-2.5"}>
                    <h2>Informations sur la prestation :</h2>
                    <div className={"flex flex-row items-center space-x-5"}>
                        <div>Prestation</div>
                        <Select
                            label="Sélectionnez une prestation"
                            name={"idPrestation"}
                            isRequired={true}
                        >
                            {props.prestations.map((prestation) => (
                                <SelectItem key={prestation.idPrestation} value={prestation.idPrestation}>
                                    {prestation.nomPrestation}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className={"flex flex-row items-center space-x-5"}>
                        <div>
                            <Checkbox name={"interieur"}>Interieur</Checkbox>
                        </div>
                        <div>
                            <Checkbox name={"exterieur"}>Exterieur</Checkbox>
                        </div>
                    </div>
                    <div className={"flex flex-row items-center space-x-5"}>
                        <div>Client</div>
                        <Select
                            label="Sélectionnez un client"
                            name={"idClient"}
                            isRequired={true}
                        >
                            {props.clients.map((client) => (
                                <SelectItem key={client.idClient} value={client.nomEntreprise}>
                                    {client.nomEntreprise}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
            <div className={"w-2/6 min-w-96 flex flex-col space-y-5"}>
                <div className={"flex flex-row justify-center space-x-5"}>
                    <div className={"flex flex-row w-full"}>
                        <div>Heure de début</div>
                        <Input type={"time"} name={"heureDebut"} isRequired={true}/>
                    </div>
                    <div className={"flex flex-row w-full"}>
                        <div>Heure de fin</div>
                        <Input type={"time"} name={"heureFin"} isRequired={true}/>
                    </div>
                </div>
                <div className={"flex flex-col justify-center space-y-2.5"}>
                    <h2>Signature du client :</h2>
                    <div>
                        <Checkbox name={"confirmation_signature"}>Le client n'a pas souhaité signer le bon</Checkbox>
                    </div>
                    <SignatureCanvas
                        penColor="black"
                        backgroundColor={"transparent"}
                        canvasProps={{width: 500, height: 100}}
                        ref={(ref) => {
                            canvasRef = ref
                        }}
                    />
                </div>
                <div className={"flex flex-col justify-center space-y-2.5"}>
                    <h2>Commentaires :</h2>
                    <Textarea
                        label="Commentaires"
                        placeholder="Commentaires sur la prestation"
                        name={"commentaire"}
                    />
                </div>
            </div>
            <div className={"flex flex-row justify-center w-full"}>
                <Button
                    color={"primary"}
                    variant={"shadow"}
                    type={"submit"}
                >
                    Valider
                </Button>
            </div>
        </form>
    )
}

export default PrestationForm
