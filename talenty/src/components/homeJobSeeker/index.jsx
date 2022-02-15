import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";

export default function HomeJobSeeker() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="jobs" element={<h1>Jobs</h1>} />
        <Route path="search" element={<h1>Search</h1>} />
      </Routes>
    </Box>
  );
}
