import React from "react"

function EditIcon(props) {
    return (
        <svg
            width={14}
            height={14}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            style={{ marginRight: '10px', marginLeft: '10px' }}
        >
            <path
                d="M8.165 12.629H13"
                stroke="#616162"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                clipRule="evenodd"
                d="M7.52 1.53a1.497 1.497 0 012.077-.202l1.156.898c.693.419.908 1.31.48 1.99-.023.035-6.358 7.96-6.358 7.96-.211.263-.531.418-.873.422l-2.426.03-.547-2.313c-.077-.325 0-.667.21-.93L7.52 1.53z"
                stroke="#616162"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.347 3l3.635 2.792"
                stroke="#616162"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default EditIcon
