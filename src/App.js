import { Link, Route, Routes, useLocation } from "react-router-dom";

import NavBar from "./navBar/NavBar";
import HomePage from "./homePage/HomePage";
import AboutUs from "./aboutUs/AboutUs";
import ContactUs from "./contactUs/ContactUs";
import SignIn from "./account/signIn/SignIn";
import SignUp from "./account/signUp/SignUp";
import Profile from "./account/profile/Profile";
import NotFound from "./common/NotFound";
import LoadingSpinner from "./common/LoadingSpinner";
import ActionErrorPopup from "./common/ActionErrorPopup";
import Dashboard from "./dashboard/Dashboard";
import Insights from "./insights/Insights";
import Footer from "./footer/Footer";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/style.css";
import "./App.css";

import { AccountProvider } from "./contexts/AccountContext";
import { EvaluationProvider } from "./contexts/EvaluationContext";

function App() {
  // const location = useLocation(); // Use to pass state object from current location of component to the navigating page.
  // { hash: "", key: "", pathname: "", search: "", state: "" }
  return (
    <div className="App">
      <AccountProvider className="">
        <header>
          <NavBar />
        </header>
        <EvaluationProvider className="">
          <main>
            <ActionErrorPopup />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />

              {/* Route Nesting Framework. We can also create a Layout component to make it visible to every component. */}
              {/* <Route path="/nest">
          <Route path="home" element={<HomePage/>}/>
          <Route path="about" element={<AboutUs/>}/>
        </Route> */}
            </Routes>
          </main>
        </EvaluationProvider>
        <footer>
          <Footer />
        </footer>
      </AccountProvider>
    </div>
  );
}

export default App;
