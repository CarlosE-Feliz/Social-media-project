import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./helper/AuthProvider";
import { Login } from "./components/auth/Login";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import NavBar from "./components/Nav bar/NavBar";
import PostSection from "./components/post/PostSection";
//import CardPost from "./components/Card/CardPost";
import { SignIn } from "./components/auth/SignIn";
import FeedComp from "./components/feed/FeedComp";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/accounts/emailsignup" element={<SignIn />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="h-full">
                  <NavBar />
                  <div>
                    <PostSection />
                  </div>
                  <FeedComp />
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
