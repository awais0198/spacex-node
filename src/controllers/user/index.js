const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Exceptions = require('../../utils/custom-exceptions')
const userService = require('../../services/user')
const { promise } = require('../../middlewares/promise')

exports.registerMemberUser = promise(async (req, res) => {
  const { username, password } = req.body

  const isUserExists = await userService.findByEmail({ username })

  if (isUserExists)
    throw new Exceptions.BadRequest({
      message: 'Username already exists',
    })

  const hashPassword = bcrypt.hashSync(password, 10)

  await userService.registerMemberUser({
    username,
    password: hashPassword,
  })

  const user = await userService.findByEmail({ username })

  const token = jwt.sign(
    {
      username: user.username,
    },
    process.env.JWT_SECRET
  )

  await userService.updateUserToken({ userId: user.username, token })

  res.status(200).json({
    message: 'Account created Successfully!',
    user,
  })
})

exports.login = promise(async (req, res) => {
  const { username, password } = req.body

  const user = await userService.findByEmail({ username })

  if (!user)
    throw new Exceptions.BadRequest({
      message: 'Your credentials not matched',
    })

  const isValid = bcrypt.compareSync(password, user.password)

  if (!isValid)
    throw new Exceptions.AccessDenies({
      message: 'Invalid credentials',
    })

  const token = jwt.sign(
    {
      username: user.username,
    },
    process.env.JWT_SECRET
  )

  delete user.password

  res.status(200).json({
    token,
    user,
  })
})
