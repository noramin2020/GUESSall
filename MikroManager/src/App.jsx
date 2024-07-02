import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import { DashboardPage } from "./pages/DashboardPage"
import { useEffect, useState } from "react"
import { AddUser, UserList } from '../src/pages/HotspotPage';
const App = () => {


  const token = localStorage.getItem('token');
  if (!token || undefined) {
    return <LoginPage />
  }


  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user/list" element={<UserList />} />
        <Route path="/user/add" element={<AddUser />} />
      </Routes>
    </div>

  )
}

export default App