package fr.yaon.api.web.models;

import java.util.List;

public class PrestationInterventionSync {
    private PrestationIntervention prestationIntervention;
    private List<Integer> idEmployes;

    public PrestationIntervention getPrestationIntervention() {
        return prestationIntervention;
    }

    public void setPrestationIntervention(PrestationIntervention prestationIntervention) {
        this.prestationIntervention = prestationIntervention;
    }

    public List<Integer> getIdEmployes() {
        return idEmployes;
    }

    public void setIdEmployes(List<Integer> idEmployes) {
        this.idEmployes = idEmployes;
    }
}
