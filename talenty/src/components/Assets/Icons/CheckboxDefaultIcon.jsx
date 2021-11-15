import React from "react"

function CheckboxDefaultIcon(props) {
    return (
        <svg
            width={22}
            height={22}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                x={0.5}
                y={0.5}
                width={21}
                height={21}
                rx={1.5}
                fill="#fff"
                stroke="#D9D9D9"
            />
        </svg>
    )
}

export default CheckboxDefaultIcon
