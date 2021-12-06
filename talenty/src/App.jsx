import SignUpCompany from "./components/Sign/SignUpCompany";
import Gagarin from "./components/Assets/SignInImages/gagarin.png";
import SignIn from "./components/Sign/SignIn";
import ForgotPassword from "./components/Sign/ForgotPassword";

function App() {
  // return <SignIn></SignIn>;
  return <SignUpCompany bgImg={Gagarin} />;
}

export default App;
