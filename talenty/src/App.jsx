import SignUp from "./components/Sign/SignUp.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="sign-up-company" element={<SignUp isCompany={true} />} />
      <Route path="sign-up-user" element={<SignUp isCompany={false} />} />
    </Routes>
  );

  // return <SignUp isCompany={true} img={userImg} />;
}

export default App;
