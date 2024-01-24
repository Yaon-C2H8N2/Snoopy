package fr.yaon.api.web.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;

import java.sql.Date;
import java.time.LocalTime;

public class PrestationIntervention {
    @Id
    private int idPrestationIntervention;
    private int idPrestation;
    private int idClient;
    private @JsonFormat(pattern = "") Date datePrestation;
    private @JsonFormat(pattern = "HH:mm") LocalTime heureDebut;
    private @JsonFormat(pattern = "HH:mm") LocalTime heureFin;
    private boolean interieur;
    private boolean exterieur;
    private String commentaire;

    public int getIdPrestationIntervention() {
        return idPrestationIntervention;
    }

    public void setIdPrestationIntervention(int idPrestationIntervention) {
        this.idPrestationIntervention = idPrestationIntervention;
    }

    public int getIdPrestation() {
        return idPrestation;
    }

    public void setIdPrestation(int idPrestation) {
        this.idPrestation = idPrestation;
    }

    public int getIdClient() {
        return idClient;
    }

    public void setIdClient(int idClient) {
        this.idClient = idClient;
    }

    public Date getDatePrestation() {
        return datePrestation;
    }

    public void setDatePrestation(Date datePrestation) {
        this.datePrestation = datePrestation;
    }

    public LocalTime getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(LocalTime heureDebut) {
        this.heureDebut = heureDebut;
    }

    public LocalTime getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(LocalTime heureFin) {
        this.heureFin = heureFin;
    }

    public boolean isInterieur() {
        return interieur;
    }

    public void setInterieur(boolean interieur) {
        this.interieur = interieur;
    }

    public boolean isExterieur() {
        return exterieur;
    }

    public void setExterieur(boolean exterieur) {
        this.exterieur = exterieur;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
}
