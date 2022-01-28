import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SIGN_UP_ROUTE } from "../../../constants/routes";
import { setDialogIsOpen, setIsCompany } from "../../../store/dialogs/slice";

export default function SetIsCompany() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        onClick={() => {
          dispatch(setIsCompany(true));
          dispatch(setDialogIsOpen(false));
          navigate(SIGN_UP_ROUTE);
        }}
      >
        sign in as company
      </Button>
      <Button
        onClick={() => {
          dispatch(setIsCompany(false));
          dispatch(setDialogIsOpen(false));
          navigate(SIGN_UP_ROUTE);
        }}
      >
        sign in as user
      </Button>
    </Box>
  );
}
