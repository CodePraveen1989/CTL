import ProductListPageComponent from "./components/ProductListPageComponent";
import ProductListPageComponent2 from "./components/ProductListPageComponent2";
import ProductListPageComponent3 from "./components/ProductListPageComponent3";
import axios from "axios";
import { useParams, useSearchParams , } from "react-router-dom"
import { useSelector } from "react-redux";

/* let filtersUrl = "";
 
const proceedFilters = (filters) => {
    filtersUrl = "";
    Object.keys(filters).map((key, index) => {
        if (key === "category") {
            let cat = "";
            Object.keys(filters[key]).map((key3, index3) => {
                if (filters[key][key3]) cat += `${key3},`;
                return "";
            })
            filtersUrl += "&category=" + cat;
        } else if (key === "attrs") {
            if (filters[key].length > 0) {
                let val = filters[key].reduce((acc, item) => {
                    let key = item.key;
                    let val = item.values.join("-");
                    return acc + key + "-" + val + ",";
                }, "")
                filtersUrl += "&attrs=" + val;
            }
        }
        return "";
    })
    return filtersUrl;
} */

const getProducts = async (categoryName = "", pageNumParam = null, searchQuery = '', filters = {}, sortOption = "", subCategoryName = '', childCategoryName = '', fourCategoryName='') => {
    //   filtersUrl = "&price=60&rating=1,2,3&category=a,b,c,d&attrs=color-red-blue,size-1TB-2TB";
    // filtersUrl = proceedFilters(filters);
    let filtersUrl = "";
    // 下面的就是用来在搞一个新的url，来显示不同的category啥的
    const search = searchQuery ? `search/${searchQuery}/` : "";
    const category = categoryName ? `category/${categoryName}/` : "";


    // 好像 传到 backend的 query是这里的？
    // 查了一下，pageNumParam没有拿到数据
    const url = `/api/products/${category}${search}?pageNum=${pageNumParam}${filtersUrl}&sort=${sortOption}&subCategoryName=${subCategoryName}&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}`;
    var { data } = await axios.get(url);

    console.log('我是data,ProductListPage', data);
    console.log('search', searchQuery);

    return data
}

const ProductListPage = () => {
    var [params] = useSearchParams()
    // return console.log(params.get('serche'));

    // 后面加个""， 如果是null，就是空"", 要不然传到后端就是个null 不是空值
    var subCategoryName = params.get('subCategoryName') || ""
    var childCategoryName = params.get('childCategoryName')|| ""
    var fourCategoryName = params.get('fourCategoryName')|| ""



    // 这里是useParams 找 route 就是url
    // var { childCategoryName, subCategoryName, categoryName } = useParams();
    console.log("我是Params,ProductListPage",useParams())
    // 这个就是从redux里面搞出来的所有categories？ 不懂啊
    const { categories } = useSelector((state) => state.getCategories);
    // 有subCategoryName请求的是2级的

   
    // 这个是传参的，现在用? query 这种url法，上面用了useSearchParams，也就是老router里面的，userQuery。然后跟params有点像，我们用query的法子，在里面搞了几个值 
    // query的法子就是：/product-list?categoryName=PPE&subCategoryName=PROTECTIVE-HEADWEAR&childCategoryName=HARD HATS  这里面的就是?key=value&key=value&key=value,这样重复。然后去nav里面map，写array map()不要写死，太麻烦
    // 忘记这里如果再加 key 和 value 的话，需不需要再去后端搞一搞了？ 我等下去看看
    // 看过了，必须要去后端搞一搞，不然的话，fourCateogryName传不进去，然后就会显示所有childCat里的东西
    return <ProductListPageComponent3 getProducts={getProducts} categories={categories} subCat={subCategoryName} childCat={childCategoryName} fourCat={fourCategoryName} />;

 
};

export default ProductListPage;

