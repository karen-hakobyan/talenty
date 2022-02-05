import { useDispatch, useSelector } from "react-redux";
import SubSection from "../../../shared/subSection";
import { selectGlobalDataViaKey } from "../../../../store/globalData/selector";
import { TEMPLATE_DATA } from "../../../../constants/redux/globalData";
import { selectDialogData } from "../../../../store/dialogs/selector";
import SUBSECTION_TYPES from "./helper.js";
import { memo } from "react";
import { Checkbox } from "../../../shared/Checkbox";
import { editCheckboxState, onDelete } from "../../../../helpers/dialog";
import { Box, IconButton } from "@mui/material";
import { TEMPLATE_ITEM_BUTTON } from "../../../../shared/styles";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";

export default function SectionGenerator({ data, isSectionContainer }) {
  const dispatch = useDispatch();
  const dialogData = useSelector(selectDialogData);
  const templateData = useSelector(selectGlobalDataViaKey(TEMPLATE_DATA));

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

            return <TempComponent data={field} key={field.id} />;
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
                name: data.name,
                isSectionContainer,
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
                name: data.name,
                data: templateData,
                dialogData,
                isSectionContainer,
              })
            }
          >
            <DeleteIconSVG />
            Delete
          </IconButton>
        ) : null
      }
    />
  );
}
