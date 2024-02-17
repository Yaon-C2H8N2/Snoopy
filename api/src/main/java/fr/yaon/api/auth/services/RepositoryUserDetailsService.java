package fr.yaon.api.auth.services;

import fr.yaon.api.auth.models.Utilisateur;
import fr.yaon.api.auth.repositories.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class RepositoryUserDetailsService implements UserDetailsService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepository.findByUsername(username);
        if (utilisateur != null) {
            return utilisateur;
        } else {
            throw new UsernameNotFoundException("Utilisateur non trouvé");
        }
    }
}
