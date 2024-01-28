import {useLocation} from "react-router-dom";

function PrestationRecap() {
    const {state} = useLocation();

    return (
        <div>
            Ouais ouais ouais presta id : {state.idPrestationIntervention}
        </div>
    )
}

export default PrestationRecap