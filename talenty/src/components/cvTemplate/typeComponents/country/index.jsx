import {IconButton} from "@mui/material";
import {DeleteIconSVG} from "../../../../assets/icons/createTemplate";
import {editCheckboxState, onDelete} from "../../../../helpers/dialog";
import {TEMPLATE_ITEM_BUTTON} from "../../../../shared/styles";
import {Checkbox} from "../../../shared/Checkbox";
import Select from "../../../shared/Select";
import SubSection from "../../../shared/subSection";

export default function CountryGenerator({data, dispatch, dialogData, templateData}) {
    return (
        <SubSection
            label={data.name}
            buttonComponent={
                data.metadata.deletable ? (
                    <IconButton
                        sx={TEMPLATE_ITEM_BUTTON}
                        onClick={
                            () => {
                                onDelete({
                                    dispatch,
                                    id: data.id,
                                    dialogData,
                                })
                            }
                        }
                    >
                        <DeleteIconSVG/>
                        Delete
                    </IconButton>
                ) : null
            }
            checkboxComponent={
                <Checkbox
                    onChange={() => {
                        editCheckboxState({dispatch, dialogData, id: data.id});
                    }}
                    checked={data.metadata.required}
                    disabled={!data.metadata.required_editable}
                />
            }
            inputComponent={<Select placeHolder={data.metadata.placeholder} disabled/>}
        />
    );
}
