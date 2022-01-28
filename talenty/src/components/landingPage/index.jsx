import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LANDING_ROUTES, PARAGRAPH_TEXT } from "./helper";
import {
  ACTIONS,
  BORDER_BOTTOM,
  BORDER_RIGHT,
  DEVIDER,
  FIRST_HEADER,
  IMAGE,
  IMAGE_TEXT_CONTAINER,
  LOGO,
  LOGO_NAV_CONTAINER,
  MAIN_CONTAINER_NAV,
  NAV_CONTAINER,
  NAV_ITEM,
  PARAGRAPH,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  SECOND_HEADER,
} from "./style";
import LandingImage from "../../assets/landing/landing.png";
import { SIGN_IN_ROUTE } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { setDialogIsOpen, setDialogType } from "../../store/dialogs/slice";

export default function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box>
      <Box sx={MAIN_CONTAINER_NAV}>
        <Box sx={LOGO_NAV_CONTAINER}>
          <Box sx={LOGO}>Talenty.</Box>
          <Box sx={NAV_CONTAINER}>
            {LANDING_ROUTES.map((el) => {
              return (
                <Box
                  onClick={() => {
                    navigate(el.route);
                  }}
                  key={el.name}
                  sx={NAV_ITEM}
                >
                  {el.name}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box sx={ACTIONS}>
          <Button
            style={{ textTransform: "none" }}
            sx={SECONDARY_BUTTON}
            onClick={() => {
              navigate(SIGN_IN_ROUTE);
            }}
          >
            Sign in
          </Button>
          <Button
            style={{ textTransform: "none" }}
            sx={PRIMARY_BUTTON}
            onClick={() => {
              dispatch(setDialogIsOpen(true));
              dispatch(setDialogType("setIsCompany"));
            }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
      {/* below image and texts */}
      <Box sx={IMAGE_TEXT_CONTAINER}>
        <Box>
          <Box sx={FIRST_HEADER}>Smart HR platform to</Box>
          <Box sx={SECOND_HEADER}>FASTER HIRING</Box>
          <Box sx={PARAGRAPH}>{PARAGRAPH_TEXT}</Box>
          <Button sx={{ ...PRIMARY_BUTTON, width: "292px", mt: "44px" }}>
            Start Free Trial
          </Button>
        </Box>
        <Box>
          <Box sx={{ display: "flex" }}>
            <img src={LandingImage} alt="" style={IMAGE} />
            <Box sx={BORDER_RIGHT} />
          </Box>
          <Box sx={BORDER_BOTTOM} />
        </Box>
      </Box>
      <Box sx={DEVIDER} />
    </Box>
  );
}
