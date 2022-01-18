package com.talenty.controller;

import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.TypeValuesDocument;
import com.talenty.mapper.TypeValuesMapper;
import com.talenty.service.TypeValuesService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/type_values")
public class TypeValuesController {

    private final TypeValuesService typeValuesService;

    public TypeValuesController(final TypeValuesService typeValuesService) {
        this.typeValuesService = typeValuesService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveTypeValue(@RequestBody final TypeValues typeValues){
        TypeValuesDocument save = typeValuesService.save(typeValues);
        System.out.println();
        return ResponseEntity.ok("Type Saved");
    }

    public List<TypeValues> getAll() {
        final List<TypeValues> result = new ArrayList<>();
        List<TypeValuesDocument> all = typeValuesService.findAll();
        for (TypeValuesDocument typeValuesDocument : all) {
            result.add(TypeValuesMapper.instance.documentToDto(typeValuesDocument));
        }
        return result;
    }

}
