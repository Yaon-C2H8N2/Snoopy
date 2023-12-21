package fr.yaon.api.config;

import fr.yaon.api.report.ExcelReporter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReportConfig {
    @Bean
    public ExcelReporter excelReporter() {
        return new ExcelReporter();
    }
}
