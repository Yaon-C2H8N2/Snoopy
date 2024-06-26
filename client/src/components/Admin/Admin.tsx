import { Card, Tab, Tabs } from "@nextui-org/react";
import AdminList from "./AdminList.tsx";
import { useEffect, useState } from "react";
import Network from "../Network/Network.ts";
import DeleteDialog from "./Dialogs/DeleteDialog.tsx";
import AddDialog from "./Dialogs/AddDialog.tsx";

function Admin() {
    const [utilisateurs, setUtilisateurs] = useState(Array<object>);
    const [prestations, setPrestations] = useState(Array<object>);
    const [typePrestations, setTypePrestations] = useState(Array<object>);
    const [clients, setClients] = useState(Array<object>);
    const [openDeleteModal, setDeleteOpenModal] = useState(false);
    const [openAddModal, setAddOpenModal] = useState(false);
    const [selectedElem, setSelectedElem] = useState<object>();
    const [addType, setAddType] = useState<string>();

    useEffect(() => {
        Network.fetch("/api/admin/utilisateurs", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.map(
                    (
                        elem: {
                            idUtilisateur: string;
                            username: string;
                            role: string;
                            key: number | undefined;
                        },
                        index: number,
                    ) => ({
                        idUtilisateur: elem.idUtilisateur,
                        username: elem.username,
                        role: elem.role,
                        key: index,
                        type: "utilisateur",
                    }),
                );
                setUtilisateurs(filteredData);
            });
        Network.fetch("/api/prestation", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                data.forEach((elem: object, index: number) => {
                    //@ts-expect-error key nécessaire pour la table de NextUI
                    elem.key = index;
                    //@ts-expect-error type nécessaire pour la suppression depuis le formulaire dynamique
                    elem.type = "prestation";
                });
                setPrestations(data);
            });
        Network.fetch("/api/prestation/type/prestation", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                data.forEach((elem: object, index: number) => {
                    //@ts-expect-error key nécessaire pour la table de NextUI
                    elem.key = index;
                    //@ts-expect-error type nécessaire pour la suppression depuis le formulaire dynamique
                    elem.type = "typePrestation";
                });
                setTypePrestations(data);
            });
        Network.fetch("/api/client", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                data.forEach((elem: object, index: number) => {
                    //@ts-expect-error key nécessaire pour la table de NextUI
                    elem.key = index;
                    //@ts-expect-error type nécessaire pour la suppression depuis le formulaire dynamique
                    elem.type = "client";
                });
                setClients(data);
            });
    }, []);

    function openDelete(elem: object) {
        setDeleteOpenModal(true);
        setSelectedElem(elem);
    }

    function openAdd(type: string) {
        setAddType(type);
        setAddOpenModal(true);
    }

    function handleAdd(elem: object | undefined) {
        console.log("Ajout d'un élément", elem);
        //@ts-expect-error type nécessaire pour la suppression depuis le formulaire dynamique
        switch (elem?.type) {
            case "utilisateur":
                Network.fetch("/api/admin/utilisateur", {
                    method: "PUT",
                    body: JSON.stringify({
                        //@ts-expect-error idPrestation nécessaire pour la suppression depuis le formulaire dynamique
                        username: elem["username"],
                        //@ts-expect-error idPrestation nécessaire pour la suppression depuis le formulaire dynamique
                        password: elem["password"],
                        //@ts-expect-error idPrestation nécessaire pour la suppression depuis le formulaire dynamique
                        role: elem["role"],
                    }),
                }).then((response) => response.json());
                break;
        }
    }

    function handleDelete(elem: object | undefined) {
        //@ts-expect-error type nécessaire pour la suppression depuis le formulaire dynamique
        switch (elem?.type) {
            case "utilisateur":
                Network.fetch(
                    "/api/admin/utilisateur/" +
                        (elem as { idUtilisateur: string }).idUtilisateur,
                    {
                        method: "DELETE",
                    },
                )
                    .then((response) => response.json())
                    .then(() => {
                        setUtilisateurs(
                            utilisateurs.filter((user) => {
                                return (
                                    //@ts-expect-error idUtilisateur nécessaire pour la suppression depuis le formulaire dynamique
                                    user.idUtilisateur !== elem.idUtilisateur
                                );
                            }),
                        );
                    });
                break;
            case "prestation":
                Network.fetch(
                    "/api/admin/prestation/" +
                        (elem as { idPrestation: string }).idPrestation,
                    {
                        method: "DELETE",
                    },
                )
                    .then((response) => response.json())
                    .then(() => {
                        setPrestations(
                            prestations.filter((prestation) => {
                                return (
                                    //@ts-expect-error idPrestation nécessaire pour la suppression depuis le formulaire dynamique
                                    prestation.idPrestation !==
                                    //@ts-expect-error idPrestation nécessaire pour la suppression depuis le formulaire dynamique
                                    elem.idPrestation
                                );
                            }),
                        );
                    });
                break;
            case "typePrestation":
                Network.fetch(
                    "/api/admin/typeprestation/" +
                        (elem as { idTypePrestation: string }).idTypePrestation,
                    {
                        method: "DELETE",
                    },
                )
                    .then((response) => response.json())
                    .then(() => {
                        setTypePrestations(
                            typePrestations.filter((typePrestation) => {
                                return (
                                    //@ts-expect-error type nécessaire pour la suppression depuis le formulaire dynamique
                                    typePrestation.idTypePrestation !==
                                    //@ts-expect-error idPrestation nécessaire pour la suppression depuis le formulaire dynamique
                                    elem.idTypePrestation
                                );
                            }),
                        );
                    });
                break;
            case "client":
                console.log("Suppression d'un client", elem);
                break;
        }
        setDeleteOpenModal(false);
    }

    function dismissModal() {
        setDeleteOpenModal(false);
        setAddOpenModal(false);
    }

    return (
        <div
            className={
                "flex flex-wrap justify-center items-center min-h-[100vh]"
            }
        >
            <DeleteDialog
                elem={selectedElem}
                isOpen={openDeleteModal}
                onDismiss={dismissModal}
                onConfirm={(elem) => handleDelete(elem)}
            />
            <AddDialog
                isOpen={openAddModal}
                type={addType}
                onDismiss={dismissModal}
                onConfirm={(elem) => handleAdd(elem)}
            />
            <div className={"flex flex-col w-4/6 gap-5"}>
                <h1 className={"text-3xl text-center"}>Administration</h1>
                <div>
                    <Tabs>
                        <Tab key={"utilisateurs"} title={"Utilisateurs"}>
                            <Card>
                                <AdminList
                                    content={utilisateurs}
                                    onDelete={(elem) => openDelete(elem)}
                                    onAdd={() => openAdd("utilisateur")}
                                    columns={[
                                        {
                                            key: "idUtilisateur",
                                            label: "Id utilisateur",
                                        },
                                        {
                                            key: "username",
                                            label: "Nom d'utilisateur",
                                        },
                                        { key: "role", label: "Rôle" },
                                        { key: "action", label: "" },
                                    ]}
                                />
                            </Card>
                        </Tab>
                        <Tab
                            key={"type-prestations"}
                            title={"Type prestations"}
                        >
                            <Card>
                                <AdminList
                                    content={typePrestations}
                                    onDelete={(elem) => openDelete(elem)}
                                    onAdd={() => openAdd("typePrestation")}
                                    columns={[
                                        {
                                            key: "idTypePrestation",
                                            label: "Id type prestation",
                                        },
                                        {
                                            key: "nomTypePrestation",
                                            label: "Nom type prestation",
                                        },
                                        { key: "action", label: "" },
                                    ]}
                                />
                            </Card>
                        </Tab>
                        <Tab key={"prestations"} title={"Prestations"}>
                            <Card>
                                <AdminList
                                    content={prestations}
                                    onDelete={(elem) => openDelete(elem)}
                                    onAdd={() => openAdd("prestation")}
                                    columns={[
                                        {
                                            key: "idPrestation",
                                            label: "Id type prestation",
                                        },
                                        {
                                            key: "idTypePrestation",
                                            label: "Nom type prestation",
                                        },
                                        {
                                            key: "nomPrestation",
                                            label: "Nom prestation",
                                        },
                                        { key: "action", label: "" },
                                    ]}
                                />
                            </Card>
                        </Tab>
                        <Tab key={"clients"} title={"Clients"}>
                            <Card>
                                <AdminList
                                    content={clients}
                                    onDelete={(elem) => openDelete(elem)}
                                    onAdd={() => openAdd("client")}
                                    columns={[
                                        { key: "idClient", label: "Id client" },
                                        {
                                            key: "nomEntreprise",
                                            label: "Nom entreprise",
                                        },
                                        { key: "adresse", label: "Adresse" },
                                        {
                                            key: "adresseMail",
                                            label: "Adresse mail",
                                        },
                                        { key: "action", label: "" },
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
