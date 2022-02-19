import React from "react";

function LinkIcon(props) {
    return (
        <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect width={30} height={30} rx={5} fill="#2F2F2F"/>
            <path
                d="M16.126 13.874a3.185 3.185 0 00-4.503 0L9.37 16.126a3.185 3.185 0 104.504 4.504L15 19.504"
                stroke="#E5E5E5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.874 16.126a3.185 3.185 0 004.503 0l2.253-2.252a3.185 3.185 0 10-4.504-4.504L15 10.496"
                stroke="#E5E5E5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default LinkIcon;
