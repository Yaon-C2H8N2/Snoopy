package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.yaon.api.repositories.ClientRepository;
import fr.yaon.api.web.models.Client;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
public class ClientEndpoint {

    private final ClientRepository clientRepository;

    private final ObjectMapper objectMapper;

    public ClientEndpoint(ClientRepository clientRepository, ObjectMapper objectMapper) {
        this.clientRepository = clientRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping("")
    public String getClients() {
        try{
            return this.objectMapper.writeValueAsString(this.clientRepository.findAll());
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/{idClient}")
    public String getClient(@PathVariable int idClient) {
        try{
            return this.objectMapper.writeValueAsString(this.clientRepository.findByIdClient(idClient));
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PutMapping("/add")
    public String addClient(@RequestBody Client client) {
        try{
            return this.objectMapper.writeValueAsString(this.clientRepository.save(client));
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
