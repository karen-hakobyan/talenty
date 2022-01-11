import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Checkbox,
  Container,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { CssTextField, StyledSpan } from "../Sign/signUp";
import { MAIN_PURPLE, TEXT } from "../../constants/colors";
import {
  StyledCheckbox,
  StyledGenders,
  StyledNames,
} from "../CvTemplate/CVTemplateStyle";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function PersonalInfo({ data, templateName, onDialogOpen }) {
  const [inputVal, setInputVal] = useState("");
  const [gender, setGender] = useState("Choose your gender");
  const [date, setDate] = useState(new Date());
  const genders = ["man", "woman", "other"];
  const dateTypes = ["day", "month", "year"];

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={true}
        onClose={() => onDialogOpen(null)}
      >
        <Container
          sx={{
            li: {
              span: {
                fontWeight: 600,
                fontSize: 18,
                color: TEXT,
              },
            },
          }}
        >
          <List component="nav" aria-label="templates">
            <ListItem sx={{ pl: 0, pb: 0 }} divider>
              <ListItemText primary={data.name} />
            </ListItem>
          </List>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 0,
              mt: "1%",
              width: "60%",
            }}
          >
            {console.log(data.fields)}
            {data.fields.map((field) => {
              if (field.name.includes("name")) {
                return (
                  <Box key={field.id} sx={StyledNames}>
                    <StyledSpan>{field.name}</StyledSpan>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CssTextField placeholder={field.name} size="small" />
                      <FormControlLabel
                        disabled
                        sx={{ ml: 1 }}
                        control={<Checkbox defaultChecked />}
                        label={""}
                      />
                    </Box>
                  </Box>
                );
              }
              if (field.name === "Gender") {
                return (
                  <Box key={field.id} sx={StyledGenders}>
                    <StyledSpan>{field.name}</StyledSpan>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        select
                        size="small"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: MAIN_PURPLE,
                            },
                          },
                        }}
                      >
                        {genders.map((gender) => (
                          <MenuItem key={gender} value={gender}>
                            {gender}
                          </MenuItem>
                        ))}
                      </TextField>
                      <FormControlLabel
                        control={<StyledCheckbox defaultChecked />}
                        sx={{ ml: 1 }}
                        label=""
                      />
                    </Box>
                  </Box>
                );
              }
              if (field.name.includes("Date")) {
                return (
                  <Box
                    key={field.id}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <StyledSpan>{field.name}</StyledSpan>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Box
                        sx={{
                          display: "flex",
                          "div:nth-of-type(2)": {
                            ml: 1.5,
                            mr: 1.5,
                          },
                        }}
                      >
                        {field.fields.map((dateType, index) => {
                          return (
                            <Box component="div" key={dateType.id}>
                              <DatePicker
                                views={[dateTypes[index]]}
                                label={dateType.name}
                                value={date}
                                onChange={(newValue) => {
                                  setDate(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} helperText={null} />
                                )}
                              />
                            </Box>
                          );
                        })}
                        <FormControlLabel
                          control={<StyledCheckbox defaultChecked />}
                          sx={{ ml: 1 }}
                          label=""
                        />
                      </Box>
                    </LocalizationProvider>
                  </Box>
                );
              }
              return null;
            })}
          </Box>
          <DialogActions>
            <Button
              sx={{ color: MAIN_PURPLE }}
              onClick={() => onDialogOpen(null)}
            >
              Close
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </React.Fragment>
  );
}
