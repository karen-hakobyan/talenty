package com.talenty.controller;

import com.talenty.domain.dto.NavigationBar;
import com.talenty.service.NavigationBarService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/navigation_bar")
@PreAuthorize("permitAll()")
public class NavigationBarController {

    private final NavigationBarService navigationBarService;

    public NavigationBarController(final NavigationBarService navigationBarService) {
        this.navigationBarService = navigationBarService;
    }

    @GetMapping("/system")
    public ResponseEntity<?> getSystemNavigationBar() {
        final NavigationBar systemNavigationBar = navigationBarService.findSystemNavigationBar();
        return ResponseEntity.ok(systemNavigationBar);
    }

}
