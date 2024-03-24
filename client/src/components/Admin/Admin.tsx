import {Card, Tab, Tabs} from "@nextui-org/react";
import AdminList from "./AdminList.tsx";
import {useEffect, useState} from "react";
import Network from "../Network/Network.ts";

function Admin() {
    const [utilisateurs, setUtilisateurs] = useState(Array<object>);
    const [prestations, setPrestations] = useState(Array<object>);
    const [typePrestations, setTypePrestations] = useState(Array<object>);
    const [clients, setClients] = useState(Array<object>);

    useEffect(() => {
        Network.fetch("/api/admin/utilisateurs", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                //@ts-expect-error key nécessaire pour la table de NextUI
                data.forEach((elem: object, index: number) => (elem.key = index))
                setUtilisateurs(data);
            });
        Network.fetch("/api/prestation", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                //@ts-expect-error key nécessaire pour la table de NextUI
                data.forEach((elem: object, index: number) => (elem.key = index))
                setPrestations(data);
            });
        Network.fetch("/api/prestation/type/prestation", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                //@ts-expect-error key nécessaire pour la table de NextUI
                data.forEach((elem: object, index: number) => (elem.key = index))
                setTypePrestations(data);
            });
        Network.fetch("/api/client", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                //@ts-expect-error key nécessaire pour la table de NextUI
                data.forEach((elem: object, index: number) => (elem.key = index))
                setClients(data);
            });
    }, []);

    return (
        <div className={"flex flex-wrap justify-center items-center min-h-[100vh]"}>
            <div className={"flex flex-col w-4/6 gap-5"}>
                <h1 className={"text-3xl text-center"}>Administration</h1>
                <div>
                    <Tabs>
                        <Tab key={"utilisateurs"} title={"Utilisateurs"}>
                            <Card>
                                <AdminList
                                    content={utilisateurs}
                                    columns={[
                                        {key: "idUtilisateur", label: "Id utilisateur"},
                                        {key: "username", label: "Nom d'utilisateur"},
                                        {key: "role", label: "Rôle"}
                                    ]}
                                />
                            </Card>
                        </Tab>
                        <Tab key={"type-prestations"} title={"Type prestations"}>
                            <Card>
                                <AdminList
                                    content={typePrestations}
                                    columns={[
                                        {key: "idTypePrestation", label: "Id type prestation"},
                                        {key: "nomTypePrestation", label: "Nom type prestation"}
                                    ]}
                                />
                            </Card>
                        </Tab>
                        <Tab key={"prestations"} title={"Prestations"}>
                            <Card>
                                <AdminList
                                    content={prestations}
                                    columns={[
                                        {key: "idPrestation", label: "Id type prestation"},
                                        {key: "idTypePrestation", label: "Nom type prestation"},
                                        {key: "nomPrestation", label: "Nom prestation"}
                                    ]}
                                />
                            </Card>
                        </Tab>
                        <Tab key={"clients"} title={"Clients"}>
                            <Card>
                                <AdminList
                                    content={clients}
                                    columns={[
                                        {key: "idClient", label: "Id client"},
                                        {key: "nomEntreprise", label: "Nom entreprise"},
                                        {key: "adresse", label: "Adresse"},
                                        {key: "adresseMail", label: "Adresse mail"}
                                    ]}
                                />
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Admin;