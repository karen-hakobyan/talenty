import {Box, Button} from "@mui/material";
import {editCheckboxState} from "../../../../helpers/dialog";
import {DISABLED_INPUT} from "../../../../shared/styles";
import {Checkbox} from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";

export default function LanguageLevelGenerator({
                                                   data,
                                                   isSectionContainer,
                                                   dispatch,
                                                   dialogData,
                                               }) {
    return (
        <SubSection
            label={data.name}
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
            inputComponent={
                <Box sx={{display: "flex", gap: "10px"}}>
                    {data.metadata.values.map((el) => {
                        return (
                            <Button
                                key={el}
                                sx={{width: "133px", ...DISABLED_INPUT, height: "40px"}}
                                style={{textTransform: "none"}}
                                disabled
                            >
                                {el}
                            </Button>
                        );
                    })}
                </Box>
            }
        />
    );
}
