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
import AuthButton from "../../shared/AuthButton";
import "./../../fonts/index.css";

function AlertMessage({ handleClose, open }) {
  return (
    <div>
      <Dialog
        open={true}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              width: "18.5px",
              height: "18.5",
              cursor: "pointer",
              "&:hover": {
                color: ELECTRICVIOLET,
              },
            }}
            onClick={() => handleClose(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3955 7.5949L7.60349 12.3869"
                stroke="#4C494F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.397 12.3898L7.60098 7.59281"
                stroke="#4C494F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.3345 0.7502H5.66549C2.64449 0.7502 0.750488 2.8892 0.750488 5.9162V14.0842C0.750488 17.1112 2.63549 19.2502 5.66549 19.2502H14.3335C17.3645 19.2502 19.2505 17.1112 19.2505 14.0842V5.9162C19.2505 2.8892 17.3645 0.7502 14.3345 0.7502Z"
                stroke="#4C494F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {/* <img src={Close} /> */}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontFamily: "Proxima Nova",
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
          <AuthButton width={176} text="Ok" />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertMessage;
