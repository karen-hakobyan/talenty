create table users
(
    id       serial primary key,
    email    text unique not null,
    password text        not null,
    role     text check (role in ('ROLE_MANAGER', 'ROLE_USER'))
);

create table cv_templates
(
    id         serial primary key,
    name       text not null,
    manager_id int,
    foreign key (manager_id) references users (id)
);

create table cv_fields
(
    id             serial primary key,
    name           text  not null,
    type           text check (type in ('section', 'text', 'phone_number', 'email', 'date', 'link', 'dropdown')),
    cv_template_id int   not null,
    parent_id      int,
    metadata       jsonb not null,
    foreign key (cv_template_id) references cv_templates (id),
    foreign key (parent_id) references cv_fields (id)
);
