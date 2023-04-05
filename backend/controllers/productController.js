const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const pdfValidate = require("../utils/pdfValidate");

const getProducts = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;
    let priceQueryCondition = {};
    // 如果query price存在，就pass小于等于XXX
    if (req.query.price) {
      queryCondition = true;
      // Mongodb比较查询： $lt < ； $lte <= ; $gt > ; $gte >=
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }

    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      // $in 范围内 $nin $ne != not equal
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    // 好像这个里面的所有 categoryQueryCondition 都是给 123级路由用的，现在我们用的是 query string，所以也许用不到了？
    let categoryQueryCondition = {};
    // 这个categoryName就是从productRoutes里面抄来的, 因为我们在 二级路由里面写的是 categoryName 所以这里params里面解析的就是 categoryName
    const categoryName = req.params.categoryName || "";
    //100章，从all下拉栏选择categories并search， 因为 下拉里面的格式是： PPE/XXXX 所以可以这么用， 然后可以用到所有的 PPE/XXX/XXX
    // 如果categoryName 是 true，则queryCondition 就 true （好像这里的categoryName可以带上subcategory）
    if (categoryName) {
      queryCondition = true;
      // 用, 去replace所有的/
      let a = categoryName.replaceAll(",", "/");
      // for searching，需要 regular expression(正则表达式)，可以从^PPE/XXX开始search 就比较快了
      // 新搞得一个subcategories用的，设置正则表达为null，然后再写入值
      var regEx = null;
      // 我们这里的 subCategoryName 是在frontend Productlistpagecomponent里面新设置的subcategories的变量，因为是存到了query里面，所以consolelog queryd的话，可以看到
      // 其实这里的 subCategoryName 和 childCategoryName 是从 route里面解析的，存在了params里的， 所以可以 req.query.XXX 来读取，并赋值
      var subCategoryName = req.query.subCategoryName;
      var childCategoryName = req.query.childCategoryName;
      var fourCategoryName = req.query.fourCategoryName;
      console.log("fffff:", childCategoryName);

      // 这里是表示如果，subCategoryName有值就返回 a +  subCategoryName ，因为a是maincategory 所以 要加上 subCategoryName 这个subcategories，来组成新的正则表达
      if (fourCategoryName) {
        regEx = new RegExp(
          "^" +
            a +
            "/" +
            subCategoryName +
            "/" +
            childCategoryName +
            "/" +
            fourCategoryName
        );
      } else if (childCategoryName) {
        regEx = new RegExp(
          "^" + a + "/" + subCategoryName + "/" + childCategoryName
        );
      } else if (subCategoryName) {
        regEx = new RegExp("^" + a + "/" + subCategoryName);
      } else {
        regEx = new RegExp("^" + a);
      }
      // 在这儿console.log一下， 看一下正则表达式
      console.log("xxx:", regEx);
      categoryQueryCondition = { category: regEx };
    }

    // 在filter里选择category然后search
    if (req.query.category) {
      queryCondition = true;
      // let 一个 array， 这个a和上面的a 是一个，可以相互over write，因为我们不会让filter search和 drop down search共存的
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      categoryQueryCondition = {
        category: { $in: a },
      };
    }

    let attrsQueryCondition = [];
    if (req.query.attrs) {
      // attrs=RAM-1TB-2TB-4TB,color-blue-red
      // [ 'RAM-1TB-4TB', 'color-blue', '' ] 这里需要 turn this string into such larray
      // RAM 是key，1TB 4TB是values
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-");
          let values = [...a];
          values.shift(); // removes first item
          let a1 = {
            // a[0] 是key，RAM or Color
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);
          // console.dir(acc, { depth: null })
          return acc;
        } else return acc;
      }, []);
      //   console.dir(attrsQueryCondition, { depth: null });
      queryCondition = true;
    }

    //pagination
    // 如果pageNum不exist，就assign 1 to page Number
    const pageNum = Number(req.query.pageNum) || 1;
    console.log(req.query.pageNum);

    // sort by name, price etc.
    let sort = {};
    // sortOption request query sort or empty string
    const sortOption = req.query.sort || "";
    if (sortOption) {
      // 在Ftend的sortoptioncomponent里，option下拉菜单里，设置了value值：price_1等，来进行排序，所以此处调用并更改， overwrite it
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondition = {};
    let select = {};
    console.log("我是searchQuery", searchQuery);
    if (searchQuery) {
      queryCondition = true;

      // 新方法：在productModel里面靠下面的几行，把name和description 设了text，所以此处用$text会faster
      /*       searchQueryCondition = { $text: { $search: searchQuery } };
      // score代表与 检索关键字 的匹配值，并设置按照score的高低排列
      // (注掉的，都是原代码，现在没有注掉了)现在因为要查找到slrsku，所以写了如下的or并列，比较老的写法，但是无敌管用
      // searchQueryCondition = { $or: [{ name: searchQuery }, { description: searchQuery }, { slrsku: searchQuery }, {supplier: searchQuery}] }
      select = {
        score: { $meta: "textScore" },
      };
      sort = { score: { $meta: "textScore" } }; */

      // 旧方法，但好用
      searchQueryCondition = {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { "stock.slrsku": { $regex: searchQuery, $options: "i" } },
          { "stock.ctlsku": { $regex: searchQuery, $options: "i" } },
          { supplier: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ],
      };
    }
    // name:1 一指的是 ascending order。 -1指descending order
    // 后面的limit（1）是：only one product fetched from the database. and this limit will be needed for pagination.
    // recordsPerPager 在config里有设置数字，就是每页显示几个product
    // 下面的skip（2）是指，first 2 records were skipped,然后算一下每个page显示的东西
    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .select(select)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);

    //  Math.ceil (x) 返回不小于x的最接近的整数
    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
    console.log(pageNum);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    // populate("reviews") 就把reviews展开了，并不仅仅显示reviews的ID
    const product = await Product.findById(req.params.id)
      /* .populate("reviews") */
      .orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const adminGetProducts = async (req, res, next) => {
  try {
    // 设置了sort by category，然后下面括号里选择了，get哪些数据
    const products = await Product.find({})
      .sort({ ctlsku: 1 })
      .select(
        "name category stock.price stock.ctlsku stock.count stock.slrsku stock.attrs stock.barcode"
      );
    return res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    await product.remove();
    res.json({ message: "product removed" });
  } catch (err) {
    next(err);
  }
};

const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const {
      name,
      description,
      count,
      min,
      max,
      price,
      purchaseprice,
      slrcurrentbuyingprice,
      slrsku,
      ctlsku,
      suppliersku,
      supplier,
      category,
      attributesTable,
    } = req.body;

    product.name = name;
    product.description = description;
    product.count = count;
    product.min = min;
    product.max = max;
    product.price = price;
    product.purchaseprice = purchaseprice;
    product.slrcurrentbuyingprice = slrcurrentbuyingprice;
    product.slrsku = slrsku;
    product.ctlsku = ctlsku;
    product.suppliersku = suppliersku;
    product.supplier = supplier;
    product.category = category;

    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();

    res.json({
      message: "product created",
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const {
      name,
      description,
      count,
      min,
      max,
      price,
      purchaseprice,
      slrcurrentbuyingprice,
      slrsku,
      ctlsku,
      suppliersku,
      supplier,
      category,
      attributesTable,
    } = req.body;
    // || or 如果name from request body is empty， then product name the same value
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.min = min || product.min;
    product.max = max || product.max;
    product.price = price || product.price;
    product.purchaseprice = purchaseprice || product.purchaseprice;
    product.slrcurrentbuyingprice =
      slrcurrentbuyingprice || product.slrcurrentbuyingprice;
    product.slrsku = slrsku || product.slrsku;
    product.ctlsku = ctlsku || product.ctlsku;
    product.suppliersku = suppliersku || product.suppliersku;
    product.supplier = supplier || product.supplier;
    product.category = category || product.category;

    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }
    await product.save();
    res.json({
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
};

const adminUpload = async (req, res, next) => {
  try {
    // 如果nothing in req.files ；  ！！非空判断
    if (!req.files || !!req.files.images === false) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResultImage = imageValidate(req.files.images);
    if (validateResultImage.error) {
      return res.status(400).send(validateResultImage.error);
    }

    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectoryImage = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "products"
    );

    let product = await Product.findById(req.query.productId).orFail();

    // iamge
    let imagesTable = [];
    if (Array.isArray(req.files.images)) {
      imagesTable = req.files.images;
    } else {
      imagesTable.push(req.files.images);
    }

    for (let image of imagesTable) {
      var fileName = uuidv4() + path.extname(image.name);
      var uploadPath = uploadDirectoryImage + "/" + fileName;
      product.images.push({ path: "/images/products/" + fileName });
      image.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await product.save();
    return res.send("Files uploaded!");
  } catch (err) {
    next(err);
  }
};

// PDFs
const adminUploadPdf = async (req, res, next) => {
  try {
    if (!req.files || !!req.files.pdfs === false) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResultPdf = pdfValidate(req.files.pdfs);
    if (validateResultPdf.error) {
      return res.status(400).send(validateResultPdf.error);
    }

    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectoryPdf = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "documents"
    );

    let product = await Product.findById(req.query.productId).orFail();
    let pdfsTable = [];
    if (Array.isArray(req.files.pdfs)) {
      pdfsTable = req.files.pdfs;
    } else {
      pdfsTable.push(req.files.pdfs);
    }

    for (let pdf of pdfsTable) {
      // 下面这个是用uuidv4 来随机命名，然后path.extname(pdf.name)是取 .pdf ， 用来拼接成一个随机生成的字符串+.pdf构成文件名
      // 再后面的两个 pdf.name 原本应该是 fileName的，但是这里我需要让文件名直接显示，所以就换掉了
      // var fileName = uuidv4() + path.extname(pdf.name);
      var uploadPath = uploadDirectoryPdf + "/" + pdf.name;
      console.log(pdf);
      product.pdfs.push({ path: "/images/documents/" + pdf.name });
      pdf.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await product.save();
    return res.send("Files uploaded!");
  } catch (err) {
    next(err);
  }
};

const adminDeleteProductImage = async (req, res, next) => {
  const imagePath = decodeURIComponent(req.params.imagePath);
  if (req.query.cloudinary === "true") {
    try {
      await Product.findOneAndUpdate(
        { _id: req.params.productId },
        { $pull: { images: { path: imagePath } } }
      ).orFail();
      return res.end();
    } catch (er) {
      next(er);
    }
    return;
  }
  try {
    const path = require("path");
    const finalPath = path.resolve("../frontend/public") + imagePath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imagePath } } }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};

const adminDeleteProductPdf = async (req, res, next) => {
  const pdfPath = decodeURIComponent(req.params.pdfPath);
  if (req.query.cloudinary === "true") {
    try {
      await Product.findOneAndUpdate(
        { _id: req.params.productId },
        { $pull: { pdfs: { path: pdfPath } } }
      ).orFail();
      return res.end();
    } catch (er) {
      next(er);
    }
    return;
  }
  try {
    const path = require("path");
    const finalPath = path.resolve("../frontend/public") + pdfPath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { pdfs: { path: pdfPath } } }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminUploadPdf,
  adminDeleteProductImage,
  adminDeleteProductPdf,
};
