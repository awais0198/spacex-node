const express = require('express')
const router = express.Router()

const { validation } = require('../../middlewares/validation')
const { registerMemberUserSchema, loginSchema } = require('../../validations/user')
const userController = require('../../controllers/user')

router.post('/register', validation(registerMemberUserSchema), userController.registerMemberUser)
router.post('/login', validation(loginSchema), userController.login)

module.exports = router
