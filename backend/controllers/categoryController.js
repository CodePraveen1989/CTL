const Category = require("../models/CategoryModel");

const getCategories = async (req, res, next) => {
  try {
    // category是我们第一行const了，find is the way we can fetch all of the categories from the database inside the curly braces as the argument of find function.
    // .find({name = computers}) 就是只search computers category，如果留白就是无限制
    // A C means a standard order from A to Z
    const categories = await Category.find({}).sort({ name: "asc" }).orFail();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const newCategory = async (req, res, next) => {
  try {
    //下面的只是用于在postman里做测试。
    /*         
        // res.send(!!req.body) 第90章
        const {category} = req.body
        //!category意思是：如果category是空的，就throw out message "Category input is required"。不为空，就send category
        if(!category) {
            throw new Error("Category input is required")
        }
        res.send(category) 
    */

    const { category } = req.body;
    if (!category) {
      res.status(400).send("Category input is required");
    }
    // try to findOne category,如果有，就提示说 已存在
    const categoryExists = await Category.findOne({ name: category });
    if (categoryExists) {
      res.status(400).send("Category already exists");
    } else {
      // 如果没有，就create category
      const categoryCreated = await Category.create({
        name: category,
      });
      res.status(201).send({ categoryCreated: categoryCreated });
    }
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  // return res.send(req.params.category)
  try {
    if (req.params.category !== "Choose category") {
      const categoryExists = await Category.findOne({
        //decodeURIComponent()函数de作用：可对encodeURIComponent()函数编码的URI进行解码。
        name: decodeURIComponent(req.params.category),
      }).orFail();
      await categoryExists.remove();
      res.json({ categoryDeleted: true });
    }
  } catch (err) {
    next(err);
  }
};

const saveAttr = async (req, res, next) => {
    const {key, val, categoryChoosen} = req.body
    //但凡key val categorychoosen有一个空，就return 下面的话
    if(!key || !val || !categoryChoosen) {
        return res.status(400).send("All inputs are required")
    }
    try {
        //category后面的 “/” 后的第一个
        const category = categoryChoosen.split("/")[0]
        //我们必须要在 existing的category里面操作
        const categoryExists = await Category.findOne({name: category}).orFail()
        if(categoryExists.attrs.length > 0) {
            // if key exists in the database then add a value to the key， 接else: push to the ary
            var keyDoesNotExistsInDatabase = true
            categoryExists.attrs.map((item, idx) => {
                if(item.key === key) {
                    keyDoesNotExistsInDatabase = false
                    //展开 attrs里面的value array
                    var copyAttributeValues = [...categoryExists.attrs[idx].value]
                    copyAttributeValues.push(val)
                    var newAttributeValues = [...new Set(copyAttributeValues)] // Set ensures unique values
                    categoryExists.attrs[idx].value = newAttributeValues
                }
            })
            //这个if直接接的是var keyDoesNotExistsInDatabase = true
            if(keyDoesNotExistsInDatabase) {
                categoryExists.attrs.push({key: key, value: [val]})
            }
        } else {
            // push to the array
            categoryExists.attrs.push({key: key, value: [val]})
        }
        await categoryExists.save()
        let cat = await Category.find({}).sort({name: "asc"})
        return res.status(201).json({categoriesUpdated: cat})
    } catch(err) {
        next(err)
    }
}

module.exports = {getCategories, newCategory, deleteCategory, saveAttr}
//const 了几个，就要export几个。然后去routes --> categoryRoutes.js里添加
