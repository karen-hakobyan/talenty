package com.talenty.domain.dto;

import com.talenty.domain.Branches;
import com.talenty.domain.Products;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Company {

    private String id;
    private String name;
    private String profilePicture;
    private String logo;
    private List<String> links;
    private String legalForm;
    private String industry;
    private String founded;
    private int numberOfEmployees;
    private String address;
    private String phoneNumber;
    private String email;
    private String website;
    private String aboutCompany;
    private List<Products> products;
    private List<Branches> branches;
    private List<String> benefits;
    private String video;
    private String additionalInformation;

}
