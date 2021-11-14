package com.talenty.jwt;

import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobSeekerDocument;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JWTService {

    private static final Key KEY = Keys.hmacShaKeyFor("a23D43Q4!@#eQWdb32SDru0ASqe-p[;c.sac3e2sa12$".getBytes());

    public String generate(final JobSeekerDocument jobseeker) {
        return Jwts.builder()
                .claim("id", jobseeker.getId())
                .claim("email", jobseeker.getEmail())
                .claim("role", jobseeker.getRole())
                .signWith(KEY).compact();
    }

    public String generate(final HrDocument hr) {
        return Jwts.builder()
                .claim("id", hr.getId())
                .claim("email", hr.getEmail())
                .claim("role", hr.getRole())
                .signWith(KEY).compact();
    }

    public Jws<Claims> parse(final String token) {
        final JwtParser build = Jwts.parser().setSigningKey(KEY);
        return build.parseClaimsJws(token);
    }

}
