package fr.yaon.api.web.services;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
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

@RestController
public class EditionEndpoint {
    public EditionEndpoint() {
    }

    @GetMapping("/edition")
    public byte[] getEditions(HttpServletResponse response) {
        try {
            FileInputStream file = new FileInputStream("src/main/resources/edition/template/edition_bon.xlsx");
            XSSFWorkbook workbook = new XSSFWorkbook(file);

            //process le fichier excel

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);

            //conversion en pdf
            Resource resource = new ByteArrayResource(out.toByteArray()){
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
                    "http://pdfconverter:3000/forms/libreoffice/convert",
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
