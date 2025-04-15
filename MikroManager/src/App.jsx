import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardPage } from "./pages/Dashboard";
import { Whitelist, AddList } from "./pages/Whitelisting";
import { UserList, AddUser } from "./pages/Hotspot";
import { ProfileList, AddProfile } from "./pages/UserProfile";
import NewSidebar from "./components/NewSidebar";
import { NavBar } from "./components/NavBar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import AboutUsPage from "./pages/AboutUs";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Set loading to false after checking the token
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state while checking authentication
  }

  return (
    <div className="w-full bg-white overflow-hidden">
      {isAuthenticated && <NavBar />}

      <div className="flex flex-row">
        {isAuthenticated && (
          <div className="p-3">
            <NewSidebar />
          </div>
        )}
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userlist"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adduser"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddUser />
              </ProtectedRoute>
            }

          />
          <Route
            path="/profilelist"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfileList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addprofile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/whitelist"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Whitelist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addlist"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddList />
              </ProtectedRoute>
            }
          />
           <Route
            path="/aboutus"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AboutUsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
