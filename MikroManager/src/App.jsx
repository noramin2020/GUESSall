import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import { DashboardPage } from "./pages/DashboardPage"
import { useEffect, useState } from "react"

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
      </Routes>
    </div>

  )
}

export default App