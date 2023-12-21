package fr.yaon.api.repositories;

import fr.yaon.api.web.models.Employe;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface EmployeRepository extends Repository<Employe, Integer> {
    @Query("""
        SELECT employe.*
        FROM employe, employe_prestation_intervention
        WHERE 
        employe.id_employe = employe_prestation_intervention.id_employe AND
        employe_prestation_intervention.id_prestation_intervention = :id
    """)
    List<Employe> findAllByPrestationInterventionId(int id);
    List<Employe> findAll();
    Employe save(Employe employe);
    void delete(Employe employe);
}
