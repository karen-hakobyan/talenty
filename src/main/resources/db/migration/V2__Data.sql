insert into users (email, password, role)
values ('hr@talenty.com', 'hr', 'ROLE_MANAGER');

insert into users (email, password, role)
values ('user@talenty.com', 'user', 'ROLE_USER');

insert into cv_templates (name, manager_id)
values ('System template', null);

insert into cv_fields (name, cv_template_id, parent_id, metadata)
values ('Personal Info',
        (select id from cv_templates where name = 'System template'),
        null,
        '{
          "type": "section",
          "editable": false,
          "deletable": false,
          "required": true,
          "display": "fold"
        }');

insert into cv_fields (name, cv_template_id, parent_id, metadata)
values ('First name',
        (select id from cv_templates where name = 'System template'),
        (
            select id
            from cv_fields
            where name = 'Personal Info'
              and cv_template_id =
                  (select id from cv_templates where name = 'System template')
        ),
        '{
          "type": "text",
          "maxLength": 100,
          "editable": false,
          "deletable": false,
          "required": true
        }');

insert into cv_fields (name, cv_template_id, parent_id, metadata)
values ('Last name',
        (select id from cv_templates where name = 'System template'),
        (
            select id
            from cv_fields
            where name = 'Personal Info'
              and cv_template_id =
                  (select id from cv_templates where name = 'System template')
        ),
        '{
          "type": "text",
          "maxLength": 100,
          "editable": false,
          "deletable": false,
          "required": true
        }');

insert into cv_fields (name, cv_template_id, parent_id, metadata)
values ('Gender',
        (select id from cv_templates where name = 'System template'),
        (
            select id
            from cv_fields
            where name = 'Personal Info'
              and cv_template_id =
                  (select id from cv_templates where name = 'System template')
        ),
        '{
          "type": "text",
          "maxLength": 100,
          "editable": false,
          "deletable": true,
          "required": false,
          "values": [
            "MALE",
            "FEMALE"
          ]
        }');

insert into cv_fields (name, cv_template_id, parent_id, metadata)
values ('Social media links',
        (select id from cv_templates where name = 'System template'),
        (
            select id
            from cv_fields
            where name = 'Personal Info'
              and cv_template_id =
                  (select id from cv_templates where name = 'System template')
        ),
        '{
          "type": "section",
          "editable": false,
          "deletable": true,
          "required": false
        }');

insert into cv_fields (name, cv_template_id, parent_id, metadata)
values ('Facebook',
        (select id from cv_templates where name = 'System template'),
        (
            select id
            from cv_fields
            where (select id
                   from cv_fields
                   where name = 'Personal Info'
                     and cv_template_id =
                         (
                             select id
                             from cv_templates
                             where name = 'System template'
                         )
                  ) = parent_id
              and name = 'Social media links'
        ),
        '{
          "type": "social_link",
          "editable": false,
          "deletable": false,
          "required": false
        }');

insert into cv_fields (name, cv_template_id, parent_id, metadata)
values ('Salary',
        (select id from cv_templates where name = 'System template'),
        (
            select id
            from cv_fields
            where name = 'Personal Info'
              and cv_template_id =
                  (select id from cv_templates where name = 'System template')
        ),
        '{
          "type": "section",
          "editable": false,
          "deletable": true,
          "required": false
        }');

insert into cv_fields (name, cv_template_id, parent_id, metadata)
values ('Expected salary',
        (select id from cv_templates where name = 'System template'),
        (
            select id
            from cv_fields
            where (select id
                   from cv_fields
                   where name = 'Personal Info'
                     and cv_template_id =
                         (
                             select id
                             from cv_templates
                             where name = 'System template'
                         )
                  ) = parent_id
              and name = 'Salary'
        ),
        '{
          "type": "text",
          "maxlength": 20,
          "editable": false,
          "deletable": false,
          "required": true
        }');

insert into cv_fields (name, cv_template_id, parent_id, metadata)
values ('Salary type',
        (select id from cv_templates where name = 'System template'),
        (
            select id
            from cv_fields
            where (select id
                   from cv_fields
                   where name = 'Personal Info'
                     and cv_template_id =
                         (
                             select id
                             from cv_templates
                             where name = 'System template'
                         )
                  ) = parent_id
              and name = 'Salary'
        ),
        '{
          "type": "dropdown",
          "editable": false,
          "deletable": false,
          "required": true,
          "values": [
            "AMD",
            "USD"
          ]
        }');
