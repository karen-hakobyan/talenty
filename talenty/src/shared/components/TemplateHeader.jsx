import {Box} from "@mui/material";
import {DIALOG_TITLE_CONTAINER} from "../styles";

export default function SharedTemplateHeader({title}) {
    return (
        <Box
            sx={{
                ...DIALOG_TITLE_CONTAINER,
                pb: "20px",
                borderBottom: "2px solid #D2D2D2",
            }}
        >
            {title}
        </Box>
    );
}
