package com.talenty.config;

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
import java.util.Collections;

public class JwtAuthorizationFilter implements Filter {

    @Override
    public void doFilter(final ServletRequest request,
                         final ServletResponse response,
                         final FilterChain filterChain)
            throws IOException, ServletException {

        final JWTService jwtService = new JWTService();

        final String jwtToken = ((HttpServletRequest) request).getHeader("Authorization");
        final String token = jwtService.validateToken(jwtToken);

        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        final Jws<Claims> tokenClaims = jwtService.parse(token);
        final Claims body = tokenClaims.getBody();

        final String userId = body.getId();
        final String role = body.get("role").toString();

        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                userId, null, Collections.singleton(new SimpleGrantedAuthority(role))
        ));

        filterChain.doFilter(request, response);
    }

}
