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
                setUtilisateurs(data);
            });
        Network.fetch("/api/prestation", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setPrestations(data);
            });
        Network.fetch("/api/prestation/type/prestation", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setTypePrestations(data);
            });
        Network.fetch("/api/client", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
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
                                    columns={["idUtilisateur", "username", "role"]}
                                />
                            </Card>
                        </Tab>
                        <Tab key={"type-prestations"} title={"Type prestations"}>
                            <Card>
                                <AdminList
                                    content={typePrestations}
                                    columns={["idTypePrestation", "nomTypePrestation"]}
                                />
                            </Card>
                        </Tab>
                        <Tab key={"prestations"} title={"Prestations"}>
                            <Card>
                                <AdminList
                                    content={prestations}
                                    columns={["idPrestation", "idTypePrestation", "nomPrestation"]}
                                />
                            </Card>
                        </Tab>
                        <Tab key={"clients"} title={"Clients"}>
                            <Card>
                                <AdminList
                                    content={clients}
                                    columns={["idClient", "nomEntreprise", "adresse", "adresseMail"]}
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