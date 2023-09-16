const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const hadleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = userDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {

    // create JWT
    res.json({ success: `User ${user} is logged in` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { hadleLogin };
