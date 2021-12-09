import SignUp from "./components/Sign/SignUp.jsx";
import companyImg from "./components/Assets/SignImages/company.webp";
import userImg from "./components/Assets/SignImages/user.webp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route
        path="sign-up-company"
        element={<SignUp isCompany={true} img={companyImg} />}
      />
      <Route
        path="sign-up-user"
        element={<SignUp isCompany={false} img={userImg} />}
      />
    </Routes>
  );

  // return <SignUp isCompany={true} img={userImg} />;
}

export default App;
