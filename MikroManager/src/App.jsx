import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import { DashboardPage } from "./pages/DashboardPage"
import { useEffect, useState } from "react"
import { AddUser, UserList } from '../src/pages/HotspotPage';
import NewSidebar from "./components/NewSidebar";
import ProfileList from "./pages/User Profile Pages/ProfileList";
import AddProfile from "./pages/User Profile Pages/AddProfile";
import Whitelist from "./pages/Website Pages/Whitelist";
import Addlist from "./pages/Website Pages/Addlist";
import { NavBar } from "./components/NavBar";
const App = () => {


  // const token = localStorage.getItem('token');
  // if (!token || undefined) {
  //   return <LoginPage />
  // }


  return (
    <div className="wrapper">
      <NavBar />
      <div className="flex flex-row">
        <NewSidebar />
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/profilelist" element={<ProfileList />} />
          <Route path="/addprofile" element={<AddProfile />} />
          <Route path="/whitelist" element={<Whitelist />} />
          <Route path="/addlist" element={<Addlist />} />
        </Routes>
      </div>

    </div>

  )
}

export default App