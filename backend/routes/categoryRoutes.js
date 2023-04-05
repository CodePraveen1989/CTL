const express = require('express')
const router = express.Router()
const {getCategories, newCategory, deleteCategory, saveAttr} = require("../controllers/categoryController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")


router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.get("/", getCategories)
router.post("/", newCategory)
router.delete("/:category", deleteCategory) //有：是说this is dynamic part of the address
router.post("/attr", saveAttr) //没有：是说this is NOT dynamic part of the address

module.exports = router

