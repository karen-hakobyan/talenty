package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Getter
@Setter
public class CurrentJobDocument {

    @Id
    private String id;
    private String name;
    private Date deadline;
    private String country;

}
