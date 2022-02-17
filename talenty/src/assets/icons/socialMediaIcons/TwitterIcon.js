import React from "react";

function TwitterIcon(props) {
    return (
        <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 4.688A4.688 4.688 0 014.688 0h20.625A4.688 4.688 0 0130 4.688v20.625A4.688 4.688 0 0125.312 30H4.688A4.688 4.688 0 010 25.312V4.688zm20.719 6.093c.656-.094 1.218-.187 1.781-.469a4.331 4.331 0 01-1.594 1.594c.188 4.406-3 9.188-8.718 9.188-1.688 0-3.282-.563-4.688-1.407 1.594.188 3.281-.28 4.406-1.125A3.038 3.038 0 019 16.407c.469.094.938 0 1.406-.093C9 15.938 7.97 14.624 7.97 13.219c.468.187.937.375 1.406.375-1.313-.938-1.781-2.719-.938-4.125 1.594 1.875 3.844 3.094 6.376 3.187-.47-1.875 1.03-3.75 3-3.75.843 0 1.687.375 2.25.938.75-.188 1.406-.375 1.968-.75-.187.75-.656 1.312-1.312 1.687z"
                fill="#2F2F2F"
            />
        </svg>
    );
}

export default TwitterIcon;
