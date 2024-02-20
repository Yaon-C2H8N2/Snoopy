package fr.yaon.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

    @Value("${spring.mail.host}")
    private static String host;

    @Value("${spring.mail.port}")
    private static int port;

    @Value("${spring.mail.username}")
    private static String username;

    @Value("${spring.mail.password}")
    private static String password;

    @Value("${spring.mail.protocol}")
    private static String protocol;

    @Bean
    public JavaMailSender mailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);
        mailSender.setProtocol(protocol);

        return mailSender;
    }
}
