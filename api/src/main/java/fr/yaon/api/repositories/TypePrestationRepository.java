package fr.yaon.api.repositories;

import fr.yaon.api.web.models.TypePrestation;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.Repository;

public interface TypePrestationRepository extends Repository<TypePrestation, Integer> {
    Iterable<TypePrestation> findAll();
    TypePrestation findByIdTypePrestation(Integer idTypePrestation);

    @Query("DELETE FROM type_prestation WHERE id_type_prestation = :idTypePrestation RETURNING *")
    TypePrestation deleteTypePrestationByIdTypePrestation(Integer idTypePrestation);

    TypePrestation save(TypePrestation typePrestation);
}
