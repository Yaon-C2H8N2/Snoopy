package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.yaon.api.repositories.ClientRepository;
import fr.yaon.api.repositories.PrestationInterventionRepository;
import fr.yaon.api.web.models.Client;
import fr.yaon.api.web.models.PrestationIntervention;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
public class MailEndpoint {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PrestationInterventionRepository prestationInterventionRepository;

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping("")
    public String sendMail(@RequestBody int idPrestationIntervention, HttpServletResponse response) {
        PrestationIntervention prestationIntervention = prestationInterventionRepository.findByIdPrestationIntervention(idPrestationIntervention);
        Client client = clientRepository.findByIdClient(prestationIntervention.getIdClient());

        try {
            return "Intervention nº" + idPrestationIntervention + " " + client.getNomEntreprise() + " envoyé par mail à " + client.getAdresseMail() + " !";
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }
}
