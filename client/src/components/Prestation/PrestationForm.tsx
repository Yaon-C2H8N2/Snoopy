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
            <div className={"items-center flex"}>
                <div>Type de prestation</div>
                <Select
                    label="Sélectionnez un type de prestation"
                    className="max-w-xs"
                >
                    {props.typePrestations.map((typePrestation) => (
                        <SelectItem key={typePrestation.value} value={typePrestation.value}>
                            {typePrestation.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <h2 className={"text-9xl"}>Intervenants sur la prestation :</h2>
            <div className={"items-center flex-col"}>
                <ol>
                    {selectedIntervenants.length > 0 ? selectedIntervenants.map((intervenant) => (
                        <li key={props.intervenants[intervenant].id}>
                            {props.intervenants[intervenant].prenom + " " + props.intervenants[intervenant].nom}
                        </li>
                    )) : <li>Aucun intervenant sélectionné</li>
                    }
                </ol>
                <div className={"flex items-center w-screen"}>
                    <Autocomplete
                        label="Ajouter un intervenant"
                        placeholder="Nom de l'intervenant"
                        className="max-w-xs"
                        defaultItems={props.intervenants}
                    >
                        {(intervenant) => <AutocompleteItem
                            key={intervenant.id}>{intervenant.prenom + " " + intervenant.nom}</AutocompleteItem>}
                    </Autocomplete>
                    <Button color={"primary"} variant={"shadow"}
                            onClick={() => setSelectedIntervenants([1, 2, 3])}>Ajouter</Button>
                </div>
            </div>
            <h2>Informations sur la prestation :</h2>
            <div className={"items-center flex-col"}>
                <div className={"flex items-center w-screen"}>
                    <div>Prestation</div>
                    <Select
                        label="Sélectionnez une prestation"
                        className="max-w-xs"
                    >
                        {props.prestations.map((prestation) => (
                            <SelectItem key={prestation.id} value={prestation.label}>
                                {prestation.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className={"flex items-center w-screen"}>
                    <div>Client</div>
                    <Select
                        label="Sélectionnez un client"
                        className="max-w-xs"
                    >
                        {props.clients.map((client) => (
                            <SelectItem key={client.idClient} value={client.nomEntreprise}>
                                {client.nomEntreprise}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className={"flex-col items-center w-screen"}>
                    <div>
                        <Checkbox>Interieur</Checkbox>
                    </div>
                    <div>
                        <Checkbox>Exterieur</Checkbox>
                    </div>
                </div>
                <div className={"flex items-center w-screen"}>
                    <div>
                        <div>Heure de début</div>
                        <Input type={"time"}/>
                    </div>
                    <div>
                        <div>Heure de fin</div>
                        <Input type={"time"}/>
                    </div>
                </div>
            </div>
            <h2>Signature du client :</h2>
            <div className={"items-center flex-col"}>
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
            <h2>Commentaires :</h2>
            <div className={"items-center flex-col"}>
                <Textarea
                    label="Commentaires"
                    placeholder="Commentaires sur la prestation"
                    className="max-w-xs"
                />
            </div>
            <Button color={"primary"} variant={"shadow"}
                    onClick={() => props.onValidate(canvasRef?.toDataURL() || "")}>Valider</Button>
        </>
    )
}

export default PrestationForm
