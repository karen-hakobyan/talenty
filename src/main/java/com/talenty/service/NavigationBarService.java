package com.talenty.service;

import com.talenty.domain.dto.NavigationBar;
import com.talenty.domain.mongo.NavigationBarDocument;
import com.talenty.mapper.NavigationBarMapper;
import com.talenty.repository.NavigationBarRepository;
import org.springframework.stereotype.Service;

@Service
public class NavigationBarService {

    private final NavigationBarRepository navigationBarRepository;

    public NavigationBarService(final NavigationBarRepository navigationBarRepository) {
        this.navigationBarRepository = navigationBarRepository;
    }

    public NavigationBar findSystemNavigationBar() {
        final NavigationBarDocument systemNavigationBar = navigationBarRepository.findSystemNavigationBar();
        return NavigationBarMapper.instance.documentToDto(systemNavigationBar);
    }

}
