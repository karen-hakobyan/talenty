package com.talenty.controller;

import com.talenty.domain.mongo.TypeValuesDocument;
import com.talenty.service.TypeValuesService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.Arrays;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final TypeValuesService typeValuesService;

    public AdminController(final TypeValuesService typeValuesService) {
        this.typeValuesService = typeValuesService;
    }

    @GetMapping("/dashboard")
    public String getDashboard() {
        return "Dashboard";
    }

    @GetMapping("/dropdown_lists")
    public ModelAndView getDropdownListsPage(final ModelAndView modelAndView) {
//        TypeValuesDocument typeValuesDocument = new TypeValuesDocument();
//        typeValuesDocument.setType("gender");
//        typeValuesDocument.setValues(new ArrayList<>(Arrays.asList("MALE", "FEMALE", "OTHER")));
//        TypeValuesDocument typeValuesDocument2 = new TypeValuesDocument();
//        typeValuesDocument2.setType("skills");
//        typeValuesDocument2.setValues(new ArrayList<>(Arrays.asList("CODING", "DB", "TRANSLATER")));
//
//        final ArrayList<TypeValuesDocument> objects = new ArrayList<>();
//        objects.add(typeValuesDocument);
//        objects.add(typeValuesDocument2);

        modelAndView.addObject("types_list", typeValuesService.findAll());
        modelAndView.setViewName("DropdownListsPage");
        return modelAndView;
    }

}
