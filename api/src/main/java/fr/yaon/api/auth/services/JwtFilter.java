package fr.yaon.api.auth.services;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RepositoryUserDetailsService repositoryUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String jwtBody = null;
        String username = null;

        // If a bearer token is present in the request then extract the username from it
        if (header != null && header.startsWith("Bearer ")) {
            jwtBody = header.substring(7);
            username = jwtUtil.extractUsername(jwtBody);
        }

        // If the token contains valid informations and the user is not already authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = repositoryUserDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(jwtBody, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                // Refresh token if it's about to expire (less than an hour remaining)
                if (jwtUtil.extractRemainingTime(jwtBody) < 1000 * 60 * 60) {
                    String token = jwtUtil.generateToken(userDetails);
                    response.addHeader("Set-Cookie", "token=" + token + "; Path=/;");
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
