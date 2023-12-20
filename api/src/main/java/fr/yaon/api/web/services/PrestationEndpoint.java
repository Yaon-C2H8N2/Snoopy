package fr.yaon.api.web.services;

import com.fasterxml.jackson.core.JsonFactoryBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import fr.yaon.api.repositories.PrestationInterventionRepository;
import fr.yaon.api.web.models.PrestationIntervention;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/prestation")
public class PrestationEndpoint {
    @Autowired
    private PrestationInterventionRepository prestationInterventionRepository;

    public PrestationEndpoint() {
    }

    @PutMapping("/save")
    public String savePrestation(@RequestBody PrestationIntervention prestationIntervention, HttpServletResponse response) {
        try {
            prestationInterventionRepository.save(prestationIntervention);
            return new ObjectMapper().writeValueAsString(prestationIntervention);
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }
}
