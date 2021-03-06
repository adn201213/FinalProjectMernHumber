import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      //  username: user.username,

      name: user.name,
      email: user.email,
      //  firstName: user.firstName,
      //  lastName: user.lastName,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc     Register a new user
//@route    POST /api/users
//@access   public

const registerUser = asyncHandler(async (req, res) => {
  const {
    //  username,
    name,
    email,
    password,
    // repassword,
    //  firstName,
    // lastName,
    // address,
  } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already existed");
  }

  const user = await User.create({
    //  username,
    name,
    email,
    password,
    //   repassword,
    //   firstName,
    //   lastName,
    //  address,
  });
  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      //   username: user.username,
      name: user.name,
      email: user.email,
      password: user.password,
      //   repassword: user.repassword,
      //   firstName: user.firstName,
      //  lastName: user.lastName,
      //    address: user.address,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Protected route for fetching single user
//@route    GET /api/users/profile
//@access   private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      //  username: user.username,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Protected route for updating single user
//@route    PUT /api/users/profile
//@access   private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Protected route for fetching all users
//@route    GET /api/users
//@access   private/admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc     Protected route for deleting a user
//@route    DELETE /api/users/:id
//@access   private/admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.remove();
    res.json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Protected route for fetching a user
//@route    GET /api/users/:id
//@access   private/admin

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Protected route for updating single user
//@route    PUT /api/users/:id
//@access   private/admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUser,
  updateUser,
};
