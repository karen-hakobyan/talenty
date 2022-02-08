import { Box } from "@mui/material";
import { INPUT_LABEL } from "../../../shared/styles";
import { MAIN_CONTAINER, SUB_CONTAINER } from "./style";

const SubSection = ({
  label,
  inputComponent,
  checkboxComponent,
  bottomComponent,
  buttonComponent,
  sx,
}) => {
  return (
    <Box sx={sx}>
      {label && <Box sx={INPUT_LABEL}>{label}</Box>}
      <Box sx={MAIN_CONTAINER}>
        <Box>
          <Box sx={SUB_CONTAINER}>
            <Box>{inputComponent}</Box>
            {checkboxComponent}
          </Box>
          {bottomComponent}
        </Box>
        {buttonComponent}
      </Box>
    </Box>
  );
};

export default SubSection;
