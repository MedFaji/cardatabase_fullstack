package net.medev.cardatabase;

import org.slf4j.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class CardatabaseApplication {

	private Logger logger = LoggerFactory.getLogger(CardatabaseApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(CardatabaseApplication.class, args);
	}

}
