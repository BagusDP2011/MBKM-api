const authService = require("../services/auth.service");

async function register(req, res, next) {
  try {
    const response = await authService.register(req.body);
    res.json(response);
  } catch (err) {
    console.error(`Error while register`, err.message);
    res.status(400).json({ message: err.message });
    // next(err);
  }
}

async function login(req, res, next) {
  try {
    res.json(await authService.login(req.body));
  } catch (err) {
    next(err);
  }
}
async function deleteUser(req, res) {
  try {
    await userRepo.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
    register,
    login,
    deleteUser,
}