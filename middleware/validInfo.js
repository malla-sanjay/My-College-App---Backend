module.exports = function (req, res, next) {
  const { college, email, name, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (![college, email, name, password].every(Boolean)) {
      return res
        .status(401)
        .json({ error: true, message: " auth Missing Credentials" });
    } else if (!validEmail(email)) {
      return res.status(401).json({ error: true, message: "Invalid Email" });
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res
        .status(401)
        .json({ error: true, message: "Missing Credentials" });
    } else if (!validEmail(email)) {
      return res.status(401).json({ error: true, message: "Invalid Email" });
    }
  }

  next();
};
