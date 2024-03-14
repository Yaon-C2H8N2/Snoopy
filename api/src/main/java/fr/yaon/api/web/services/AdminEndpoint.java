package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.yaon.api.auth.models.Utilisateur;
import fr.yaon.api.auth.repositories.UtilisateurRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminEndpoint {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public AdminEndpoint() {
    }

    @GetMapping("/utilisateurs")
    public String getAllUtilisateurs(HttpServletResponse response) {
        try {
            List<Utilisateur> utilisateurs = this.utilisateurRepository.findAll();
            for (Utilisateur utilisateur : utilisateurs) {
                utilisateur.setPassword(null);
            }
            return this.objectMapper.writeValueAsString(utilisateurs);
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }
}
