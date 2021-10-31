insert into users (email, password, role)
values ('hr@talenty.com', 'hr', 'ROLE_MANAGER');

insert into users (email, password, role)
values ('user@talenty.com', 'user', 'ROLE_USER');

insert into cv_templates (name, manager_id)
values ('System template', null);

insert into cv_fields (name, type, cv_template_id, parent_id, metadata)
values ('Personal Info', 'section', 1, null,
        '{
          "locked": true,
          "required": true,
          "display": "fold"
        }');

insert into cv_fields (name, type, cv_template_id, parent_id, metadata)
values ('First name',
        'text',
        1,
        (select id from cv_fields where name = 'Personal Info' and cv_template_id = 1),
        '{
          "maxLength": 100,
          "locked": true,
          "required": true
        }');

insert into cv_fields (name, type, cv_template_id, parent_id, metadata)
values ('Last name',
        'text',
        1,
        (select id from cv_fields where name = 'Personal Info' and cv_template_id = 1),
        '{
          "maxLength": 100,
          "locked": true,
          "required": true
        }');

insert into cv_fields (name, type, cv_template_id, parent_id, metadata)
values ('Gender',
        'dropdown',
        1,
        (select id from cv_fields where name = 'Personal Info' and cv_template_id = 1),
        '{
          "locked": true,
          "required": true,
          "values": [
            "Male",
            "Female"
          ]
        }');

insert into cv_fields (name, type, cv_template_id, parent_id, metadata)
values ('Date of birth',
        'date',
        1,
        (select id from cv_fields where name = 'Personal Info' and cv_template_id = 1),
        '{
          "locked": true,
          "required": true
        }');

insert into cv_fields (name, type, cv_template_id, parent_id, metadata)
values ('Phone number',
        'phone_number',
        1,
        (select id from cv_fields where name = 'Personal Info' and cv_template_id = 1),
        '{
          "locked": true,
          "required": true
        }');

insert into cv_fields (name, type, cv_template_id, parent_id, metadata)
values ('Email',
        'email',
        1,
        (select id from cv_fields where name = 'Personal Info' and cv_template_id = 1),
        '{
          "locked": true,
          "required": true
        }');

insert into cv_fields (name, type, cv_template_id, parent_id, metadata)
values ('Social Media',
        'section',
        1,
        (select id from cv_fields where name = 'Personal Info' and cv_template_id = 1),
        '{
          "display": "block",
          "locked": false,
          "required": false
        }');

insert into cv_fields (name, type, cv_template_id, parent_id, metadata)
values ('Facebook',
        'link',
        1,
        (
            select field.id
            from cv_fields field
                     inner join cv_fields parent on field.parent_id = parent.id
            where parent.name = 'Personal Info' and field.name = 'Social Media'
        ),
        '{
          "display": "checkbox",
          "locked": false,
          "required": false
        }');

insert into cv_fields (name, type, cv_template_id, parent_id, metadata)
values ('Linkedin',
        'link',
        1,
        (
            select field.id
            from cv_fields field
                     inner join cv_fields parent on field.parent_id = parent.id
            where parent.name = 'Personal Info' and field.name = 'Social Media'
        ),
        '{
          "display": "checkbox",
          "locked": false,
          "required": false
        }');
