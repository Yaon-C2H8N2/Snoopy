package fr.yaon.api.repositories;

import fr.yaon.api.web.models.Client;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.Repository;

public interface ClientRepository extends Repository<Client, Integer> {
    Iterable<Client> findAll();
    Client findByIdClient(int idClient);
    Client save(Client client);
    void delete(Client client);
}
