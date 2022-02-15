import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE_ROUTE } from "../../constants/routes";
import { LOGO } from "../landingPage/style";
import { SUB_ROUTES_GENERATOR } from "./helper";
import { CONTAINER_HEADER } from "./style";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  return (
    <Box sx={CONTAINER_HEADER}>
      <Box sx={LOGO}>Talenty.</Box>
      <Box
        sx={{
          display: "flex",
          ml: "87px",
          gap: "44px",
        }}
      >
        {SUB_ROUTES_GENERATOR.map((el) => {
          return (
            <Box
              key={el.key}
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`${HOME_PAGE_ROUTE}${el.path}`);
              }}
            >
              {el.name}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
