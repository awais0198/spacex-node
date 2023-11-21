const db = require('../../models/index')

exports.registerMemberUser = async ({ username, password }) =>
  db.User.create({ username, password })
    .then((res) => res.dataValues)
    .catch((err) => {
      throw new Error(err)
    })

exports.findByEmail = ({ username }) =>
  db.User.findOne({
    where: { username },
    raw: true,
    ..._prop.hideFieldsCondition('token'),
  })

exports.findById = ({ username }) => db.User.findByPk(username, _prop.hideFieldsCondition())

exports.findByUserIdAndToken = ({ username, token }) =>
  db.User.findOne({
    where: { username, token },
    ..._prop.hideFieldsCondition('password'),
  })

exports.updateUserToken = ({ username, token }) =>
  db.User.update({ token }, { where: { username } })

exports.verifyUser = ({ username }) => db.User.update({ isVerified: true }, { where: { username } })

const _prop = {
  HIDDEN_FIELDS: ['createdAt', 'updatedAt'],

  hideFieldsCondition: function (...args) {
    return { attributes: { exclude: [...this.HIDDEN_FIELDS, ...args] } }
  },
}
