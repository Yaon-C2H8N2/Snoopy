package fr.yaon.api.repositories;

import fr.yaon.api.web.models.PrestationIntervention;
import org.springframework.data.repository.Repository;

public interface PrestationInterventionRepository extends Repository<PrestationIntervention, Integer>{
    Iterable<PrestationIntervention> findAll();
    PrestationIntervention findByIdPrestationIntervention(int idPrestationIntervention);
    PrestationIntervention save(PrestationIntervention prestationIntervention);
    void delete(PrestationIntervention prestationIntervention);
}
