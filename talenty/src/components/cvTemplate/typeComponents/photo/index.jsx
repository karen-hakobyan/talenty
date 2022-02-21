import {Box, IconButton} from "@mui/material";
import {DeleteIconSVG} from "../../../../assets/icons/createTemplate";
import {editCheckboxState, onDelete} from "../../../../helpers/dialog";
import {INPUT_LABEL, TEMPLATE_ITEM_BUTTON} from "../../../../shared/styles";
import {Checkbox} from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";

export default function PhotoGenerator({data, dispatch, dialogData, templateData}) {

    return (
        <SubSection
            inputComponent={
                <Box
                    sx={{
                        ...INPUT_LABEL,
                        width: "145px",
                        marginBottom: "0px",
                    }}
                >
                    {data.name}
                </Box>
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
            sx={{marginTop: "44px"}}
        />
    );
}
