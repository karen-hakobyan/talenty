package com.talenty.jwt;

import com.talenty.domain.mongo.UserDocument;
import com.talenty.exceptions.InvalidJWTTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JWTService {

    private static final Key KEY = Keys.hmacShaKeyFor("a23D43Q4!@#eQWdb32SDru0ASqe-p[;c.sac3e2sa12$".getBytes());

    public String generate(final UserDocument user) {
        return Jwts.builder()
                .claim("id", user.getId())
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .signWith(KEY).compact();
    }

    public Jws<Claims> parse(final String token) {
        final JwtParser build = Jwts.parserBuilder().setSigningKey(KEY).build();
        return build.parseClaimsJws(token);
    }

    public String validateToken(final String jwtToken) {
        if (jwtToken == null || !jwtToken.startsWith("Bearer ")) {
            return null;
        }
        return jwtToken.substring(7);
    }

}
