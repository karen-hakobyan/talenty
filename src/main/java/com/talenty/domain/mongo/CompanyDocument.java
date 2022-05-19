package com.talenty.domain.mongo;

import com.talenty.domain.Branches;
import com.talenty.domain.Products;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

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
