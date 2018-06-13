const User = require('../../../server/proxy/user')

exports.createUser = function(userData) {
  return User.createUser(userData)
}
