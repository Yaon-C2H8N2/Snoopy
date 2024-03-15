package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.yaon.api.auth.models.Utilisateur;
import fr.yaon.api.auth.repositories.UtilisateurRepository;
import fr.yaon.api.repositories.ClientRepository;
import fr.yaon.api.repositories.PrestationRepository;
import fr.yaon.api.repositories.TypePrestationRepository;
import fr.yaon.api.web.models.Client;
import fr.yaon.api.web.models.Prestation;
import fr.yaon.api.web.models.TypePrestation;
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
    private TypePrestationRepository typePrestationRepository;

    @Autowired
    private PrestationRepository prestationRepository;

    @Autowired
    private ClientRepository clientRepository;

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

    @PutMapping("/typeprestation")
    public String addTypePrestation(HttpServletResponse response, @RequestBody TypePrestation typePrestation) {
        try {
            typePrestationRepository.save(typePrestation);
            return objectMapper.writeValueAsString(typePrestation);
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }

    @PutMapping("/prestation")
    public String addPrestation(HttpServletResponse response, @RequestBody Prestation prestation) {
        try {
            prestationRepository.save(prestation);
            return objectMapper.writeValueAsString(prestation);
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }

    @DeleteMapping("/prestation/{idPrestation}")
    public String deletePrestation(HttpServletResponse response, @PathVariable int idPrestation) {
        try {
            Prestation prestation = prestationRepository.deletePrestationByIdPrestation(idPrestation);
            if (prestation != null) {
                return objectMapper.writeValueAsString(prestation);
            } else throw new Exception("Prestation not found");
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }

    @PutMapping("/client")
    public String addClient(HttpServletResponse response, @RequestBody Client client) {
        try {
            clientRepository.save(client);
            return objectMapper.writeValueAsString(client);
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }
}
