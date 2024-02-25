import {useEffect, useState} from "react";
import Network from "../Network/Network.ts";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

const PrestationList = () => {
    const navigate = useNavigate();
    const [prestations, setPrestations] = useState(Array<object>);

    useEffect(() => {
        Network.fetch("/api/prestation/intervention", {
            method: "GET",
        })
            .then((response) => (response.json()))
            .then((data) => {
                setPrestations(data);
            });
    }, []);

    //todo : replace object type
    const handleValidate = (prestation: object) => {
        navigate('/prestation/recap', {state: {idPrestationIntervention: prestation.idPrestationIntervention}})
    }

    return (
        <div className={"flex flex-col"}>
            <h1 className={"text-3xl"}>Historique des prestations</h1>
            <div className={"flex flex-col"}>
                {/*todo : replace object type*/}
                {prestations.map((prestation: object) => {
                    return (
                        <div key={prestation.idPrestationIntervention} className={"flex"}>
                            <p>{prestation.idPrestationIntervention}</p>
                            <Button
                                color={"primary"}
                                variant={"shadow"}
                                onClick={() => handleValidate(prestation)}
                            >
                                Détails
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PrestationList;