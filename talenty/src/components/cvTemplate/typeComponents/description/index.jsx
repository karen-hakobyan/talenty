import {IconButton, TextField} from "@mui/material";
import {DeleteIconSVG} from "../../../../assets/icons/createTemplate";
import {editCheckboxState, onDelete} from "../../../../helpers/dialog";
import {
    DISABLED_INPUT,
    TEMPLATE_INPUT,
    TEMPLATE_ITEM_BUTTON,
} from "../../../../shared/styles";

import {Checkbox} from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";

export function DescriptionGenerator({data, isSectionContainer, dispatch, dialogData, templateData}) {

    return (
        <SubSection
            label={data.name}
            inputComponent={
                <TextField
                    placeholder={data?.metadata.placeholder}
                    disabled
                    variant="outlined"
                    multiline
                    rows={4}
                    InputProps={{sx: {
                        height: "40px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize:16,
                }}}
                    sx={{...TEMPLATE_INPUT, ...DISABLED_INPUT}}
                />
            }
            checkboxComponent={
                <Checkbox
                    onChange={() => {
                        editCheckboxState({
                            dispatch,
                            dialogData,
                            id: data.id
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
                                dialogData,
                                id: data.id,
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
