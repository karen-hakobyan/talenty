import {Checkbox, styled} from "@mui/material";
import {MAIN_PURPLE} from "../../style/colors";

export const ListStyle = {
    width: "100%",
    maxWidth: "100%",
    bgcolor: "background.paper",
    mt: 2,
};
export const TextFieldStyle = {
    pt: 1,
};

export const ListItemStyle = {
    display: "flex",
    alignItems: "center",
    p: 0,
    pb: 0,
    mt: 3,
    mb: 2.5,
    img: {"&:last-child": {ml: 2}, cursor: "pointer", mb: 1.5},
};

export const StyledNames = {
    display: "flex",
    flexDirection: "column",
    mb: 2,
    span: {
        mt: 0.2,
    },
};

export const StyledGenders = {
    flexDirection: "column",
    display: "flex",
    mb: 2,
    span: {
        mt: 0.2,
    },
};

export const StyledCheckbox = styled(Checkbox)({
    "& .MuiSvgIcon-root": {
        color: MAIN_PURPLE,
    },
});