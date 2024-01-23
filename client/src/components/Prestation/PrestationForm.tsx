import {Autocomplete, AutocompleteItem, Button, Checkbox, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {useState} from "react";
import SignatureCanvas from 'react-signature-canvas';

//definition des props
type PrestationFormProps = {
    typePrestations: { nomTypePrestation: string, idTypePrestation: number }[],
    intervenants: { nom: string, prenom: string, idEmploye: number }[],
    prestations: { nomPrestation: string, idTypePrestation: number, idPrestation: number }[],
    clients: { idClient: number, nomEntreprise: string, adresse: string, adresseMail: string }[],
    onValidate: (prestationIntervention: object, base64signature: string) => void,
}

function PrestationForm(props: PrestationFormProps) {
    const [selectedIntervenants, setSelectedIntervenants] = useState(Array<{
        nom: string,
        prenom: string,
        idEmploye: number
    }>);
    const [selectedIntervenantId, setSelectedIntervenantId] = useState<number>();
    const [prestationIntervention, setPrestationIntervention] = useState<{
        idPrestation: number,
        idClient: number,
        datePrestation: string,
        heureDebut: string,
        heureFin: string,
        interieur: boolean,
        exterieur: boolean,
        commentaire: string,
    }>({
        idPrestation: -1,
        idClient: -1,
        datePrestation: "",
        heureDebut: "",
        heureFin: "",
        interieur: false,
        exterieur: false,
        commentaire: "",
    });

    let canvasRef: SignatureCanvas | null;

    const handleAjoutIntervenant = () => {
        if (selectedIntervenantId) {
            const intervenant = props.intervenants.find((intervenant) => intervenant.idEmploye === selectedIntervenantId);
            if (intervenant && !selectedIntervenants.includes(intervenant)) {
                setSelectedIntervenants([...selectedIntervenants, intervenant]);
            }
        }
    }

    const handleValidate = () => {
        setPrestationIntervention({...prestationIntervention, datePrestation: new Date().toISOString()})
        props.onValidate(prestationIntervention, canvasRef?.toDataURL() || "");
    }

    return (
        <>
            <div className={"w-2/6 min-w-96 flex flex-col space-y-5"}>
                <div className={"flex flex-row items-center"}>
                    <div>Type de prestation</div>
                    <Select
                        id={"typePrestation"}
                        label="Sélectionnez un type de prestation"
                    >
                        {props.typePrestations.map((typePrestation) => (
                            <SelectItem key={typePrestation.idTypePrestation} value={typePrestation.idTypePrestation}>
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
                            onChange={(event) => {
                                setPrestationIntervention({
                                    ...prestationIntervention,
                                    idPrestation: Number(event.target.value)
                                })
                            }}
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
                            <Checkbox onChange={(event) => {
                                setPrestationIntervention({
                                    ...prestationIntervention,
                                    interieur: Boolean(event.target.checked)
                                })
                            }}>Interieur</Checkbox>
                        </div>
                        <div>
                            <Checkbox onChange={(event) => {
                                setPrestationIntervention({
                                    ...prestationIntervention,
                                    exterieur: Boolean(event.target.checked)
                                })
                            }}>Exterieur</Checkbox>
                        </div>
                    </div>
                    <div className={"flex flex-row items-center space-x-5"}>
                        <div>Client</div>
                        <Select
                            label="Sélectionnez un client"
                            onChange={(event) => {
                                setPrestationIntervention({
                                    ...prestationIntervention,
                                    idClient: Number(event.target.value)
                                })
                            }}
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
                        <Input type={"time"} onChange={(event) => {
                            setPrestationIntervention({
                                ...prestationIntervention,
                                heureDebut: event.target.value
                            })
                        }}/>
                    </div>
                    <div className={"flex flex-row w-full"}>
                        <div>Heure de fin</div>
                        <Input type={"time"} onChange={(event) => {
                            setPrestationIntervention({
                                ...prestationIntervention,
                                heureFin: event.target.value
                            })
                        }}/>
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
                        onChange={(event) => {
                            setPrestationIntervention({
                                ...prestationIntervention,
                                commentaire: event.target.value
                            })
                        }}
                    />
                </div>
            </div>
            <div className={"flex flex-row justify-center w-full"}>
                <Button
                    color={"primary"}
                    variant={"shadow"}
                    onClick={() => {
                        handleValidate();
                    }}
                >
                    Valider
                </Button>
            </div>
        </>
    )
}

export default PrestationForm
