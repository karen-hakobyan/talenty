import React from "react";

function DeleteIcon(props) {
  return (
    <svg
      width={14}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: "10px", opacity: props.deletable === "true" && "0.5" }}
      {...props}
    >
      <path
        d="M11.383 5.312s-.362 4.49-.572 6.382c-.1.903-.658 1.432-1.572 1.449-1.74.031-3.48.033-5.22-.003-.878-.018-1.427-.554-1.525-1.442-.211-1.908-.571-6.386-.571-6.386M12.306 3.16H1M10.127 3.16c-.523 0-.974-.37-1.077-.883l-.162-.81a.853.853 0 00-.824-.633H5.242a.853.853 0 00-.825.633l-.162.81a1.099 1.099 0 01-1.077.883"
        stroke="#616162"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DeleteIcon;
