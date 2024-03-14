package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.yaon.api.auth.models.Utilisateur;
import fr.yaon.api.auth.repositories.UtilisateurRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminEndpoint {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    @PutMapping("/utilisateur")
    public String addUtilisateur(HttpServletResponse response, @RequestBody Utilisateur utilisateur) {
        try {
            utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
            Utilisateur newUser = utilisateurRepository.save(utilisateur);
            newUser.setPassword(null);
            return this.objectMapper.writeValueAsString(newUser);
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }

    @DeleteMapping("/utilisateur/{idUtilisateur}")
    public String deleteUtilisateur(HttpServletResponse response, @PathVariable int idUtilisateur) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByIdUtilisateur(idUtilisateur);
            if (utilisateur != null) {
                if (utilisateur.getRole().equals("ADMIN")) {
                    throw new Exception("Cannot delete admin");
                }
                return objectMapper.writeValueAsString(this.utilisateurRepository.deleteUtilisateurByIdUtilisateur(idUtilisateur));
            } else throw new Exception("Utilisateur not found");
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }
}
