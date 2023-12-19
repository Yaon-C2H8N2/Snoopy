package fr.yaon.api.web.services;

import com.fasterxml.jackson.core.JsonFactoryBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import fr.yaon.api.web.models.PrestationIntervention;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrestationEndpoint {
    public PrestationEndpoint() {
    }

    @PutMapping("/prestation")
    public String savePrestation(@RequestBody PrestationIntervention prestationIntervention) {
        try {
            return new ObjectMapper().writeValueAsString(prestationIntervention);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
