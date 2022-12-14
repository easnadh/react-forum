const {getUserIdByToken} = require("../db/tokens");
const {AuthError} = require("../errors");
module.exports = {
  checkAuth: async (token) => {
    const userId = await getUserIdByToken(token);
    if (!userId) {
      throw new AuthError("пользователь не авторизован");
    }
    return userId;
  }
}