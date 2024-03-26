import {useEffect, useState} from "react";
import Network from "../Network/Network.ts";
import {Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

type PrestationIntervention = {
    idPrestationIntervention: number,
    idPrestation: number,
    idClient: number,
    datePrestation: string,
    heureDebut: string,
    heureFin: string,
    interieur: boolean,
    exterieur: boolean,
    commentaire: string,
    confirmationSignature: boolean,
    signature: string
}

type Client = {
    idClient: number,
    nomEntreprise: string,
    adresse: string,
    adresseMail: string
}

const PrestationList = () => {
    const navigate = useNavigate();
    const [prestations, setPrestations] = useState(Array<PrestationIntervention>);
    const [clients, setClients] = useState(Array<Client>);

    useEffect(() => {
        Network.fetch("/api/prestation/intervention", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setPrestations(data);
            });
        Network.fetch("/api/client", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setClients(data);
            });
    }, []);

    const handleValidate = (prestation: PrestationIntervention) => {
        navigate('/prestation/recap', {state: {idPrestationIntervention: prestation.idPrestationIntervention}})
    }

    const columns: string[] = ['Nº', 'Client', 'Date', 'Heure début', 'Heure fin', 'Intérieur/Extérieur', 'Action'];

    return (
        <div className={"flex flex-wrap justify-center items-center min-h-[100vh]"}>
            <div className={"flex flex-col space-y-5 w-4/6"}>
                <h1 className={"text-3xl text-center"}>Historique des prestations</h1>
                <Card className={"max-h-[80vh] overflow-auto"}>
                    <Table aria-label={"Table des interventions"}>
                        <TableHeader>
                            {columns.map((column) => {
                                return (
                                    <TableColumn className={"text-center"} key={column}>{column}</TableColumn>
                                );
                            })}
                        </TableHeader>
                        <TableBody>
                            {prestations.map((prestation: PrestationIntervention) => {
                                return (
                                    <TableRow key={prestation.idPrestationIntervention}>
                                        <TableCell
                                            className={"text-center"}>{prestation.idPrestationIntervention}</TableCell>
                                        <TableCell
                                            className={"text-center"}>{clients.find((client) => (client.idClient === prestation.idClient))?.nomEntreprise}</TableCell>
                                        <TableCell className={"text-center"}>{prestation.datePrestation}</TableCell>
                                        <TableCell className={"text-center"}>{prestation.heureDebut}</TableCell>
                                        <TableCell className={"text-center"}>{prestation.heureFin}</TableCell>
                                        <TableCell
                                            className={"text-center"}>{prestation.interieur && prestation.exterieur ? "Intérieur et extérieur" : prestation.interieur ? "Intérieur" : prestation.exterieur ? "Extérieur" : "Non renseigné"}</TableCell>
                                        <TableCell>
                                            <Button
                                                className={"w-full"}
                                                color={"primary"}
                                                variant={"shadow"}
                                                onClick={() => handleValidate(prestation)}
                                            >
                                                Détails
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}

export default PrestationList;