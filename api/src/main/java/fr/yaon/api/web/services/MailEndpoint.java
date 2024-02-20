package fr.yaon.api.web.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.yaon.api.report.ExcelReporter;
import fr.yaon.api.repositories.ClientRepository;
import fr.yaon.api.repositories.PrestationInterventionRepository;
import fr.yaon.api.web.models.Client;
import fr.yaon.api.web.models.PrestationIntervention;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/mail")
public class MailEndpoint {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PrestationInterventionRepository prestationInterventionRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ExcelReporter excelReporter;

    @Value("${mail.address}")
    private String address;

    @Value("${pdfconverter.url}")
    private String PDF_CONVERTER_URL;

    @PostMapping("")
    public String sendMail(@RequestBody int idPrestationIntervention, HttpServletResponse response) {
        PrestationIntervention prestationIntervention = prestationInterventionRepository.findByIdPrestationIntervention(idPrestationIntervention);
        Client client = clientRepository.findByIdClient(prestationIntervention.getIdClient());

        byte reportData[] = excelReporter.generatePrestationReport(idPrestationIntervention);

        //conversion en pdf (code copié depuis EditionEndpoint.java TODO: remplacer ça par un service dédié)
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

        Resource pdf = new ByteArrayResource(apiresponse.getBody()) {
            @Override
            public String getFilename() {
                return "edition_bon.pdf";
            }
        };

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mailSender.createMimeMessage(), true);
            helper.addAttachment("edition_bon.pdf", pdf);
            helper.setTo(client.getAdresseMail());
            helper.setFrom(address);
            helper.setSubject("Intervention nº" + idPrestationIntervention + " " + client.getNomEntreprise());
            helper.setText("Bonjour,\n\nVeuillez trouver ci-joint le bon d'intervention nº" + idPrestationIntervention + " pour l'intervention chez " + client.getNomEntreprise() + ".\n\nCordialement,\n\nL'équipe Yaon");
            mailSender.send(helper.getMimeMessage());

            return "Mail sent";
        } catch (Exception e) {
            response.setContentType(MediaType.TEXT_PLAIN_VALUE);
            response.setStatus(500);
            e.printStackTrace();
            return e.getMessage();
        }
    }
}
