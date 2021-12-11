import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Close from "./SignPhoto/CloseSquare.svg";
import { Box } from "@mui/system";
import { ELECTRICVIOLET, MAGNET } from "../../constants/colors";
import "./../../fonts/index.css";
import MuiContainedBtn from "../../shared/MuiContainedBtn";

function AlertMessage({ handleClose, open }) {
  return (
    <div>
      <Dialog
        open={true}
        maxWidth="sm"
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontFamily: "Proxima Nova",
              margin: "0 25px",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              color: MAGNET,
            }}
          >
            The letter was sent to your Email
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",

            justifyContent: "center",
            mb: 3,
          }}
        >
          <MuiContainedBtn Width={"176px"} onClick={() => handleClose(false)}>
            ok
          </MuiContainedBtn>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertMessage;
