import React from "react";

function YoutubeIcon(props) {
    return (
        <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M17.438 15L13.5 12.75v4.5L17.438 15z" fill="#2F2F2F"/>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 4.688A4.688 4.688 0 014.688 0h20.625A4.688 4.688 0 0130 4.688v20.625A4.688 4.688 0 0125.312 30H4.688A4.688 4.688 0 010 25.312V4.688zm20.813 5.343a1.857 1.857 0 011.312 1.313C22.5 12.563 22.5 15 22.5 15s0 2.438-.281 3.656a1.857 1.857 0 01-1.313 1.313c-1.218.281-5.906.281-5.906.281s-4.781 0-5.906-.281a1.857 1.857 0 01-1.313-1.313C7.5 17.438 7.5 15 7.5 15s0-2.438.188-3.656A1.857 1.857 0 019 10.03c1.219-.281 5.906-.281 5.906-.281s4.781 0 5.906.281z"
                fill="#2F2F2F"
            />
        </svg>
    );
}

export default YoutubeIcon;
