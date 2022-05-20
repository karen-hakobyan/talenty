package com.talenty.domain.mongo;

import com.talenty.domain.Branches;
import com.talenty.domain.Products;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@Document("companies")
public class CompanyDocument {

    @Id
    private String id;
    @Indexed(unique = true)
    private String name;
    private String profilePicture;
    private String logo;
    private List<String> links = new ArrayList<>();
    private String legalForm;
    private String industry;
    private String founded;
    private String numberOfEmployees;
    private String address;
    private String phoneNumber;
    private String email;
    private String website;
    private String aboutCompany;
    private List<Products> products = new ArrayList<>();
    private List<Branches> branches = new ArrayList<>();
    private List<String> benefits =  new ArrayList<>();
    private String video;
    private String additionalInformation;

}
