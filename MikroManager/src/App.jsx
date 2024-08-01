import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardPage } from "./pages/Dashboard";
import { Whitelist, AddList } from "./pages/Whitelisting";
import { UserList, AddUser } from "./pages/Hotspot";
import { ProfileList, AddProfile } from "./pages/UserProfile";
import NewSidebar from "./components/NewSidebar";
import { NavBar } from "./components/NavBar";
import Login from "./pages/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
          <Route path="/login" element={isAuthenticated ? <></> : <Login />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/userlist"
            element={isAuthenticated ? <UserList /> : <Navigate to="/login" />}
          />
          <Route
            path="/adduser"
            element={isAuthenticated ? <AddUser /> : <Navigate to="/login" />}
          />
          <Route
            path="/profilelist"
            element={isAuthenticated ? <ProfileList /> : <Navigate to="/login" />}
          />
          <Route
            path="/addprofile"
            element={isAuthenticated ? <AddProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/whitelist"
            element={isAuthenticated ? <Whitelist /> : <Navigate to="/login" />}
          />
          <Route
            path="/addlist"
            element={isAuthenticated ? <AddList /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/login" : "/dashboard"} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
