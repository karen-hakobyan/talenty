package com.talenty.controller;

import com.talenty.domain.dto.TypeValues;
import com.talenty.domain.mongo.TypeValuesDocument;
import com.talenty.service.TypeValuesService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/type_values")
public class TypeValuesController {

    private final TypeValuesService typeValuesService;

    public TypeValuesController(final TypeValuesService typeValuesService) {
        this.typeValuesService = typeValuesService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveTypeValue(@RequestBody final TypeValues typeValues) {
        TypeValuesDocument save = typeValuesService.save(typeValues);
        return ResponseEntity.ok("Type Saved");
    }

    @GetMapping("/get_all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(typeValuesService.getTypesWithValues());
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteType(@RequestBody final TypeValues typeValues) {
        String type = typeValuesService.delete(typeValues);
        return ResponseEntity.ok("Type Deleted");
    }

    @PostMapping("/edit_values")
    public ResponseEntity<?> editValues(@RequestBody final TypeValues typeValues) {
        TypeValuesDocument editValues = typeValuesService.editValues(typeValues);
        return ResponseEntity.ok("Type Edited");
    }
}
