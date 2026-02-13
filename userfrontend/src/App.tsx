import { useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import useAuthStore from './store/authStore.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'

function App() {
  const { initAuth } = useAuthStore()

  useEffect(() => {
    const unsubscribe = initAuth()
    return () => unsubscribe()
  }, [])

  return (
    <HashRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
