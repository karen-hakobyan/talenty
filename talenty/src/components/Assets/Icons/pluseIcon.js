import React from "react"

function PluseIcon(props) {
    return (
        <svg
            width={16}
            height={16}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8 5.553v4.884M10.444 7.995H5.556"
                stroke="#616162"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                clipRule="evenodd"
                d="M11.124 1.334H4.876c-2.178 0-3.543 1.542-3.543 3.724v5.886c0 2.182 1.359 3.724 3.543 3.724h6.248c2.184 0 3.543-1.542 3.543-3.724V5.058c0-2.182-1.36-3.724-3.543-3.724z"
                stroke="#616162"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default PluseIcon
