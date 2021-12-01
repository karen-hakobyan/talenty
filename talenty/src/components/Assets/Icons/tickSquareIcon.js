import React from "react"

function TickSquareIcon(props) {
    return (
        <svg
            width={15}
            height={14}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                clipRule="evenodd"
                d="M10.39.835H4.61c-2.014 0-3.276 1.426-3.276 3.444v5.445c0 2.018 1.256 3.444 3.276 3.444h5.779c2.02 0 3.278-1.426 3.278-3.444V4.279c0-2.018-1.257-3.444-3.277-3.444z"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.127 7.001l1.582 1.582L9.873 5.42"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default TickSquareIcon
