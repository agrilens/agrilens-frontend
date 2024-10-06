import "./App.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import AboutUs from "./aboutUs/AboutUs";
import ContactUs from "./contactUs/ContactUs";
import NotFound from "./common/NotFound";

function App() {
  // const location = useLocation(); // Use to pass state object from current location of component to the navigating page.
  // { hash: "", key: "", pathname: "", search: "", state: "" }
  return (
    <div className="App">
      <header className="App-header">AgriLens</header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />

        {/* Route Nesting Framework. We can also create a Layout component to make it visible to every component. */}
        {/* <Route path="/nest">
          <Route path="home" element={<HomePage/>}/>
          <Route path="about" element={<AboutUs/>}/>
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
