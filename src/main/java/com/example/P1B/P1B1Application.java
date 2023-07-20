package com.example.P1B;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.example.P1B.domain")
@EnableJpaRepositories(basePackages = "com.example.P1B.repository")
public class P1B1Application {

    public static void main(String[] args) {
        SpringApplication.run(P1B1Application.class, args);
    }

}
