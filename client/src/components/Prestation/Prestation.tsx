import PrestationForm from "./PrestationForm.tsx";

function Prestation() {

    //todo : fetch avec api
    const typePrestations = [
        {label: "Vitrerie", value: 1},
        {label: "Nettoyage", value: 2},
    ];

    //todo : fetch avec api
    const prestations = [
        {label: "Nettoyage vitres", idTypePrestation: 1, id: 1},
        {label: "Décapage vitres", idTypePrestation: 1, id: 2},
        {label: "Nettoyage sols", idTypePrestation: 2, id: 3},
        {label: "Nettoyage murs", idTypePrestation: 2, id: 4},
    ];

    //todo : fetch avec api
    const intervenants = [
        {prenom: "Intervenant", nom: "1", id: 1},
        {prenom: "Intervenant", nom: "2", id: 2},
        {prenom: "Intervenant", nom: "3", id: 3},
        {prenom: "Intervenant", nom: "4", id: 4},
        {prenom: "Intervenant", nom: "5", id: 5},
    ];

    //todo : fetch avec api
    const clients = [
        {idClient: 1, nomEntreprise: "Entreprise 1", adresse: "Adresse 1", adresseMail: "Mail 1"},
        {idClient: 2, nomEntreprise: "Entreprise 2", adresse: "Adresse 2", adresseMail: "Mail 2"},
        {idClient: 3, nomEntreprise: "Entreprise 3", adresse: "Adresse 3", adresseMail: "Mail 3"},
    ];

    return (
        <PrestationForm
            typePrestations={typePrestations}
            prestations={prestations}
            intervenants={intervenants}
            clients={clients}
        />
    )
}

export default Prestation
