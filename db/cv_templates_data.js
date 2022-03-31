db.cv_templates.drop()

let systemCVTemplate = {
    _id: ObjectId(),
    system: true,
    name: "System CV Template",
    fields: [{
        _id: ObjectId(),
        name: "Personal Info",
        metadata: {
            type: "section",
            deletable: false,
            display: "fold",
        },
        fields: [{
            _id: ObjectId(),
            name: "First name",
            metadata: {
                type: "special_name",
                placeholder: "First name",
                maxLength: 20,
                editable: false,
                required_editable: false,
                deletable: false,
                required: true,
            },
        },
            {
                _id: ObjectId(),
                name: "Last name",
                metadata: {
                    type: "special_name",
                    placeholder: "Last name",
                    maxLength: 20,
                    editable: false,
                    required_editable: false,
                    deletable: false,
                    required: true,
                },
            },
            {
                _id: ObjectId(),
                name: "Gender",
                metadata: {
                    type: "gender",
                    placeholder: "Choose your gender",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
            },
            {
                _id: ObjectId(),
                name: "Date fo birth",
                metadata: {
                    placeholder: "DD/MM/YYYY",
                    type: "date",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
            },
            {
                _id: ObjectId(),
                name: "Phone Number",
                metadata: {
                    type: "phone_number",
                    placeholder: "77 123 456",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
            },
            {
                _id: ObjectId(),
                name: "Email",
                metadata: {
                    type: "email",
                    placeholder: "Your email",
                    maxLength: 50,
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
            },
            {
                _id: ObjectId(),
                name: "Country",
                metadata: {
                    type: "country",
                    placeholder: "Select your country",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
            },
            {
                _id: ObjectId(),
                name: "City",
                metadata: {
                    type: "city",
                    placeholder: "City",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
            },
            {
                _id: ObjectId(),
                name: "Address",
                metadata: {
                    type: "address",
                    placeholder: "Address",
                    maxLength: 100,
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
            },
            {
                _id: ObjectId(),
                name: "Salary",
                metadata: {
                    type: "section",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "Expected Salary",
                    metadata: {
                        type: "salary",
                        placeholder: "Expected Salary",
                        maxLength: 10,
                        editable: false,
                        deletable: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        name: "Salary type",
                        metadata: {
                            type: "currency",
                            placeholder: "USD",
                            maxLength: 3,
                            editable: false,
                            deletable: false,
                            values: ["USD"],
                            submitted_value: "USD",
                        },
                    },
                ],
            },
            {
                _id: ObjectId(),
                name: "Other",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: true,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "Add photo",
                    metadata: {
                        type: "add_photo",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        name: "Military ID",
                        metadata: {
                            type: "military_id",
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                            values: ["Yes", "No"],
                            values_visibility: "ROLE_JOB_SEEKER",
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Driving license",
                        metadata: {
                            type: "driving_license",
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                            values: ["Yes", "No"],
                            values_visibility: "ROLE_JOB_SEEKER",
                        }
                    },
                ]
            },
            {
                _id: ObjectId(),
                name: "Social media links",
                metadata: {
                    type: "section",
                    selected_values: "multiple",
                    editable: false,
                    deletable: true,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "Facebook",
                    metadata: {
                        type: "social_link",
                        placeholder: "URL",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        name: "Linkedin",
                        metadata: {
                            type: "social_link",
                            placeholder: "URL",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Twitter",
                        metadata: {
                            type: "social_link",
                            placeholder: "URL",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Instagram",
                        metadata: {
                            type: "social_link",
                            placeholder: "URL",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Youtube",
                        metadata: {
                            type: "social_link",
                            placeholder: "URL",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Behance",
                        metadata: {
                            type: "social_link",
                            placeholder: "URL",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Dribbble",
                        metadata: {
                            type: "social_link",
                            placeholder: "URL",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Github",
                        metadata: {
                            type: "social_link",
                            placeholder: "URL",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Custom link",
                        metadata: {
                            type: "social_link",
                            placeholder: "URL",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                        },
                    },
                ],
            },
        ],
    },
        {
            _id: ObjectId(),
            name: "Education and Training",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                _id: ObjectId(),
                name: "Education and Training section",
                metadata: {
                    type: "section_container",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "University/Organization",
                    metadata: {
                        type: "text",
                        placeholder: "University/Organization",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        name: "Location",
                        metadata: {
                            type: "text",
                            placeholder: "Country/City",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Degree/Specialization",
                        metadata: {
                            type: "text",
                            placeholder: "Degree/Specialization",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "From/to",
                        metadata: {
                            type: "section",
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                        fields: [{
                            _id: ObjectId(),
                            name: "From",
                            metadata: {
                                type: "date",
                                placeholder: "From",
                                editable: false,
                                deletable: false,
                            },
                        },
                            {
                                _id: ObjectId(),
                                name: "To",
                                metadata: {
                                    type: "date",
                                    placeholder: "To",
                                    editable: false,
                                    deletable: false,
                                },
                            },
                            {
                                _id: ObjectId(),
                                name: "Still studying",
                                metadata: {
                                    type: "current_date",
                                    editable: false,
                                    deletable: false,
                                    visibility: "ROLE_JOB_SEEKER",
                                },
                            },
                        ],
                    },
                    {
                        _id: ObjectId(),
                        name: "Education details",
                        metadata: {
                            type: "description",
                            placeholder: "Education details",
                            maxLength: 1000,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                ],
            },],
        },
        {
            _id: ObjectId(),
            name: "Work Experience",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                _id: ObjectId(),
                name: "Work Experience section",
                metadata: {
                    type: "section_container",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "Company",
                    metadata: {
                        type: "text",
                        placeholder: "Company name",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        name: "Location",
                        metadata: {
                            type: "text",
                            placeholder: "Country/City",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Position",
                        metadata: {
                            type: "text",
                            placeholder: "Position",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "From/to",
                        metadata: {
                            type: "section",
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                        fields: [{
                            _id: ObjectId(),
                            name: "From",
                            metadata: {
                                type: "date",
                                placeholder: "From",
                                editable: false,
                                deletable: false,
                            },
                        },
                            {
                                _id: ObjectId(),
                                name: "To",
                                metadata: {
                                    type: "date",
                                    placeholder: "To",
                                    editable: false,
                                    deletable: false,
                                },
                            },
                            {
                                _id: ObjectId(),
                                name: "Still working",
                                metadata: {
                                    type: "current_date",
                                    editable: false,
                                    deletable: false,
                                    visibility: "ROLE_JOB_SEEKER",
                                },
                            },
                        ],
                    },
                    {
                        _id: ObjectId(),
                        name: "Job details",
                        metadata: {
                            type: "description",
                            placeholder: "Job details",
                            maxLength: 1000,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                ],
            },],
        },
        {
            _id: ObjectId(),
            name: "Professional skills",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                _id: ObjectId(),
                name: "Professional skill section",
                metadata: {
                    type: "section_container",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "Skill",
                    metadata: {
                        type: "professional_skill",
                        placeholder: "Skill name",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        name: "Evaluate bar",
                        metadata: {
                            type: "simple_evaluate_bar",
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                            values: ["0%", "20%", "40%", "60%", "80%", "100%"],
                        }
                    },
                ],
            },],
        },
        {
            _id: ObjectId(),
            name: "Personal skills",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                _id: ObjectId(),
                name: "Personal skill section",
                metadata: {
                    type: "section_container",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "Skill",
                    metadata: {
                        type: "personal_skill",
                        placeholder: "Skill name",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        name: "Evaluate bar",
                        metadata: {
                            type: "simple_evaluate_bar",
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                            values: ["0%", "20%", "40%", "60%", "80%", "100%"],
                        },
                    },
                ],
            },],
        },
        {
            _id: ObjectId(),
            name: "Languages",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                _id: ObjectId(),
                name: "Language section",
                metadata: {
                    type: "section_container",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "Language",
                    metadata: {
                        type: "language",
                        placeholder: "Choose language",
                        maxLength: 20,
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        name: "Proficiency level",
                        metadata: {
                            type: "language_evaluate_bar",
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                            values: [
                                "Beginner",
                                "Advanced",
                                "Proficiency",
                            ],
                        },
                    },
                ],
            },],
        },
        {
            _id: ObjectId(),
            name: "Summary",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                _id: ObjectId(),
                name: "Description",
                metadata: {
                    type: "description",
                    placeholder: "Description",
                    maxLength: 1000,
                    editable: false,
                    required_editable: true,
                    deletable: false,
                    required: false,
                },
            },],
        },
        {
            _id: ObjectId(),
            name: "Interests and Hobbies",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                _id: ObjectId(),
                name: "Description",
                metadata: {
                    type: "description",
                    placeholder: "Description",
                    maxLength: 1000,
                    editable: false,
                    required_editable: true,
                    deletable: false,
                    required: false,
                },
            },],
        },
        {
            _id: ObjectId(),
            name: "Projects/Products",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                _id: ObjectId(),
                name: "Project/Product section",
                metadata: {
                    type: "section_container",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "Projects/Products",
                    metadata: {
                        type: "text",
                        placeholder: "Projects/Products name",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        name: "Start-End",
                        metadata: {
                            type: "section",
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                        fields: [{
                            _id: ObjectId(),
                            name: "Start",
                            metadata: {
                                placeholder: "Start",
                                type: "date",
                                editable: false,
                                deletable: false,
                            },
                        },
                            {
                                _id: ObjectId(),
                                name: "End",
                                metadata: {
                                    type: "date",
                                    placeholder: "End",
                                    editable: false,
                                    deletable: false,
                                },
                            },
                            {
                                _id: ObjectId(),
                                name: "Still processing",
                                metadata: {
                                    type: "current_date",
                                    editable: false,
                                    deletable: false,
                                    visibility: "ROLE_JOB_SEEKER",
                                },
                            },
                        ],
                    },
                    {
                        _id: ObjectId(),
                        name: "URL",
                        metadata: {
                            type: "url",
                            placeholder: "URL",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        _id: ObjectId(),
                        name: "Description",
                        metadata: {
                            type: "description",
                            placeholder: "Job details",
                            maxLength: 1000,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                ],
            },],
        },
        {
            _id: ObjectId(),
            name: "Publications",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                _id: ObjectId(),
                name: "Article section",
                metadata: {
                    type: "section_container",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "Article Name",
                    metadata: {
                        type: "text",
                        placeholder: "Article Name",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: false,
                        required: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        metadata: {
                            type: "url",
                            placeholder: "URL",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: false,
                            required: false,
                            visibility: "ROLE_JOB_SEEKER",
                        },
                    }
                ],
            },
                {
                    _id: ObjectId(),
                    name: "Book section",
                    metadata: {
                        type: "section_container",
                        editable: false,
                        deletable: false,
                        required: false,
                    },
                    fields: [{
                        _id: ObjectId(),
                        name: "Book Name",
                        metadata: {
                            type: "text",
                            placeholder: "Book name",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                        {
                            _id: ObjectId(),
                            metadata: {
                                type: "url",
                                placeholder: "URL",
                                maxLength: 100,
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false,
                                visibility: "ROLE_JOB_SEEKER",
                            },
                        },
                    ],
                },
            ],
        },
        {
            _id: ObjectId(),
            name: "Additional information",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                _id: ObjectId(),
                name: "Description",
                metadata: {
                    type: "description",
                    placeholder: "Description",
                    maxLength: 1000,
                    editable: false,
                    required_editable: true,
                    deletable: false,
                    required: false,
                },
            },],
        },
    ],
};

let test_cv_template = {
    _id: ObjectId(),
    system: true,
    name: "Test CV Template",
    fields: [{
        _id: ObjectId(),
        name: "Personal Info",
        metadata: {
            type: "section",
            deletable: false,
            display: "fold",
        },
        fields: [{
            _id: ObjectId(),
            name: "First name",
            metadata: {
                type: "special_name",
                placeholder: "First name",
                maxLength: 20,
                editable: false,
                required_editable: false,
                deletable: false,
                required: true,
            },
        },
            {
                _id: ObjectId(),
                name: "Last name",
                metadata: {
                    type: "special_name",
                    placeholder: "Last name",
                    maxLength: 20,
                    editable: false,
                    required_editable: false,
                    deletable: false,
                    required: true,
                },
            },
            {
                _id: ObjectId(),
                name: "Salary",
                metadata: {
                    type: "section",
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
                fields: [{
                    _id: ObjectId(),
                    name: "Expected Salary",
                    metadata: {
                        type: "salary",
                        placeholder: "Expected Salary",
                        maxLength: 10,
                        editable: false,
                        deletable: false,
                    },
                },
                    {
                        _id: ObjectId(),
                        name: "Salary type",
                        metadata: {
                            type: "currency",
                            placeholder: "USD",
                            maxLength: 3,
                            editable: false,
                            deletable: false,
                            values: ["USD"],
                            submitted_value: "USD",
                        },
                    },
                ],
            }
        ],
    }]
}

db.cv_templates.insert(systemCVTemplate);
// db.cv_templates.insert(test_cv_template);