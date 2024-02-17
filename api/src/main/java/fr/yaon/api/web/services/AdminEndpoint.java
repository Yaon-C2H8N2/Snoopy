package fr.yaon.api.web.services;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminEndpoint {

    public AdminEndpoint() {
    }

    @GetMapping("test")
    public String getAllPrestations(HttpServletResponse response) {
        try {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            return "Hello World";
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }
}
