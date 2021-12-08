import SignUp from "./components/Sign/SignUp.jsx";
import companyImg from "./components/Assets/SignImages/company.webp";
import userImg from "./components/Assets/SignImages/user.webp";

function App() {
  return <SignUp isCompany={true} img={userImg} />;
}

export default App;
