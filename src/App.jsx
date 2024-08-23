import { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ContactUs from "./ContactUs";
import About from "./About";
import "./App.css";
// import "./form.css";
import "flatpickr/dist/flatpickr.min.css";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import SignIn from "./SignIn";
import PreferenceSurvey from "./pages/preference-survey/PreferenceSurvey";
import SignUp from "./pages/auth/SignUp";
import SettingsPage from "./pages/settings";
import Loader from "./common/Loader";
import Dashboard from "./pages/dashboard";
import Templates from "./pages/templates";
import Problem from "./pages/Problem";
import Suggestion from "./pages/suggestion";
import MasterForm from "./pages/forms/MasterForm";
import Template from "./pages/template";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./pages/auth/ResetPassword";

const App = () => {
  const [loading, setLoading] = useState(true);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      // buttonRef.current.click();
    }
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    console.log("Button was clicked!");
  };

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <div className="App">
        <header className="App-header">
          <div>
            <Toaster position="bottom-center" reverseOrder={false} />
          </div>
          <nav>
            <ul>
              <li>
                <Link
                  style={{ display: "none" }}
                  ref={buttonRef}
                  onClick={handleClick}
                  to="/"
                >
                  QQQE
                </Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<SignIn />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/preference-survey" element={<PreferenceSurvey />} />
            </Route>
            <Route element={<DefaultLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/people-problem" element={<Problem />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/suggestion/list/:id" element={<Suggestion />} />
              <Route path="/template/list/:id" element={<Template />} />
              <Route path="/master-form" element={<MasterForm />} />
            </Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;
