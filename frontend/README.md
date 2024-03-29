# Dependencies
- node.js
- npx create-react-app frontend
- npm install react-bootstrap bootstrap
- npm install -S react-router-bootstrap
- npm install bootstrap-icons
- npm install react-simple-star-rating@^4.0.5
- npm install js-image-zoom@^0.7.0
- npm install rechart

- npm i mdb-ui-kit
- npm i mdb-react-ui-kit
    - MDBootstrap
- npm i @fortawesome/fontawesome-free

- npm install tw-elements

- npm install bootstrap@^5.1.3

- npm i react-countdown

- npm i @apollo/client
- npm i jwt-decode
- npm i react-icons

- npm install js-image-zoom --save

- npm i axios
- npm i react-redux
- npm i redux-devtools-extension
- npm i redux-thunk

## Mouse hover on bootstrap dropdown
```js
<NavDropdown title={name} id={name} renderMenuOnMount={true}>
...menu items...
</NavDropdown>
```
And in CSS:
```css
.nav-item.dropdown:hover .dropdown-menu {
    display: block;
}
```
[hover dropdown on bootstrap](https://stackoverflow.com/questions/60373789/react-bootstrap-dropdown-on-hover)

## Carousel Zoom
- npm i react-responsive-carousel
- npm i react-medium-image-zoom



# 各级路由，连接frontend以及backend，做subcategories 和 childcategories
1. 首先 思路是： /product-list/category/PPE/FACE%20PROTECTION/BROWGUARD-VISITOR%20COMBO
    - FACE PROTECTION 就是 subcategories， BROWGUARD-VISITOR COMBO 就是childcategories
    - PPE 是 main categories，是一级路由，subcat 就是二级路由， childcat 就是三级路由。
2. 然后 在App.js里写route： 
```js
    <Route path="/product-list/category/:categoryName" element={<ProductListPage />} />
    <Route path="/product-list/category/:categoryName/:subCategoryName" element={<ProductListPage />} />
    {/* 这个地方好像跟productListPage里面的 subcat childcat对应，也就是哪个route在上面就先匹配哪一个。然后params就是下面这个route依次往后匹配 */}
    <Route path="/product-list/category/:categoryName/:subCategoryName/:childCategoryName" element={<ProductListPage />} />
    <Route path="/product-list/category/:categoryName/:subCategoryName/:pageNumParam" element={<ProductListPage />} />
    <Route path="/product-list/category/:categoryName/:subCategoryName/:childCategoryName/:pageNumParam" element={<ProductListPage />} />              
    <Route path="/product-list/category/:categoryName/:pageNumParam" element={<ProductListPage />} />  
```
因为 useParams就是 解析存储 url 路由的，所以在 productListPage.js 里面 就会按照上面写的顺序向下匹配，所以要把 pageNumParam 放在最后，不然 childCat 的值会放入到 pageNumParam 里面
```js
import ProductListPageComponent from "./components/ProductListPageComponent";
import ProductListPageComponent2 from "./components/ProductListPageComponent2";
import ProductListPageComponent3 from "./components/ProductListPageComponent3";
import axios from "axios";
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";

let filtersUrl = "";


const ProductListPage = () => {
    // 这里是useParams 找 route 就是url
    var { childCategoryName, subCategoryName, categoryName } = useParams();
    console.log("我是Params",useParams())
    // 这个就是从redux里面搞出来的所有categories？ 不懂啊
    const { categories } = useSelector((state) => state.getCategories);
    // 有subCategoryName请求的是2级的
    console.log("我是categoryName", categoryName,"我是childCat", childCategoryName)

    if (childCategoryName) {
        return <ProductListPageComponent3 getProducts={getProducts} categories={categories || categoryName} subCat={subCategoryName} childCat={childCategoryName} />;
    }
    if (subCategoryName) {
        return <ProductListPageComponent2 getProducts={getProducts} categories={categories || categoryName} subCat={subCategoryName}/>;
    }
    return <ProductListPageComponent getProducts={getProducts} categories={categories} />;
};
// 上面这个 ProductListPageComponent 会有 123 是因为，里面太乱了，就只能先加一个二级路由 subCat 进到 2 里面，然后添加 childCat 进入到 3 里面
// 并且因为subcat 是先渲染的，所以就放在childcat 后面， 因为 上面语句是 从上到下 逐步渲染的。 有childcat 就有限匹配，没有就pass 到 subcat
export default ProductListPage;

```
3. 下一步就是去 backend 里面 productController里面找， categories 的 query condition
```js
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
      var regEx = null
      // 我们这里的 subCategoryName 是在frontend Productlistpagecomponent里面新设置的subcategories的变量，因为是存到了query里面，所以consolelog queryd的话，可以看到
      // 其实这里的 subCategoryName 和 childCategoryName 是从 route里面解析的，存在了params里的， 所以可以 req.query.XXX 来读取，并赋值
      var subCategoryName = req.query.subCategoryName;
      var childCategoryName = req.query.childCategoryName;
      console.log('CCCCCC:',childCategoryName);

      // 这里是表示如果，subCategoryName有值就返回 a +  subCategoryName ，因为a是maincategory 所以 要加上 subCategoryName 这个subcategories，来组成新的正则表达
      if (childCategoryName) {
        regEx = new RegExp("^" + a+'/'+subCategoryName+'/'+childCategoryName)
      } 
      else if (subCategoryName) {
        regEx = new RegExp("^" + a+'/'+subCategoryName)
      } 
      else {
        regEx=  new RegExp("^" + a);
      }
      // 在这儿console.log一下， 看一下正则表达式
      console.log('xxx:',regEx);
      categoryQueryCondition = { category: regEx };
    }
```

# deploy to render.
1. frontend -> package.json -> remove proxy:  "proxy": "http://localhost:5000"

2. backend -> create .gitignore -> enter .env

3. for older Node versions (<15), need to remove replaceAll function. render.com by default uses older one.

4. new web service -> connect GitHub -> backend   ./backend   npm install   node server.js => click advance -> add environment variable (use env file)  => create

5. after it done, open backend url and put /api/products to test.

6. go back to dashboard -> click NEW + -> static site -> connect -> front end      ./frontend    npm run build    build  => create  (should install webpack-4 and redux in local then upload package.json to github)

7. Redirects/Rewrites 

