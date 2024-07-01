import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import { DashboardPage } from "./pages/DashboardPage"
import { useEffect } from "react"

const App = () => {

  useEffect(() => {
    const sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
      sessionStorage.setItem(
        "session_id",
        Date.now().toString().padStart(20, 0)
      )
    }
  })

  return (  
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
    </Routes>

  )
}

export default App