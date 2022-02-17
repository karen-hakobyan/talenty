import {Box, Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {TEMPLATE_ITEM_BUTTON} from "../../../shared/styles";
import {setDialogInitialState} from "../../../store/dialogs/slice";

export default function Attention({setAttentionIsOpen}) {
    const dispatch = useDispatch();
    return (
        <Box
            sx={{
                height: "290px",
                width: "580px",
                pt: "30px",
                pb: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box
                sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
            >
                <Box
                    sx={{
                        textAlign: "center",
                        color: "#5D00A6",
                        fontSize: "18px",
                        lineHeight: "22px",
                        fontWeight: 400,
                        marginBottom: "30px",
                    }}
                >
                    Attention!!!
                </Box>
                <Box sx={{width: "476px", textAlign: "center"}}>
                    You do not save your changes, if you leave this page without saving
                    it, your changes will be deleted.
                </Box>
            </Box>
            <Box sx={{display: "flex", gap: "24px", justifyContent: "center"}}>
                <Button
                    style={{textTransform: "none"}}
                    sx={{
                        ...TEMPLATE_ITEM_BUTTON,
                        color: "#5D00A6",
                        border: "1px solid #5D00A6",
                        width: "176px",
                    }}
                    onClick={() => setAttentionIsOpen(false)}
                >
                    Cancel
                </Button>
                <Button
                    style={{textTransform: "none"}}
                    sx={{
                        ...TEMPLATE_ITEM_BUTTON,
                        width: "176px",
                        color: "#FFFFFF",
                        "&:hover": {
                            background: "#8C0DF0",
                        },
                        "&.Mui-disabled": {
                            background: "#9F9F9F",
                        },
                        background: "#8C0DF0",
                    }}
                    onClick={() => dispatch(setDialogInitialState())}
                >
                    Ok
                </Button>
            </Box>
        </Box>
    );
}
