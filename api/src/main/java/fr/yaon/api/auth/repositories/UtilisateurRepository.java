package fr.yaon.api.auth.repositories;

import fr.yaon.api.auth.models.Utilisateur;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UtilisateurRepository extends Repository<Utilisateur, Integer> {
    Utilisateur findByUsername(String username);

    Utilisateur findByIdUtilisateur(int idUtilisateur);

    List<Utilisateur> findAll();

    @Query("DELETE FROM utilisateur WHERE id_utilisateur = :idUtilisateur RETURNING *")
    Utilisateur deleteUtilisateurByIdUtilisateur(int idUtilisateur);

    Utilisateur save(Utilisateur utilisateur);
}
