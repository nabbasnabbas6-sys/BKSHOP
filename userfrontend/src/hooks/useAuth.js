import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export function useAuth() {
  const { user, loading, error, clearError } = useAuthStore()
  return { user, loading, error, clearError }
}

export function useRequireAuth() {
  const { user, loading } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true })
    }
  }, [user, loading, navigate])

  return { user, loading }
}

export function useLogout() {
  const { signOutUser } = useAuthStore()
  const navigate = useNavigate()

  const logout = async () => {
    await signOutUser()
    navigate('/login', { replace: true })
  }

  return logout
}
