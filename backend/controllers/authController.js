exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    // Dummy logic
    res.json({ message: `Logged in with ${email}` });
  };
  