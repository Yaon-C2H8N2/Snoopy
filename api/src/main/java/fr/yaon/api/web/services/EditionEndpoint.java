package fr.yaon.api.web.services;

import fr.yaon.api.report.ExcelReporter;
import fr.yaon.api.repositories.EmployeRepository;
import fr.yaon.api.repositories.PrestationInterventionRepository;
import fr.yaon.api.web.models.Employe;
import fr.yaon.api.web.models.PrestationIntervention;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/edition")
public class EditionEndpoint {

    private PrestationInterventionRepository prestationInterventionRepository;
    private EmployeRepository employeRepository;
    private ExcelReporter excelReporter;

    @Value("${pdfconverter.url}")
    private String PDF_CONVERTER_URL;

    public EditionEndpoint(
            PrestationInterventionRepository prestationInterventionRepository,
            EmployeRepository employeRepository,
            ExcelReporter excelReporter
    ) {
        this.employeRepository = employeRepository;
        this.prestationInterventionRepository = prestationInterventionRepository;
        this.excelReporter = excelReporter;
    }

    @GetMapping("{idPrestationIntervention}")
    public byte[] getEdition(HttpServletResponse response, @PathVariable int idPrestationIntervention) {
        try {
            byte reportData[] = excelReporter.generatePrestationReport(idPrestationIntervention);

            //conversion en pdf
            Resource resource = new ByteArrayResource(reportData) {
                @Override
                public String getFilename() {
                    return "edition_bon.xlsx";
                }
            };
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("files", resource);
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<byte[]> apiresponse = restTemplate.exchange(
                    PDF_CONVERTER_URL+"/forms/libreoffice/convert",
                    HttpMethod.POST,
                    requestEntity,
                    byte[].class
            );

            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=\"edition_bon.pdf\"");
            return apiresponse.getBody();
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            e.printStackTrace();
            return "y'a un blem".getBytes();
        }
    }
}
