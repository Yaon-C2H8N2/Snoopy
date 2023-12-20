package fr.yaon.api;

import fr.yaon.api.report.ExcelReporter;
import fr.yaon.api.repositories.EmployeRepository;
import fr.yaon.api.repositories.PrestationInterventionRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@Bean
	public ExcelReporter excelReporter(PrestationInterventionRepository prestationInterventionRepository,
									   EmployeRepository employeRepository) {
		return new ExcelReporter();
	}

}
