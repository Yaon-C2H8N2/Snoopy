package fr.yaon.api.repositories;

import fr.yaon.api.web.models.Prestation;
import org.springframework.data.repository.Repository;

public interface PrestationRepository extends Repository<Prestation, Integer> {
    Iterable<Prestation> findAll();
    Prestation findByIdPrestation(Integer idPrestation);
    Prestation save(Prestation prestation);
}
