package com.talenty.config;

import com.talenty.domain.dto.user.AuthenticatedUser;
import com.talenty.domain.mongo.UserDocument;
import com.talenty.jwt.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;

public class JwtAuthorizationFilter implements Filter {

    @Override
    public void doFilter(final ServletRequest request,
                         final ServletResponse response,
                         final FilterChain filterChain)
            throws IOException, ServletException {

        final JWTService jwtService = new JWTService();

        final String jwtToken = ((HttpServletRequest) request).getHeader("Authorization");

        // <logs>
        final DateTimeFormatter formater = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        System.out.printf("Request came with JWT '%s', %s", jwtToken, formater.format(LocalDateTime.now()));
        // </logs>

        final String token = jwtService.validateToken(jwtToken);

        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        final Jws<Claims> tokenClaims = jwtService.parse(token);
        final Claims body = tokenClaims.getBody();

        final String id = body.get("id").toString();
        final String firstName = body.get("firstName").toString();
        final String lastName = body.get("lastName").toString();
        final String email = body.get("email").toString();
        final String role = body.get("role").toString();
        final Boolean isVerifiedAccount = (Boolean) body.get("verifiedAccount");

        final AuthenticatedUser authenticatedUser = new AuthenticatedUser();
        authenticatedUser.setId(id);
        authenticatedUser.setFirstName(firstName);
        authenticatedUser.setLastName(lastName);
        authenticatedUser.setEmail(email);
        authenticatedUser.setRole(role);
        authenticatedUser.setVerifiedAccount(isVerifiedAccount);

        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                id, authenticatedUser, Collections.singleton(new SimpleGrantedAuthority(role))
        ));

        filterChain.doFilter(request, response);
    }

}
