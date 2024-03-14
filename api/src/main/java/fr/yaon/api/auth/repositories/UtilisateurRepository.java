package fr.yaon.api.auth.repositories;

import fr.yaon.api.auth.models.Utilisateur;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface UtilisateurRepository extends Repository<Utilisateur, Integer> {
    Utilisateur findByUsername(String username);

    List<Utilisateur> findAll();

    Utilisateur save(Utilisateur utilisateur);
}
