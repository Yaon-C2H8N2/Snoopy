package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.yaon.api.repositories.ClientRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class ClientEndpoint {

    private final ClientRepository clientRepository;

    private final ObjectMapper objectMapper;

    public ClientEndpoint(ClientRepository clientRepository, ObjectMapper objectMapper) {
        this.clientRepository = clientRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/client")
    public String getClients() {
        try{
            return this.objectMapper.writeValueAsString(this.clientRepository.findAll());
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/client/{idClient}")
    public String getClient(@PathVariable int idClient) {
        try{
            return this.objectMapper.writeValueAsString(this.clientRepository.findByIdClient(idClient));
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PutMapping("/client/add")
    public String addClient(@RequestBody String body) {
        try{
            return this.objectMapper.writeValueAsString(this.clientRepository.save(this.objectMapper.readValue(body, fr.yaon.api.web.models.Client.class)));
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
