import SubSection from "../../../shared/subSection";
import SUBSECTION_TYPES from "./helper.js";
import {memo} from "react";
import {Checkbox} from "../../../shared/Checkbox";
import {deleteOtherAction, editCheckboxState, editOtherCheckbox, onDelete} from "../../../../helpers/dialog";
import {Box, IconButton} from "@mui/material";
import {TEMPLATE_ITEM_BUTTON} from "../../../../shared/styles";
import {DeleteIconSVG} from "../../../../assets/icons/createTemplate";

export default function SectionGenerator({
                                             data,
                                             isSectionContainer,
                                             dispatch,
                                             dialogData,
                                             templateData,
                                         }) {
    // photo military id driving license
    if (data.name === 'Other') {
        if (data.fields.some((el) => el.metadata.status !== 'DELETED')) {
            // above condition's purpose is for show nothing if all fields were deleted
            return <Box sx={{mt: '60px', display: 'flex', flexDirection: 'column', gap: '68px'}}>
                {data.fields.map(el => {
                    if (el.metadata.status !== 'DELETED') {
                        return <Box sx={{
                            fontFamily: 'Proxima Nova',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '24px',
                            color: '#4C494F',
                            display: 'flex',
                        }} key={el.id}>
                            <Box sx={{display: 'flex', gap: '24px'}}>
                                <Box sx={{width: '145px'}}>{el.name}</Box>
                                <Checkbox
                                    onChange={() => editOtherCheckbox({dispatch, dialogData, id: el.id})}
                                    checked={el.metadata.required}
                                    disabled={!el.metadata.required_editable}
                                />
                            </Box>
                            <Box sx={{flex: 1}}/>
                            <IconButton
                                sx={TEMPLATE_ITEM_BUTTON}
                                onClick={() => deleteOtherAction({dispatch, dialogData, id: el.id})}
                            >
                                <DeleteIconSVG/>
                                Delete
                            </IconButton>
                        </Box>
                    }
                    return null
                })}
            </Box>
        }
        return null
    }
    return (
        <SubSection
            label={data.name}
            inputComponent={
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: data.fields.length === 2 ? "10px" : "20px",
                    }}
                >
                    {data.fields.map((field) => {
                        let TempComponent = SUBSECTION_TYPES[field.metadata.type];
                        if (TempComponent) {
                            TempComponent = memo(TempComponent);
                        } else {
                            return null;
                        }

                        return (
                            <TempComponent
                                data={field}
                                key={field.id}
                                isSectionContainer
                                {...{dispatch, dialogData}}
                            />
                        );
                    })}
                </Box>
            }
            checkboxComponent={
                [2, 3].includes(data.fields.length) ? (
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
                ) : null
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
