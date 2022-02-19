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
                    {data.fields.map((el) => (
                        <Box
                            key={el.id}
                            sx={{
                                fontFamily: "Proxima Nova",
                                fontWeight: 400,
                                color: "#4C494F",
                                lineHeight: "24px",
                            }}
                        >
                            {el.name}
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
                            name: data.name,
                            isSectionContainer,
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
                                name: data.name,
                                data: templateData,
                                dialogData,
                                isSectionContainer,
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
