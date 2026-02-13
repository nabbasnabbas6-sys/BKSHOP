export const validateEmail = (email) => {
  if (typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export const validatePassword = (password) => {
  // Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre
  if (typeof password !== 'string') return false
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
}

export const validateDisplayName = (name) => {
  if (typeof name !== 'string') return false
  const trimmed = name.trim()
  return trimmed.length >= 2 && trimmed.length <= 50
}

export const getPasswordStrength = (password) => {
  if (typeof password !== 'string' || !password) return 'weak'
  
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++
  
  if (strength <= 1) return 'weak'
  if (strength <= 2) return 'fair'
  if (strength <= 3) return 'good'
  if (strength <= 4) return 'strong'
  return 'very-strong'
}

export const validateForm = (formData, isSignUp = false) => {
  const errors = {}
  
  if (isSignUp && !validateDisplayName(formData.displayName)) {
    errors.displayName = 'Le nom doit contenir entre 2 et 50 caractères'
  }
  
  if (!validateEmail(formData.email)) {
    errors.email = 'Email invalide'
  }
  
  if (!validatePassword(formData.password)) {
    errors.password = 'Le mot de passe doit contenir au moins 8 caractères avec des majuscules, minuscules et chiffres'
  }
  
  if (isSignUp && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas'
  }
  
  return errors
}
