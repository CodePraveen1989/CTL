const connectDB = require("../config/db")
connectDB()

//把categories里面模拟的data，save进database
const categoryData = require("./categories")
const productData = require("./products");

const userData = require("./users")
const orderData = require("./orders")


//引用categoryModel的限制
const Category = require("../models/CategoryModel")
const Product = require("../models/ProductModel");

const User = require("../models/UserModel")
const Order = require("../models/OrderModel")



const importData = async () => {
    try {
        // remove all existing indexes
        await Category.collection.dropIndexes()
        await Product.collection.dropIndexes();


        //delete所有的existing categories from category collection
        await Category.collection.deleteMany({})
        await Product.collection.deleteMany({});

        await User.collection.deleteMany({})
        await Order.collection.deleteMany({})



        if (process.argv[2] !== "-d") {
            await Category.collection.dropIndexes()
            await Product.collection.dropIndexes()
    
            await Category.collection.deleteMany({})
            await Product.collection.deleteMany({})
    
            await Category.insertMany(categoryData)
            await Product.insertMany(productData)
            await User.insertMany(userData)
            await Order.insertMany(orderData)





            console.log("Seeder data imported successfully")
            process.exit()
            return
        }
        console.log("Seeder data deleted successfully");
        process.exit();

    } catch (error) {
        console.error("Error while proccessing seeder data", error)
        process.exit(1);
    }
}
importData()

// node seeder/seeder 运行seeder里的seeder.js 来添加dome data进database

