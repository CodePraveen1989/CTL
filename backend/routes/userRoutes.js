const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const {getUsers, registerUser, loginUser, verifyEmail, updateUserProfile, updateUserPassword, getUserProfile, getUser, updateUser, deleteUser} = require("../controllers/userController")

router.post("/register", registerUser)
router.post("/login", loginUser)

router.get('/:id/verify/:token/', verifyEmail)

// user logged in routes:
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile);
router.put("/password", updateUserPassword);
router.get('/profile/:id', getUserProfile)
/* router.post('/review/:productId', writeReview) */
// 既然writeReview删除了，那么const里的，以及controller里面的都要删掉

// admin routes:
router.use(verifyIsAdmin);
router.get("/", getUsers)
router.get("/:id", getUser);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
