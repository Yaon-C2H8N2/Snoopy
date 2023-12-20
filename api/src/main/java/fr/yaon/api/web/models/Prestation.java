package fr.yaon.api.web.models;

public class Prestation {
    Integer idPrestation;
    Integer idTypePrestation;
    String nomPrestation;

    public Integer getIdPrestation() {
        return idPrestation;
    }

    public void setIdPrestation(Integer idPrestation) {
        this.idPrestation = idPrestation;
    }

    public Integer getIdTypePrestation() {
        return idTypePrestation;
    }

    public void setIdTypePrestation(Integer idTypePrestation) {
        this.idTypePrestation = idTypePrestation;
    }

    public String getNomPrestation() {
        return nomPrestation;
    }

    public void setNomPrestation(String nomPrestation) {
        this.nomPrestation = nomPrestation;
    }
}
