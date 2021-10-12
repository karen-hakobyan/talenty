package com.talenty.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "cv_fields")
public class FieldEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "details")
    private String details;

    @Column(name = "is_editable")
    private boolean isEditable;

    @Column(name = "is_deletable")
    private boolean isDeletable;

    @Column(name = "is_required")
    private boolean isRequired;
}
