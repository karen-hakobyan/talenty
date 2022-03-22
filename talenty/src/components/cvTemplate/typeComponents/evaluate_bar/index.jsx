import {IconButton, TextField, Box} from "@mui/material";
import {DeleteIconSVG} from "../../../../assets/icons/createTemplate";
import {editCheckboxState, onDelete} from "../../../../helpers/dialog";
import {
    DISABLED_INPUT,
    TEMPLATE_INPUT,
    TEMPLATE_ITEM_BUTTON,
} from "../../../../shared/styles";
import {Checkbox} from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";

export default function EveluateBar({data, isSectionContainer, dispatch, dialogData, templateData}) {


    return (
        <SubSection
            label={data.name}
            inputComponent={
                <TextField
                    placeholder={data?.name}
                    disabled
                    variant="outlined"
                    sx={{...TEMPLATE_INPUT, ...DISABLED_INPUT}}
                    InputProps={{sx: {height: "40px"}}}
                />
            }
            bottomComponent={
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "421px",
                        marginTop: "6px",
                    }}
                >
                    {data.metadata.values.map((el) => (
                        <Box
                            key={el}
                            sx={{
                                fontFamily: "Proxima Nova",
                                fontWeight: 400,
                                color: "#4C494F",
                                lineHeight: "24px",
                            }}
                        >
                            {el}
                        </Box>
                    ))}
                </Box>
            }
            checkboxComponent={
                <Checkbox
                    onChange={() => {
                        editCheckboxState({
                            dispatch,
                            dialogData,
                            id: data.id,
                        });
                    }}
                    checked={data.metadata.required}
                    disabled={!data.metadata.required_editable}
                />
            }
            buttonComponent={
                data.metadata.deletable ? (
                    <IconButton
                        sx={TEMPLATE_ITEM_BUTTON}
                        onClick={() =>
                            onDelete({
                                dispatch,
                                id: data.id,
                                dialogData,
                            })
                        }
                    >
                        <DeleteIconSVG/>
                        Delete
                    </IconButton>
                ) : null
            }
        />
    );
}
