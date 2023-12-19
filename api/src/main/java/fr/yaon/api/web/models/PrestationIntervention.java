package fr.yaon.api.web.models;

import org.springframework.data.annotation.Id;

import java.sql.Date;
import java.sql.Time;

public class PrestationIntervention {
    @Id
    private int idPrestationIntervention;
    private int idPrestation;
    private int idClient;
    private Date datePrestation;
    private Time heureDebut;
    private Time heureFin;
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

    public Time getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(Time heureDebut) {
        this.heureDebut = heureDebut;
    }

    public Time getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(Time heureFin) {
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
