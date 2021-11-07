import React from "react"

function EditSquareIcon(props) {
    return (
        <svg
            width={20}
            height={20}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: 'pointer' }}
            {...props}
        >
            <path
                d="M9.535 1.557H6.107c-2.819 0-4.586 1.995-4.586 4.82V14c0 2.825 1.76 4.82 4.586 4.82h8.089c2.828 0 4.587-1.995 4.587-4.82v-3.693"
                stroke="#616162"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                clipRule="evenodd"
                d="M7.092 9.01l6.85-6.85a2.186 2.186 0 013.09 0l1.116 1.116a2.185 2.185 0 010 3.09l-6.883 6.883a1.99 1.99 0 01-1.407.583H6.424l.086-3.465c.013-.51.221-.995.582-1.356z"
                stroke="#616162"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.901 3.219l4.186 4.185"
                stroke="#616162"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default EditSquareIcon
