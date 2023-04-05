/* get User require from user model */
const User = require("../models/UserModel");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      phone,
      mobile,
      location,
      company,
      role,
      city,
      state,
      postCode,
    } = req.body;
    if (
      !(
        name &&
        lastName &&
        email &&
        password &&
        phone &&
        mobile &&
        location &&
        company &&
        role &&
        city &&
        state &&
        postCode
      )
    ) {
      return res.status(400).send("All inputs are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("user exists");
    } else {
      /* 用hashedPasswrod把password加密 */
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone,
        mobile,
        location,
        company,
        role,
        city,
        state,
        postCode,
      });
      res
        /* cookie以后用户用这个访问过来 */
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          }
        )
        .status(201)
        .json({
          success: "User created",
          userCreated: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            phone: user.phone,
            mobile: user.mobile,
            location: user.mobile,
            company: user.company,
            role: user.role,
            city: user.city,
            state: user.state,
            postCode: user.postCode,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    /* find one user, if user found then, do something， else：没有found 就回复wrong credentials */
    const user = await User.findOne({ email });
    // compare passwords
    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      /* 如果dont logout被勾选了，就overwrite.  如果勾选了，就设置9天不用login。下面是计算从1ms开始 */
      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 9 }; // 1000=1ms
      }

      return res
        .cookie(
          "access_token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
            /*          user.phone,
          user.mobile,
          user.mobile, 
          user.company, 
          user.role, 
          user.city, 
          user.state, 
          user.postCode, */
          ),
          cookieParams
        )
        .json({
          success: "user logged in",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    /* 这里我们不需要用户更改邮箱地址 */
    // user.email = req.body.email || user.email;
    user.phone = req.body.phone;
    user.mobile = req.body.mobile;
    user.location = req.body.location;
    user.postCode = req.body.postCode;
    user.city = req.body.city;
    user.state = req.body.state;
    user.company = req.body.company;
    user.role = req.body.role;
    await user.save(); 

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save(); 

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};


const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("name lastName email isAdmin")
      .orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    await user.save();

    res.send("user updated");
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    await user.remove();
    res.send("user removed");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  updateUserPassword,
  getUserProfile,
  getUser,
  updateUser,
  deleteUser,
};
