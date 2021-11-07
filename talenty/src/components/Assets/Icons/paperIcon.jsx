import React from "react"

function PaperIcon(props) {
    return (
        <svg
            width={18}
            height={20}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                clipRule="evenodd"
                d="M11.738.762H5.085A3.82 3.82 0 001.25 4.49v10.713a3.828 3.828 0 003.742 3.91c.03 0 .06.002.092 0h7.989a3.887 3.887 0 003.729-3.91V6.038L11.738.762z"
                stroke="#870FE4"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.475.75v2.909a2.574 2.574 0 002.568 2.575h2.755M11.288 13.358h-5.4M9.243 9.606H5.887"
                stroke="#870FE4"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default PaperIcon
