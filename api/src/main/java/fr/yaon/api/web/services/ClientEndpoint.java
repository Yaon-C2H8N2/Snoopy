package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.yaon.api.repositories.ClientRepository;
import fr.yaon.api.web.models.Client;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
public class ClientEndpoint {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("")
    public String getClients(HttpServletResponse response) {
        try{
            return this.objectMapper.writeValueAsString(this.clientRepository.findAll());
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }

    @PostMapping("/{idClient}")
    public String getClient(@PathVariable int idClient, HttpServletResponse response) {
        try{
            return this.objectMapper.writeValueAsString(this.clientRepository.findByIdClient(idClient));
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }

    @PutMapping("/add")
    public String addClient(@RequestBody Client client, HttpServletResponse response) {
        try{
            return this.objectMapper.writeValueAsString(this.clientRepository.save(client));
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }
}
