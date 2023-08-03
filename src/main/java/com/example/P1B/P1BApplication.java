package com.example.P1B;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class P1BApplication {

	public static void main(String[] args) {
		SpringApplication.run(P1BApplication.class, args);
	}

}
