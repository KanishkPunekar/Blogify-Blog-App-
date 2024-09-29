package com.blog.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.In;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;


@Configuration
public class SwaggerConfig {
	public static final String AUTHORIZATION_HEADER = "Authorization";

    @Bean
    public OpenAPI defineOpenApi() {
    	
    	
    	
        Server server = new Server();
        server.setUrl("http://localhost:8080");
        server.setDescription("Development");

        Contact myContact = new Contact();
        myContact.setName("Kanishk Punekar");
        myContact.setEmail("kanishkpunekar54@gmail.com");
        
        SecurityScheme apiKeyScheme = new SecurityScheme()
                .type(Type.APIKEY)
                .in(In.HEADER)
                .name(AUTHORIZATION_HEADER);
        
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(AUTHORIZATION_HEADER);
        

        Info info = new Info()
                .title("Blogging Application : Backend ")
                .version("1.0")
                .description("This project is developed by Kanishk ")
                .contact(myContact);

        return new OpenAPI()
                .info(info)
                .servers(List.of(server))
                .components(new io.swagger.v3.oas.models.Components()
                    .addSecuritySchemes(AUTHORIZATION_HEADER, apiKeyScheme))  // Use the constant here
                .security(List.of(securityRequirement));
    }
}

