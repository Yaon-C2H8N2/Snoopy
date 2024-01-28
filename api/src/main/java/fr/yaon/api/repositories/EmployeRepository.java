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

    @Query("""
        INSERT INTO employe_prestation_intervention(id_employe, id_prestation_intervention) 
        SELECT id_employe, :idPrestationIntervention FROM employe
        WHERE id_employe IN (:idEmployes)
        RETURNING employe_prestation_intervention.id_employe_prestation_intervention
    """)
    List<Integer> addToPrestationIntervention(int idPrestationIntervention, List<Integer> idEmployes);

    void delete(Employe employe);
}
