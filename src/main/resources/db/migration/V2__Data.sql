insert into cv_templates (name, manager_id)
values ('System template', null);

insert into cv_sections (name, cv_template_id, is_editable, is_deletable)
values ('Personal info', 1, false, false);

insert into cv_fields (name, type, details, cv_section_id, is_editable, is_deletable, is_required)
values ('First name', 'text', '{
  "maxLength": 100
}', (select id from cv_sections where name = 'Personal info'), false, false, true);

insert into cv_fields (name, type, details, cv_section_id, is_editable, is_deletable, is_required)
values ('Last name', 'text', '{
  "maxLength": 100
}', (select id from cv_sections where name = 'Personal info'), false, false, true);

insert into cv_fields (name, type, details, cv_section_id, is_editable, is_deletable, is_required)
values ('Gender', 'dropdown', '{
  "possibleValues": [
    "Male",
    "Female"
  ]
}', (select id from cv_sections where name = 'Personal info'), false, false, true);
