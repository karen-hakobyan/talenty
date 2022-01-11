import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { memo } from "react";

function AlertDialog({ info, setOpen }) {
  const handleClose = () => setOpen(null);

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Problem has accured!!!`}
        </DialogTitle>
        <DialogContent>
          {typeof info !== "object" ? (
            <DialogContentText id="alert-dialog-description">
              {info}
            </DialogContentText>
          ) : (
            <>
              <DialogContentText id="alert-dialog-description">
                {info.part1}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                {info.part2}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default memo(AlertDialog);
