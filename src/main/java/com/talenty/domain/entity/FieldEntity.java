package com.talenty.domain.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "cv_fields")
@TypeDef(name = "json", typeClass = JsonType.class)
public class FieldEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Type(type = "json")
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> metadata;
}
