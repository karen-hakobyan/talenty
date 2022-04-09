package com.talenty.jwt;

import com.talenty.domain.mongo.HrDocument;
import com.talenty.domain.mongo.JobSeekerDocument;
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
import java.util.Objects;

@Component
public class JWTService {

    private static final Key KEY = Keys.hmacShaKeyFor("a23D43Q4!@#eQWdb32SDru0ASqe-p[;c.sac3e2sa12$".getBytes());

    public String generate(final UserDocument user) {
        return Jwts.builder()
                .claim("id", user.getId())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .claim("verifiedAccount", user.isVerifiedAccount())
                .signWith(KEY).compact();
    }

    public String generate(final HrDocument hr) {
        return Jwts.builder()
                .claim("id", hr.getId())
                .claim("firstName", hr.getFirstName())
                .claim("lastName", hr.getLastName())
                .claim("email", hr.getEmail())
                .claim("role", hr.getRole())
                .claim("verifiedAccount", hr.isVerifiedAccount())
                .signWith(KEY).compact();
    }

    public String generate(final JobSeekerDocument jobSeeker) {
        return Jwts.builder()
                .claim("id", jobSeeker.getId())
                .claim("firstName", jobSeeker.getFirstName())
                .claim("lastName", jobSeeker.getLastName())
                .claim("email", jobSeeker.getEmail())
                .claim("role", jobSeeker.getRole())
                .claim("verifiedAccount", jobSeeker.isVerifiedAccount())
                .claim("cvTemplateId", jobSeeker.getCvTemplateId())
                .signWith(KEY).compact();
    }

    public Jws<Claims> parse(final String token) {
        final JwtParser build = Jwts.parserBuilder().setSigningKey(KEY).build();
        return build.parseClaimsJws(token);
    }

    public String validateToken(final String jwtToken) {
        if (jwtToken == null || !jwtToken.startsWith("Bearer ") || Objects.equals("null", jwtToken)) {
            return null;
        }
        final String substring = jwtToken.substring(7);
        return Objects.equals(substring, "null") ? null : substring;
    }

}
