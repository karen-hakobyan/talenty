package com.talenty.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "cv_sections")
public class SectionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany
    @JoinColumn(name = "cv_section_id")
    private List<FieldEntity> fields;

    @Column(name = "is_editable")
    private boolean isEditable;

    @Column(name = "is_deletable")
    private boolean isDeletable;
}
