package com.bgv.coreservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class BgvCoreServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BgvCoreServiceApplication.class, args);
	}

}
