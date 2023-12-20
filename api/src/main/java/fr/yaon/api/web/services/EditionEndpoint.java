package fr.yaon.api.web.services;

import fr.yaon.api.report.ExcelReporter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/edition")
public class EditionEndpoint {

    @Autowired
    private ExcelReporter excelReporter;

    @Value("${pdfconverter.url}")
    private String PDF_CONVERTER_URL;

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
            response.setStatus(500);
            return e.getMessage().getBytes();
        }
    }
}
