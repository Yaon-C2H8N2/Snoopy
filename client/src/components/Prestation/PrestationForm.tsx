import {Autocomplete, AutocompleteItem, Button, Checkbox, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {useState} from "react";
import SignatureCanvas from 'react-signature-canvas';

//definition des props
type PrestationFormProps = {
    typePrestations: { label: string, value: number }[],
    intervenants: { nom: string, prenom: string, id: number }[],
    prestations: { label: string, idTypePrestation: number, id: number }[],
    clients: { idClient: number, nomEntreprise: string, adresse: string, adresseMail: string }[],
    onValidate: (base64signature: string) => void,
}

function PrestationForm(props: PrestationFormProps) {
    const [selectedIntervenants, setSelectedIntervenants] = useState(Array<number>);

    let canvasRef: SignatureCanvas | null;

    return (
        <>
            <div className={"w-2/6 min-w-96 flex flex-col space-y-5"}>
                <div className={"flex flex-row items-center"}>
                    <div>Type de prestation</div>
                    <Select
                        label="Sélectionnez un type de prestation"
                    >
                        {props.typePrestations.map((typePrestation) => (
                            <SelectItem key={typePrestation.value} value={typePrestation.value}>
                                {typePrestation.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className={"flex flex-col space-y-2.5"}>
                    <h2>Intervenants sur la prestation :</h2>
                    <ol>
                        {selectedIntervenants.length > 0 ? selectedIntervenants.map((intervenant) => (
                            <li key={props.intervenants[intervenant].id}>
                                {props.intervenants[intervenant].prenom + " " + props.intervenants[intervenant].nom}
                            </li>
                        )) : <li>Aucun intervenant sélectionné</li>
                        }
                    </ol>
                    <div className={"flex flex-row items-center space-x-5"}>
                        <Autocomplete
                            label="Ajouter un intervenant"
                            placeholder="Nom de l'intervenant"
                            defaultItems={props.intervenants}
                        >
                            {(intervenant) => <AutocompleteItem
                                key={intervenant.id}>{intervenant.prenom + " " + intervenant.nom}</AutocompleteItem>}
                        </Autocomplete>
                        <Button
                            color={"primary"}
                            variant={"shadow"}
                            onClick={() => setSelectedIntervenants([1, 2, 3])}
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
                        >
                            {props.prestations.map((prestation) => (
                                <SelectItem key={prestation.id} value={prestation.label}>
                                    {prestation.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className={"flex flex-row items-center space-x-5"}>
                        <div>Client</div>
                        <Select
                            label="Sélectionnez un client"
                        >
                            {props.clients.map((client) => (
                                <SelectItem key={client.idClient} value={client.nomEntreprise}>
                                    {client.nomEntreprise}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className={"flex flex-row items-center space-x-5"}>
                        <div>
                            <Checkbox>Interieur</Checkbox>
                        </div>
                        <div>
                            <Checkbox>Exterieur</Checkbox>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-2/6 min-w-96 flex flex-col space-y-5"}>
                <div className={"flex flex-row justify-center space-x-5"}>
                    <div className={"flex flex-row w-full"}>
                        <div>Heure de début</div>
                        <Input type={"time"}/>
                    </div>
                    <div className={"flex flex-row w-full"}>
                        <div>Heure de fin</div>
                        <Input type={"time"}/>
                    </div>
                </div>
                <div className={"flex flex-col justify-center space-y-2.5"}>
                    <h2>Signature du client :</h2>
                    <div>
                        <Checkbox>Le client n'a pas souhaité signer le bon</Checkbox>
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
                    />
                </div>
            </div>
            <div className={"flex flex-row justify-center w-full"}>
                <Button
                    color={"primary"}
                    variant={"shadow"}
                    onClick={() => props.onValidate(canvasRef?.toDataURL() || "")}
                >
                    Valider
                </Button>
            </div>
        </>
    )
}

export default PrestationForm
