package com.talenty.controller;

import com.talenty.service.TypeValuesService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

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
        modelAndView.addObject("types_list", typeValuesService.getTypes());
        modelAndView.setViewName("DropdownListsPage");
        return modelAndView;
    }

    @GetMapping("/job_announcements")
    public ModelAndView getJobAnnouncementsPage(final ModelAndView modelAndView) {
        modelAndView.setViewName("JobAnnouncementsPage");
        return modelAndView;
    }

}
