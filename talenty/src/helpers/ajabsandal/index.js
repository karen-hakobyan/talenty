let ObjectId = () => Math.random().toString();

let hrExData = {
    id: ObjectId(),
    system: true,
    name: "System Template",
    fields: [{
            id: ObjectId(),
            name: "Personal Info",
            metadata: {
                type: "section",
                deletable: false,
                display: "fold",
            },
            fields: [{
                    id: ObjectId(),
                    name: "First name",
                    metadata: {
                        type: "special_name",
                        maxLength: 20,
                        editable: false,
                        required_editable: false,
                        deletable: false,
                        required: true,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Last name",
                    metadata: {
                        type: "special_name",
                        maxLength: 20,
                        editable: false,
                        required_editable: false,
                        deletable: false,
                        required: true,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Gender",
                    metadata: {
                        type: "gender",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Date fo birth",
                    metadata: {
                        type: "date",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Phone Number",
                    metadata: {
                        type: "phone_number",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Email",
                    metadata: {
                        type: "email",
                        maxLength: 50,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Social media links",
                    metadata: {
                        type: "section",
                        selected_values: "multiple",
                        editable: false,
                        deletable: true,
                    },
                    fields: [{
                            id: ObjectId(),
                            name: "Facebook",
                            metadata: {
                                type: "social_link",
                                maxLength: 100,
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Linkedin",
                            metadata: {
                                type: "social_link",
                                maxLength: 100,
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: true,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Twitter",
                            metadata: {
                                type: "social_link",
                                maxLength: 100,
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Instagram",
                            metadata: {
                                type: "social_link",
                                maxLength: 100,
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Youtube",
                            metadata: {
                                type: "social_link",
                                maxLength: 100,
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Behance",
                            metadata: {
                                type: "social_link",
                                maxLength: 100,
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: true,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Dribbble",
                            metadata: {
                                type: "social_link",
                                maxLength: 100,
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: true,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Github",
                            metadata: {
                                type: "social_link",
                                maxLength: 100,
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Custom link",
                            metadata: {
                                type: "social_link",
                                maxLength: 100,
                                editable: false,
                                required_editable: true,
                                deletable: false,
                                required: false,
                            },
                        },
                    ],
                },
                {
                    id: ObjectId(),
                    name: "Country",
                    metadata: {
                        type: "country",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true,
                    },
                },
                {
                    id: ObjectId(),
                    name: "City",
                    metadata: {
                        type: "city",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Address",
                    metadata: {
                        type: "address",
                        maxLength: 100,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Salary",
                    metadata: {
                        type: "section",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true,
                    },
                    fields: [{
                            id: ObjectId(),
                            name: "Expected Salary",
                            metadata: {
                                type: "expected_salary",
                                maxLength: 10,
                                editable: false,
                                deletable: false,
                            },
                        },
                        {
                            id: ObjectId(),
                            name: "Salary type",
                            metadata: {
                                type: "salary_type",
                                maxLength: 3,
                                editable: false,
                                deletable: false,
                                value: "USD",
                                submitted_value: "USD",
                            },
                        },
                    ],
                },
                {
                    id: ObjectId(),
                    name: "Add photo",
                    metadata: {
                        type: "add_photo",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: true,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Military ID",
                    metadata: {
                        type: "military_id",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false,
                    },
                },
                {
                    id: ObjectId(),
                    name: "Driving license",
                    metadata: {
                        type: "driving_license",
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false,
                    },
                },
            ],
        },
        {
            id: ObjectId(),
            name: "Education and Training",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                id: ObjectId(),
                name: "Education and Training section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                        id: ObjectId(),
                        name: "University/Organization",
                        metadata: {
                            type: "text",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "Location",
                        metadata: {
                            type: "text",
                            maxLength: 100,
                            editable: false,
                            required_editable: false,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "Degree/Specialization",
                        metadata: {
                            type: "text",
                            maxLength: 100,
                            editable: false,
                            required_editable: false,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "From/to",
                        metadata: {
                            type: "section",
                            editable: false,
                            required_editable: false,
                            deletable: true,
                            required: false,
                        },
                        fields: [{
                                id: ObjectId(),
                                name: "From",
                                metadata: {
                                    type: "date",
                                    editable: false,
                                    deletable: false,
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "To",
                                metadata: {
                                    type: "date",
                                    editable: false,
                                    deletable: false,
                                },
                            },
                            {
                                id: ObjectId(),
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
                        id: ObjectId(),
                        name: "Education details",
                        metadata: {
                            type: "description",
                            maxLength: 1000,
                            editable: false,
                            required_editable: false,
                            deletable: true,
                            required: false,
                        },
                    },
                ],
            }, ],
        },
        {
            id: ObjectId(),
            name: "Work Experience",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                id: ObjectId(),
                name: "Work Experience section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                        id: ObjectId(),
                        name: "Company",
                        metadata: {
                            type: "text",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: true,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "Location",
                        metadata: {
                            type: "text",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "Position",
                        metadata: {
                            type: "text",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "From/to",
                        metadata: {
                            type: "section",
                            editable: false,
                            required_editable: false,
                            deletable: true,
                            required: false,
                        },
                        fields: [{
                                id: ObjectId(),
                                name: "From",
                                metadata: {
                                    type: "date",
                                    editable: false,
                                    deletable: false,
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "To",
                                metadata: {
                                    type: "date",
                                    editable: false,
                                    deletable: false,
                                },
                            },
                            {
                                id: ObjectId(),
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
                        id: ObjectId(),
                        name: "Job details",
                        metadata: {
                            type: "description",
                            maxLength: 1000,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                ],
            }, ],
        },
        {
            id: ObjectId(),
            name: "Professional skills",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                id: ObjectId(),
                name: "Professional skill section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                        id: ObjectId(),
                        name: "Skill",
                        metadata: {
                            type: "text",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: true,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "Evaluate bar",
                        metadata: {
                            type: "section",
                            selected_values: "only_one", //only_one, multiple
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                        fields: [{
                                id: ObjectId(),
                                name: "20%",
                                metadata: {
                                    type: "percentage",
                                    value: "20%",
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "40%",
                                metadata: {
                                    type: "percentage",
                                    value: "40%",
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "60%",
                                metadata: {
                                    type: "percentage",
                                    value: "60%",
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "80%",
                                metadata: {
                                    type: "percentage",
                                    value: "80%",
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "100%",
                                metadata: {
                                    type: "percentage",
                                    value: "100%",
                                },
                            },
                        ],
                    },
                ],
            }, ],
        },
        {
            id: ObjectId(),
            name: "Personal skills",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                id: ObjectId(),
                name: "Personal skill section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                        id: ObjectId(),
                        name: "Skill",
                        metadata: {
                            type: "text",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: true,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "Evaluate bar",
                        metadata: {
                            type: "section",
                            selected_values: "only_one",
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                        fields: [{
                                id: ObjectId(),
                                name: "20%",
                                metadata: {
                                    type: "percentage",
                                    value: "20%",
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "40%",
                                metadata: {
                                    type: "percentage",
                                    value: "40%",
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "60%",
                                metadata: {
                                    type: "percentage",
                                    value: "60%",
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "80%",
                                metadata: {
                                    type: "percentage",
                                    value: "80%",
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "100%",
                                metadata: {
                                    type: "percentage",
                                    value: "100%",
                                },
                            },
                        ],
                    },
                ],
            }, ],
        },
        {
            id: ObjectId(),
            name: "Languages",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                id: ObjectId(),
                name: "Language section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                        id: ObjectId(),
                        name: "Language",
                        metadata: {
                            type: "text",
                            maxLength: 20,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: true,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "Evaluate bar",
                        metadata: {
                            type: "section",
                            selected_values: "only_one",
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                        fields: [{
                                id: ObjectId(),
                                name: "Beginner",
                                metadata: {
                                    type: "language_level",
                                    value: "Beginner",
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "Advanced",
                                metadata: {
                                    type: "language_level",
                                    value: "Advanced",
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "Proficiency",
                                metadata: {
                                    type: "language_level",
                                    value: "Proficiency",
                                },
                            },
                        ],
                    },
                ],
            }, ],
        },
        {
            id: ObjectId(),
            name: "Summary",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                id: ObjectId(),
                name: "Description",
                metadata: {
                    type: "description",
                    maxLength: 1000,
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
            }, ],
        },
        {
            id: ObjectId(),
            name: "Interests and Hobbies",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                id: ObjectId(),
                name: "Interest and Hobby section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                    id: ObjectId(),
                    name: "Description",
                    metadata: {
                        type: "description",
                        maxLength: 1000,
                        editable: false,
                        required_editable: true,
                        deletable: true,
                        required: false,
                    },
                }, ],
            }, ],
        },
        {
            id: ObjectId(),
            name: "Projects/Products",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                id: ObjectId(),
                name: "Project/Product section",
                metadata: {
                    type: "section",
                    editable: false,
                    deletable: false,
                    required: false,
                },
                fields: [{
                        id: ObjectId(),
                        name: "Projects/Products",
                        metadata: {
                            type: "text",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: true,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "Description",
                        metadata: {
                            type: "description",
                            maxLength: 1000,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "URL",
                        metadata: {
                            type: "url",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    },
                    {
                        id: ObjectId(),
                        name: "Start-End",
                        metadata: {
                            type: "section",
                            editable: false,
                            required_editable: false,
                            deletable: true,
                            required: false,
                        },
                        fields: [{
                                id: ObjectId(),
                                name: "Start",
                                metadata: {
                                    type: "date",
                                    editable: false,
                                    deletable: false,
                                },
                            },
                            {
                                id: ObjectId(),
                                name: "End",
                                metadata: {
                                    type: "date",
                                    editable: false,
                                    deletable: false,
                                },
                            },
                            {
                                id: ObjectId(),
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
                ],
            }, ],
        },
        {
            id: ObjectId(),
            name: "Publications",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                    id: ObjectId(),
                    name: "Article section",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: false,
                    },
                    fields: [{
                        id: ObjectId(),
                        name: "Article Name",
                        metadata: {
                            type: "url",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: true,
                        },
                    }, ],
                },
                {
                    id: ObjectId(),
                    name: "Book section",
                    metadata: {
                        type: "section",
                        editable: false,
                        deletable: false,
                        required: false,
                    },
                    fields: [{
                        id: ObjectId(),
                        name: "Book Name",
                        metadata: {
                            type: "url",
                            maxLength: 100,
                            editable: false,
                            required_editable: true,
                            deletable: true,
                            required: false,
                        },
                    }, ],
                },
            ],
        },
        {
            id: ObjectId(),
            name: "Additional information",
            metadata: {
                type: "section",
                deletable: true,
                display: "fold",
            },
            fields: [{
                id: ObjectId(),
                name: "Description",
                metadata: {
                    type: "description",
                    maxLength: 1000,
                    editable: false,
                    required_editable: true,
                    deletable: true,
                    required: false,
                },
            }, ],
        },
    ],
};

export default hrExData;