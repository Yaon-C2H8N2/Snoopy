package fr.yaon.api.auth.services;

import fr.yaon.api.auth.models.AuthRequest;
import fr.yaon.api.auth.models.Utilisateur;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationEndpoint {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RepositoryUserDetailsService repositoryUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("")
    public String login(HttpServletResponse response, @RequestBody AuthRequest authRequest) {
        response.setContentType(MediaType.TEXT_PLAIN_VALUE);
        response.setStatus(200);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.username, authRequest.password));
        } catch (Exception e) {
            response.setStatus(500);
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            return e.getMessage();
        }
        Utilisateur utilisateur = (Utilisateur) repositoryUserDetailsService.loadUserByUsername(authRequest.username);
        return jwtUtil.generateToken(utilisateur);
    }
}
