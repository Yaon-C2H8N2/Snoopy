 import PrestationForm from "./PrestationForm.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
 import Network from "../Network/Network.ts";

function Prestation() {
    const navigate = useNavigate();

    const [typePrestations, setTypePrestations] = useState(Array<{
        nomTypePrestation: string,
        idTypePrestation: number
    }>);
    const [prestations, setPrestations] = useState(Array<{
        nomPrestation: string,
        idTypePrestation: number,
        idPrestation: number
    }>);
    const [intervenants, setIntervenants] = useState(Array<{
        nom: string,
        prenom: string,
        idEmploye: number
    }>);
    const [clients, setClients] = useState(Array<{
        idClient: number,
        nomEntreprise: string,
        adresse: string,
        adresseMail: string
    }>);

    useEffect(() => {
        Network.fetch("/api/prestation/type/prestation", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setTypePrestations(data);
            });
        Network.fetch("/api/prestation", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setPrestations(data);
            });
        Network.fetch("/api/employe", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setIntervenants(data);
            });
        Network.fetch("/api/client", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setClients(data);
            });
    }, [])

    const handleValidate = async (prestationIntervention: object) => {
        console.log(prestationIntervention);
        const response = await Network.fetch("/api/prestation/save", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(prestationIntervention),
        })
            .then((response) => (response.json()))
            .then((data) => {
                return data;
            });
        navigate('/recap', {state: {idPrestationIntervention: response.idPrestationIntervention}})
    }

    return (
        <PrestationForm
            typePrestations={typePrestations}
            prestations={prestations}
            intervenants={intervenants}
            clients={clients}
            onValidate={(prestationIntervention) => handleValidate(prestationIntervention)}
        />
    )
}

export default Prestation
