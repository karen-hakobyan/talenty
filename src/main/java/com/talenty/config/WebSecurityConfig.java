package com.talenty.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic()
                .and()
                .csrf()
                .disable()
                .cors().configurationSource(corsConfigurationSource())
                .and().authorizeRequests().anyRequest().permitAll();
    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication()
//                .withUser("hr")
//                .password("{noop}hr")
//                .roles("MANAGER")
//                .and()
//                .withUser("user")
//                .password("{noop}user")
//                .roles("USER");
//    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        var source = new UrlBasedCorsConfigurationSource();

        var corsConfig = new CorsConfiguration();
        corsConfig.setAllowedOrigins(Collections.singletonList(CorsConfiguration.ALL));
        corsConfig.setAllowedMethods(Collections.singletonList(CorsConfiguration.ALL));
        corsConfig.setAllowedHeaders(Collections.singletonList(CorsConfiguration.ALL));

        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }

}