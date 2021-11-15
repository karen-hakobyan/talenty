import React from "react"

function CheckboxDisabledIcon(props) {
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
                fill="#F5F5F5"
                stroke="#D9D9D9"
            />
            <path
                d="M6.913 10.035h0a.525.525 0 01.412.2l-.412-.2zm0 0h-.82a.243.243 0 00-.19.394h0l3.21 4.067h0c.21.266.613.265.824 0h0l5.723-7.252s0 0 0 0a.243.243 0 00-.191-.394h-.82a.523.523 0 00-.411.2s0 0 0 0l-4.714 5.972m-2.61-2.987l2.61 2.987m0 0l-2.199-2.787 2.199 2.787z"
                fill="#BFBFBF"
                stroke="#BFBFBF"
                strokeWidth={0.3}
            />
        </svg>
    )
}

export default CheckboxDisabledIcon