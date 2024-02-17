package fr.yaon.api.auth.repositories;

import fr.yaon.api.auth.models.Utilisateur;
import org.springframework.data.repository.Repository;

public interface UtilisateurRepository extends Repository<Utilisateur, Integer> {
    Utilisateur findByUsername(String username);

    Utilisateur save(Utilisateur utilisateur);
}
