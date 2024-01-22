package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.yaon.api.repositories.EmployeRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employe")
public class EmployeEndpoint {
    @Autowired
    private EmployeRepository employeRepository;

    public EmployeEndpoint() {
    }

    @GetMapping("")
    public String getAllEmployes(HttpServletResponse response) {
        try {
            return new ObjectMapper().writeValueAsString(employeRepository.findAll());
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            return e.getMessage();
        }
    }
}
