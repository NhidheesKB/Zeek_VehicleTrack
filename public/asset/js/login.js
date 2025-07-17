document.addEventListener('DOMContentLoaded', function () {
  const togglePasswordBtn = document.getElementById('toggle-password')
  const passwordEye = document.getElementById('password-eye')
  const passwordInput = document.getElementById('password')
  const emailInput = document.getElementById('email')
  const emailError = document.getElementById('email-error')
  const passwordError = document.getElementById('password-error')
  const cred_error = document.getElementById('cred_error')

  togglePasswordBtn.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
    passwordInput.setAttribute('type', type)
    passwordEye.classList.toggle('fa-eye')
    passwordEye.classList.toggle('fa-eye-slash')
  })

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function validatePassword(password) {
    return password.length >= 8
  }

  emailInput.addEventListener('input', function () {
    if (this.value && !validateEmail(this.value)) {
      emailError.classList.remove('hidden')
      cred_error.classList.add('hidden')
    } else {
      emailError.classList.add('hidden')
    }
  })

  passwordInput.addEventListener('input', function () {
    if (this.value && !validatePassword(this.value)) {
      passwordError.classList.remove('hidden')
      cred_error.classList.add('hidden')
    } else {
      passwordError.classList.add('hidden')
    }
  })

  const loginForm = document.getElementById('login-form')
  loginForm.addEventListener('submit', () => {
    const email = emailInput.value.trim()
    const password = passwordInput.value

    let valid = true

    if (!validateEmail(email)) {
      emailError.classList.remove('hidden')
      valid = false
    }

    if (!validatePassword(password)) {
      passwordError.classList.remove('hidden')
      valid = false
    }
  })
})
