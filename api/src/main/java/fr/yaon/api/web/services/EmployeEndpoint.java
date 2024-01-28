package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.yaon.api.repositories.EmployeRepository;
import fr.yaon.api.web.models.Employe;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/employe")
public class EmployeEndpoint {
    @Autowired
    private EmployeRepository employeRepository;

    public EmployeEndpoint() {
    }

    @GetMapping("")
    public String getAllEmployes(HttpServletResponse response) {
        try {
            return new ObjectMapper().writeValueAsString(employeRepository.findAll());
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }

    @GetMapping("/intervention/{idPrestationIntervention}")
    public String addIntervention(@PathVariable int idPrestationIntervention, @RequestBody List<Employe> employes, HttpServletResponse response) {
        try {
            List<Integer> idEmployes = new ArrayList<>();
            for (Employe employe : employes) {
                idEmployes.add(employe.getIdEmploye());
            }
            List<Integer> id = employeRepository.addToPrestationIntervention(idPrestationIntervention, idEmployes);
            return "Success ! " + id;
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }
}
