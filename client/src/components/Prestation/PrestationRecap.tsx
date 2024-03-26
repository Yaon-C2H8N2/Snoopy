import { useLocation } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { useEffect, useMemo, useRef, useState } from "react";
import Network from "../Network/Network.ts";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button, Card } from "@nextui-org/react";

function PrestationRecap() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const pdfDoc = useRef<Uint8Array>();

  useEffect(() => {
    Network.fetch(`/api/edition/${state?.idPrestationIntervention}`, {
      method: "GET",
    })
      .then((response) => response.arrayBuffer())
      .then((data) => {
        if (!pdfDoc.current) {
          pdfDoc.current = new Uint8Array(data);
          setLoading(false);
        }
      });
  }, [state.idPrestationIntervention, loading]);

  const memorizedDocument = useMemo(
    () => ({ data: pdfDoc.current }),
    [pdfDoc.current],
  );

  const handleMailSend = () => {
    Network.fetch(`/api/mail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: state?.idPrestationIntervention,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
  };

  const handleDocumentDownload = () => {
    let filename = "unnamed.pdf";

    Network.fetch(`/api/edition/${state?.idPrestationIntervention}`, {
      method: "GET",
    })
      .then((response) => {
        //hack to retrieve the filename from the API response
        for (const pair of response.headers.entries()) {
          if (pair[0] === "content-disposition") {
            const parts = pair[1]!.split(";");
            filename = parts[1].split("=")[1];
            filename = filename.replace(/"/g, "");
          }
        }
        return response.arrayBuffer();
      })
      .then((data) => {
        const blob = new Blob([data], { type: "application/pdf" });
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
      });
  };

  return (
    <div className={"flex justify-center mt-5"}>
      <div className={"flex-col w-3/6 space-x-5 space-y-5"}>
        <h2 className={"text-center"}>Récapitulatif de la prestation :</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Card>
            <div className={"flex justify-center overflow-auto max-h-[80vh]"}>
              <Document
                file={memorizedDocument}
                onLoadSuccess={(document) => setNumPages(document.numPages)}
              >
                {Array.from(new Array(numPages), (_el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            </div>
          </Card>
        )}
        <div className={"flex justify-center space-x-5"}>
          <Button color={"primary"} variant={"shadow"} onClick={handleMailSend}>
            Envoyer au client
          </Button>
          <Button
            color={"primary"}
            variant={"shadow"}
            onClick={handleDocumentDownload}
          >
            Télécharger
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PrestationRecap;
