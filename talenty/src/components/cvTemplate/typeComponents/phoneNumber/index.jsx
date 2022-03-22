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

export default function PhoneGenerator({data, dispatch, dialogData, templateData}) {


    return (
        <SubSection
            label="Phone number"
            inputComponent={
                <TextField
                    disabled
                    placeholder={data.metadata.placeholder}
                    sx={{...TEMPLATE_INPUT, ...DISABLED_INPUT}}
                    InputProps={{sx: {height: "40px"}}}
                />
            }
            checkboxComponent={
                <Checkbox
                    onChange={() => {
                        editCheckboxState({dispatch, dialogData, name: data.name});
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
                                item: data,
                                data: templateData,
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
