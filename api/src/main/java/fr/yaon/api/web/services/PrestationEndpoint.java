package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import fr.yaon.api.repositories.EmployeRepository;
import fr.yaon.api.repositories.PrestationInterventionRepository;
import fr.yaon.api.repositories.PrestationRepository;
import fr.yaon.api.repositories.TypePrestationRepository;
import fr.yaon.api.web.models.PrestationIntervention;
import fr.yaon.api.web.models.PrestationInterventionSync;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;

@RestController
@RequestMapping("/prestation")
public class PrestationEndpoint {
    @Autowired
    private PrestationInterventionRepository prestationInterventionRepository;

    @Autowired
    PrestationRepository prestationRepository;

    @Autowired
    TypePrestationRepository typePrestationRepository;

    @Autowired
    EmployeRepository employeRepository;

    public PrestationEndpoint() {
    }

    @GetMapping("")
    public String getAllPrestations(HttpServletResponse response) {
        try {
            return new ObjectMapper().writeValueAsString(prestationRepository.findAll());
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }

    @GetMapping("/type/prestation")
    public String getAllTypePrestation(HttpServletResponse response) {
        try {
            return new ObjectMapper().writeValueAsString(typePrestationRepository.findAll());
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }

    @PutMapping("/save")
    public String savePrestation(@RequestBody PrestationInterventionSync prestationInterventionSync, HttpServletResponse response) {
        try {
            PrestationIntervention prestationIntervention = prestationInterventionSync.getPrestationIntervention();
            prestationIntervention.setDatePrestation(new Date(System.currentTimeMillis()));
            prestationInterventionRepository.save(prestationIntervention);
            if(!prestationInterventionSync.getIdEmployes().isEmpty())employeRepository.addToPrestationIntervention(prestationIntervention.getIdPrestationIntervention(), prestationInterventionSync.getIdEmployes());
            return new ObjectMapper().registerModule(new JavaTimeModule()).writeValueAsString(prestationIntervention);
        } catch (Exception e) {
            e.printStackTrace();
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }

    @GetMapping("/intervention")
    public PrestationIntervention[] getAllInterventions(HttpServletResponse response) {
        try {
            ArrayList<PrestationIntervention> prestations = new ArrayList<>();
            prestationInterventionRepository.findAll().forEach(prestations::add);
            return prestations.toArray(new PrestationIntervention[0]);
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return null;
        }
    }
}
