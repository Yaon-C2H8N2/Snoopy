package fr.yaon.api.auth.services;

import fr.yaon.api.auth.models.Utilisateur;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtUtil {
    @Value("${jwt.secret}")
    private String JWT_SECRET;

    public String generateToken(Utilisateur utilisateur) {
        //return token with 10 hours of expiration

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", utilisateur.getUsername());
        claims.put("role", utilisateur.getRole());

        return Jwts.builder()
                .setSubject(utilisateur.getUsername())
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET).compact();
    }

    public String extractUsername(String token) {
        Claims parsedToken = Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody();
        return parsedToken.get("username", String.class);
    }

    // Return the remaining time in milliseconds before the token expires
    public int extractRemainingTime(String token) {
        return (int) (Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody().getExpiration().getTime() - System.currentTimeMillis());
    }

    public boolean validateToken(String token, UserDetails utilisateur) {
        return (extractUsername(token).equals(utilisateur.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody().getExpiration().before(new Date());
    }
}
