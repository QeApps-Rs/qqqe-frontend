import { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
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
import MasterForm from "./pages/forms/MasterForm";
import Template from "./pages/template";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import Analytics from "./pages/analytics";
import Peoplepage from "./pages/Peoplepage";
import PromotionPage from "./pages/PromotionPage";
import PricePage from "./pages/PricePage";
import Productpage from "./pages/Productpage";
import VideoPlayer from "./pages/VideoPlayer";
import SuggestionCompNew from "./components/Suggestion/SuggestionCompNew";
import PreferenceSurveyTwo from "./pages/preference-survey/PreferenceSurveyTwo";
import SuggestionAnalytics from "./pages/suggestion-analytics/SuggestionAnalytics";
import CampaignsPage from "./pages/campaigns";
import CampaignsDetailsPage from "./components/Campaigns/CampaignsDetails";
import WelcomePage from "./pages/welcome";
import DetailedAnalytics from "./pages/detailed-analytics";

const env_type = import.meta.env.VITE_ENV;

const App = () => {
  const [loading, setLoading] = useState(true);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      if (env_type == "production") {
        buttonRef.current.click();
      }
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

  // eslint-disable-next-line react/prop-types
  const ProtectedRedirect = ({ element: Component }) => {
    const token = localStorage.getItem("token");
    const route = localStorage.getItem("setup-preference")
      ? "dashboard"
      : "preference-survey";
    return token ? <Navigate to={`/${route}`} /> : <Component />;
  };

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <div className="App">
        <header className="App-header">
          <div>
            <Toaster position="top-center" reverseOrder={false} />
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
              <Route
                path="/"
                element={<ProtectedRedirect element={SignIn} />}
              />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/signin"
                element={<ProtectedRedirect element={SignIn} />}
              />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPassword />}
              />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/preference-survey"
                element={<ProtectedRoute element={PreferenceSurvey} />}
              />
              <Route
                path="/preference-survey-multi"
                element={<ProtectedRoute element={PreferenceSurveyTwo} />}
              />
              <Route path="/level2" element={<SuggestionCompNew />} />
              <Route path="/welcome" element={<WelcomePage />} />
            </Route>
            <Route element={<DefaultLayout />}>
              <Route
                path="/dashboard"
                element={<ProtectedRoute element={Dashboard} />}
              />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route
                path="/suggestion/analytics/:id"
                element={<SuggestionAnalytics />}
              />
              <Route path="/people-problem" element={<Problem />} />
              <Route path="/templates" element={<Templates />} />
              <Route
                path="/suggestion/list/:id"
                element={<SuggestionCompNew />}
              />
              <Route path="/template/list/:id" element={<Template />} />
              <Route
                path="/master-form/:id"
                element={<ProtectedRoute element={MasterForm} />}
              />
              <Route path="/people-dashboard" element={<Peoplepage />} />
              <Route path="/product-dashboard" element={<Productpage />} />
              <Route path="/price-dashboard" element={<PricePage />} />
              <Route path="/promotion-dashboard" element={<PromotionPage />} />
              <Route path="/video-player" element={<VideoPlayer />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route
                path="/campaigns-details/:id"
                element={<ProtectedRoute element={CampaignsDetailsPage} />}
              />
              <Route path="/detailed-analytics" element={<DetailedAnalytics />} />
            </Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;
