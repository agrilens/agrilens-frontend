import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import AboutUs from "./aboutUs/AboutUs";
import ContactUs from "./contactUs/ContactUs";
import NotFound from "./common/NotFound";

function App() {
  return (
    <div className="App">
      <header className="App-header">AgriLens</header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
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
