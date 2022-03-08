import {memo} from "react";
import {Box} from "@mui/material";
import typeComponents from "..";

export default function SectionContainer({
                                             data,
                                             dialogData,
                                             templateData,
                                             dispatch,
                                         }) {
    if (!data) {
        return null;
    }
    return (
        <Box sx={{display: "grid", gridTemplateColumns: "auto", gap: "24px"}}>
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
                        {...{dialogData, templateData, dispatch}}
                    />
                );
            })}
        </Box>
    );
}
