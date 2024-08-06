const User = require("../../Models/admin");
const bcrypt = require("bcrypt");
exports.signup = async (req, res) => {
  try {
    console.log(65, req.body);
    const find = await User.findOne({ email: req.body.email });
    if (find) {
      return res.status(400).json({
        error: "User already registered",
      });
    }
    const { firstName, lastName, email, phone, password, role } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
    });
    _user
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).json({ data });
      })
      .catch((error) => {
        console.log("error", error);
        res.status(400).json({ error: error.message });
      });
  } catch (err) {
    console.log("err", err);

    res.status(500).json({ err: err });
  }
};

exports.signin = async (req, res) => {
  try {
    let { email, password } = req.body;
    User.findOne({ email }).then(async (user) => {
      console.log(55, user);
      if (user) {
        const isPassword = await user.matchPassword(password);
        if (isPassword) {
          const token = await user.generateToken();
          const { _id, firstName, lastName, userName, email, phone, role } =
            user;
          res.cookie("token", token, { expiresIn: "1d" });
          res.status(200).json({
            token,
            user: {
              _id,
              firstName,
              lastName,
              userName,
              email,
              phone,
              role,
            },
          });
        } else {
          return res.status(400).json({ message: "Invalid Password" });
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

exports.getUser = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Filter users with the role 'user'
    // const filteredUsers = users.filter();

    // Respond with the filtered users
    res.status(200).json({
      success: true,
      message: "data fetched succefully",
      data: users,
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error fetching users:", err);

    // Respond with an error message and status code
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch users",
      error: err.message,
    });
  }
};

// Get one user by ID
exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "data fetched succefully",
      data: user,
    });
  } catch (error) {
    console.error("Error in getOne:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    console.log(email, oldPassword, newPassword);

    // Validate input
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({
        statusCode: 400,
        message: "Please provide email, old password, and new password",
        success: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
        success: false,
      });
    }

    // Check if old password is correct
    const isMatch = bcrypt.compareSync(oldPassword, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({
        statusCode: 401,
        message: "Incorrect old password",
        success: false,
      });
    }

    // Update password with new password
    user.hashedPassword = bcrypt.hashSync(newPassword, 10);
    await user.save();

    res.status(200).json({
      statusCode: 200,
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      statusCode: 500,
      message: `Internal Server Error: ${error.message}`,
      success: false,
    });
  }
};
