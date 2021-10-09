create table users
(
    id       serial primary key,
    email    text unique not null,
    password text        not null,
    role     text check (role in ('manager', 'user'))
);

create table cv_templates
(
    id         serial primary key,
    name       text not null,
    manager_id int,
    foreign key (manager_id) references users (id)
);

create table cv_sections
(
    id             serial primary key,
    name           text not null,
    cv_template_id int  not null,
    is_editable    boolean,
    is_deletable   boolean,
    foreign key (cv_template_id) references cv_templates (id)
);

create table cv_fields
(
    id            serial primary key,
    name          text not null,
    type          text check (type in ('text', 'integer', 'checkbox', 'dropdown', 'image')),
    details       text,
    cv_section_id int  not null,
    is_editable   boolean,
    is_deletable  boolean,
    foreign key (cv_section_id) references cv_sections (id)
);
