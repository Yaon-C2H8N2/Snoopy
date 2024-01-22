import PrestationForm from "./PrestationForm.tsx";
import {useEffect, useState} from "react";

function Prestation() {
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
        fetch("/api/prestation/type/prestation", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setTypePrestations(data);
            });
        fetch("/api/prestation", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setPrestations(data);
            });
        fetch("/api/employe", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setIntervenants(data);
            });
        fetch("/api/client", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setClients(data);
            });
    }, [])

    return (
        <div className={"flex flex-wrap justify-center shrink-0 space-x-5 space-y-5"}>
            <PrestationForm
                typePrestations={typePrestations}
                prestations={prestations}
                intervenants={intervenants}
                clients={clients}
                onValidate={(base64signature) => console.log(base64signature)}
            />
        </div>
    )
}

export default Prestation
