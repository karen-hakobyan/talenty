package com.talenty.domain.mongo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class FilledFieldDocument {

    @Id
    private String id;
    private List<FilledFieldDocument> fields;
    private String value;

}
