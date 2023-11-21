const yup = require('yup')

exports.registerMemberUserSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup
    .string()
    .required()
    .test(
      'password',
      'Password must contain at least one uppercase letter, one lowercase letter, and one special character',
      (value) => {
        const hasUppercase = /[A-Z]/.test(value)
        const hasLowercase = /[a-z]/.test(value)
        const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)

        return hasUppercase && hasLowercase && hasSpecialCharacter
      }
    ),
})

exports.loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})
