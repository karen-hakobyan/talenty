export const job_container = (open) => ({
    display: 'flex',
    background: '#FFF',
    boxShadow: !open ? '0px 4px 4px rgba(182, 182, 182, 0.16)' : '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '8px',
    cursor: 'pointer',
    height: '120px',
    alignItems: 'center',
    px: '20px',
    pb: "20px",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '24px',
    position: "relative"
})
export const JOB_NAME_AND_COMPANY_NAME = {
    flex: 2,
    "& span": {
        display: "block",
    },
    '& span:nth-of-type(2)': {
        mt: '10px',
        fontSize: '16px',
    },
}
export const JOB_DESCRIPTION = {
    fontSize: "24px",
    lineHeight: "24px",
    "& p": {
        fontFamily: "'Poppins', sans-serif",
        fontSize: "16px",
        lineHeight: "20px",
        mt: 2,
        mb: 1.875,
        color: "rgba(51, 27, 59, 0.66)",
        pl: "8.5px"
    },
}
export const MORE_INFORMATION = (open) => ({
    p: '54px 40px 55px',
    ...(!open ? { display: 'none' } : {}),
    background: '#FDFDFD',
    boxShadow: '0px 4px 4px rgba(182, 182, 182, 0.16)',
    borderRadius: '8px',
})
export const JOB_RESPONSIBIITIS_CONTAINER = {
    fontSize: "24px",
    lineHeight: "24px",
    "& h4": {
        mt: 6.75
    },
}

export const MUI_RICH_TEXT_EDITOR_STYLES = {
    fontFamily: 'Poppins',
    "& .MUIRichTextEditor-container-2": {
        fontFamily: "Poppins",
        color: "rgba(51, 27, 59, 0.66)",
        pl: 2.25

    }
}
export const BUTTON_CENTR_STYLES = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    mt: 8.175
}
export const LINE = {
    width: "100%",
    height: "1px",
    backgroundColor: "#D2D2D2"
}