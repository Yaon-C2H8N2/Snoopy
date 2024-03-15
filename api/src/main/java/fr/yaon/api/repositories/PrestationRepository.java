package fr.yaon.api.repositories;

import fr.yaon.api.web.models.Prestation;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.Repository;

public interface PrestationRepository extends Repository<Prestation, Integer> {
    Iterable<Prestation> findAll();

    Prestation findByIdPrestation(Integer idPrestation);

    @Query("DELETE FROM prestation WHERE id_prestation = :idPrestation RETURNING *")
    Prestation deletePrestationByIdPrestation(Integer idPrestation);

    Prestation save(Prestation prestation);
}
