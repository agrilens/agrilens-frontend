import { Link, Route, Routes, useLocation } from "react-router-dom";

// import NavBar from "./navBar/NavBar";
import HomePage from "./homePage/HomePage";
import AboutUs from "./aboutUs/AboutUs";
import ContactUs from "./contactUs/ContactUs";
import LogIn from "./account/logIn/LogIn";
import LogOut from "./account/logOut/LogOut";
import SignUp from "./account/signUp/SignUp";
import NotFound from "./common/NotFound";
import Profile from "./profile/Profile";

import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/css/bootstrap.min.css"; // Recommended in production for optimized page loading.
import "./assets/styles/style.css";
import "./App.css";

import { AccountProvider } from "./contexts/AccountContext";

function App() {
  // const location = useLocation(); // Use to pass state object from current location of component to the navigating page.
  // { hash: "", key: "", pathname: "", search: "", state: "" }
  return (
    <div className="App">
      <AccountProvider>
        {/* <NavBar /> */}
        <SignUp />
        <br />
        <br />
        <LogIn />
        <br />
        <br />
        <br />
        <br />
        <LogOut />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />

          {/* Route Nesting Framework. We can also create a Layout component to make it visible to every component. */}
          {/* <Route path="/nest">
          <Route path="home" element={<HomePage/>}/>
          <Route path="about" element={<AboutUs/>}/>
        </Route> */}
        </Routes>
      </AccountProvider>
    </div>
  );
}

export default App;
