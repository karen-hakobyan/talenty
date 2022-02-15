import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LANDING_PAGE_ROUTE } from "../../constants/routes";

export default function RoleNotFoundRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(LANDING_PAGE_ROUTE);
  });
  return null;
}
