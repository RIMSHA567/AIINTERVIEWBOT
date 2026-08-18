import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "./services/api.js";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import InterviewPage from "./pages/InterviewPage.jsx";

import InterviewHistory from "./pages/InterviewHistory.jsx";

import InterviewReport from "./pages/InterviewReport.jsx";

import Pricing from "./pages/Pricing.jsx";

import PaymentSuccess from "./pages/PaymentSuccess.jsx";

import PaymentFailed from "./pages/PaymentFailed.jsx";

export const serverUrl = "http://localhost:5000";

function App() {
  const dispatch = useDispatch();

  // yahan py hm store sy value read kar rahy haen use selctor sy
  //yahan hm user ka pora data milay ga (jo kay login howa tab hi milay ga )
  const userData = useSelector((state) => state.user.userData);

  //   Agar tum useEffect me getCurrentUser() call na karo:

  // User login karega → Redux me userData save ho jayega

  // Lekin jab page reload hoga → Redux state reset ho jati hai (empty ho jati hai)

  // App ko lagega user login nahi hai

  // Is liye Auth page / logout state show ho jayegi

  // Is liye getCurrentUser() use karte hain:

  // Page reload → backend ko request → cookie se token verify → user data wapas → Redux me dobara save → user logged in hi rehta hai.
  // 12*
  useEffect(() => {
    // 13* go to api.js in services
    //  25*  go to api.js in services(..........so on ike that )otal steps(1-25atrat from auh.jsx and end here)
    getCurrentUser(dispatch); // Page load par current user check
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        // agr login hy to hom epage dikhao warna auth
        element={userData ? <Home /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/auth"
        element={userData ? <Navigate to="/" replace /> : <Auth />}
      />
      <Route
        path="/interview"
        // agr login hy to interviewpage dikhao warna auth
        element={userData ? <InterviewPage /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/history"
        // agr login hy to interviewpage dikhao warna auth
        element={
          userData ? <InterviewHistory /> : <Navigate to="/auth" replace />
        }
      />
      <Route
        path="/pricing"
        // agr login hy to interviewpage dikhao warna auth
        element={userData ? <Pricing /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/report/:id"
        // agr login hy to interviewpage dikhao warna auth
        element={
          userData ? <InterviewReport /> : <Navigate to="/auth" replace />
        }
      />
      <Route
        path="/payment-success"
        element={
          userData ? <PaymentSuccess /> : <Navigate to="/auth" replace />
        }
      />
      <Route
        path="/payment-failed"
        element={userData ? <PaymentFailed /> : <Navigate to="/auth" replace />}
      />
    </Routes>
  );
}

export default App;
