package net.medev.cardatabase.controller;

import net.medev.cardatabase.entity.AccountCredentials;
import net.medev.cardatabase.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {

        // Authenticate the user
        Authentication authentication = authenticateUser(credentials);

        // Generate a JWT token
        String jwtToken = generateJwtToken(authentication);

        // Build and return the response with the generated token
        HttpHeaders headers = buildHeadersWithJwtToken(jwtToken);
        return ResponseEntity.ok().headers(headers).build();
    }

    private Authentication authenticateUser(AccountCredentials credentials) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(credentials.username(), credentials.password());

        return authenticationManager.authenticate(authenticationToken);
    }

    private String generateJwtToken(Authentication authentication) {
        String username = authentication.getName();
        return jwtService.getToken(username);
    }

    private HttpHeaders buildHeadersWithJwtToken(String jwtToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken);
        headers.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization");
        return headers;
    }

}
