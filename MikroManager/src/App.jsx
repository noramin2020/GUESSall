import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Login from "./pages/Login"
import { DashboardPage } from "./pages/Dashboard"
import { useEffect, useState } from "react"
import { Whitelist, AddList } from "./pages/Whitelisting"
import { UserList, AddUser } from "./pages/Hotspot"
import NewSidebar from "./components/NewSidebar";
import { ProfileList, AddProfile } from "./pages/UserProfile"
import { NavBar } from "./components/NavBar";
const App = () => {


  // const token = localStorage.getItem('token');
  // if (!token || undefined) {
  //   return <Login />
  // }


  return (
    <div className="w-full">
      <NavBar />
      <div className="flex flex-row">
        <div className="p-3">
          <NewSidebar />
        </div>
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/profilelist" element={<ProfileList />} />
          <Route path="/addprofile" element={<AddProfile />} />
          <Route path="/whitelist" element={<Whitelist />} />
          <Route path="/addlist" element={<AddList />} />
        </Routes>
      </div>

    </div>

  )
}

export default App