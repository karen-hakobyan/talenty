let test_cv_template = {
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