import React, {memo} from "react";
import {Box, IconButton} from "@mui/material";
import typeComponents from "..";
import SubSection from "../../../shared/subSection";
import {TEMPLATE_ITEM_BUTTON} from "../../../../shared/styles";
import {onDelete} from "../../../../helpers/dialog";
import {DeleteIconSVG} from "../../../../assets/icons/createTemplate";

export default function SectionContainer({
                                             data,
                                             dialogData,
                                             templateData,
                                             dispatch,
                                             isPublication,
                                         }) {
    if (!data) {
        return null;
    }
    const inputComponent = <Box sx={{display: "grid", gridTemplateColumns: "auto", gap: "24px", width: '100%'}}>
        {data.fields.map((field) => {
            if (field.metadata.status === "DELETED") {
                return null;
            }
            let TempComponent = typeComponents[field.metadata.type];
            if (!TempComponent) {
                return <h1>they changed some type</h1>;
            }
            TempComponent = memo(TempComponent);
            return (
                <TempComponent
                    data={field}
                    key={field.name}
                    isSectionContainer
                    {...{dialogData, templateData, dispatch, sectionId: field.id}}
                />
            );
        })}
    </Box>
    return (
        data.metadata.deletable ? <SubSection
            inputComponent={inputComponent}
            buttonComponent={
                (
                    <IconButton
                        sx={TEMPLATE_ITEM_BUTTON}
                        onClick={() =>
                            onDelete({
                                dispatch,
                                dialogData,
                                id: data.id,
                                isPublication: isPublication,
                            })
                        }
                    >
                        <DeleteIconSVG/>
                        Delete
                    </IconButton>
                )
            }
        /> : inputComponent
    );
}
