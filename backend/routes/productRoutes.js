const express = require('express')
const router = express.Router()
const {getProducts,  getProductById, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload, adminUploadPdf, adminDeleteProductImage, adminDeleteProductPdf} = require("../controllers/productController")

const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")

router.get("/category/:categoryName/search/:searchQuery", getProducts)
router.get("/category/:categoryName", getProducts) // 第100章
/* router.get("/category/:categoryName/:subCategory", getProducts) // 第100章 新加的，不确定行不行，好像上面的categoryName可以带上subcategory
router.get("/category/:categoryName/:subCategory/:childCategoryName", getProducts)  */
router.get("/search/:searchQuery", getProducts)
router.get("/", getProducts)
router.get("/get-one/:id", getProductById)

// admin routes:
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin) 
router.get("/admin", adminGetProducts)
router.delete("/admin/:id", adminDeleteProduct)
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage)
router.delete("/admin/pdf/:pdfPath/:productId", adminDeleteProductPdf)
// router.delete("/admin/:id/stock/:stockId", adminDeleteProductAttr)
router.put("/admin/:id", adminUpdateProduct)
router.post("/admin/upload", adminUpload)
router.post("/admin/uploadpdf", adminUploadPdf)
router.post("/admin", adminCreateProduct)

module.exports = router 