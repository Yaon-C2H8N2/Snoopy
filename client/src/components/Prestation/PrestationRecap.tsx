import {useLocation} from "react-router-dom";
import {Document, Page} from "react-pdf";
import {useEffect, useMemo, useRef, useState} from "react";
import Network from "../Network/Network.ts";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import React from "react";
import {Button} from "@nextui-org/react";

function PrestationRecap() {
    const {state} = useLocation();
    const [loading, setLoading] = useState(true);
    const [numPages, setNumPages] = useState(0);
    const document = useRef<Uint8Array>();

    useEffect(() => {
        Network.fetch(`/api/edition/${state?.idPrestationIntervention}`, {
            method: "GET",
        })
            .then((response) => (response.arrayBuffer()))
            .then((data) => {
                    if(!document.current){
                        document.current = new Uint8Array(data);
                        setLoading(false);
                    }
                }
            );
    }, [state.idPrestationIntervention, loading]);

    const memorizedDocument = useMemo(() => ({data: document.current}), [document.current]);

    return (
        <div>
            {loading ? <p>Loading...</p>
                : <React.Fragment>
                        <div className={"overflow-auto max-h-[90vh]"}>
                            <Document file={memorizedDocument}
                                      onLoadSuccess={(document) => (setNumPages(document.numPages))}
                            >
                                {Array.from(new Array(numPages), (_el , index) => (
                                    <Page key={`page_${index + 1}`} pageNumber={index + 1}/>
                                ))}
                            </Document>
                        </div>
                    <Button color={"primary"} variant={"shadow"}>Envoyer au client</Button>
                    <Button color={"primary"} variant={"shadow"}>Télécharger</Button>
                </React.Fragment>
            }
        </div>
    )
}

export default PrestationRecap