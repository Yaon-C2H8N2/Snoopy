package fr.yaon.api.repositories;

import fr.yaon.api.web.models.TypePrestation;
import org.springframework.data.repository.Repository;

public interface TypePrestationRepository extends Repository<TypePrestation, Integer> {
    Iterable<TypePrestation> findAll();
    TypePrestation findByIdTypePrestation(Integer idTypePrestation);
    TypePrestation save(TypePrestation typePrestation);
}
