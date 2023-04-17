import EditProductPageComponent from "./components/EditProductPageComponent";

import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
  uploadPdfApiRequest,
  uploadPdfCloudinaryApiRequest,
} from "./utils/utils";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

const updateProductApiRequest = async (productId, formInputs) => {
  const { data } = await axios.put(`/api/products/admin/${productId}`, {
    ...formInputs,
  });
  return data;
};

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);

  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    // 在productController的 adminDeleteProductImage 里面 已经decode了url，所以这里要encode

    let encoded = encodeURIComponent(imagePath);
    if (process.env.NODE_ENV !== "production") {
      // to do: change to !==
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
      );
    }
  };

  

  const pdfDeleteHandler = async (pdfPath, productId) => {
    // 在productController的 adminDeleteProductImage 里面 已经decode了url，所以这里要encode

    let encoded = encodeURIComponent(pdfPath);
    if (process.env.NODE_ENV !== "production") {
      // to do: change to !==
      await axios.delete(`/api/products/admin/pdf/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/pdf/${encoded}/${productId}?cloudinary=true`
      );
    }
  };

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      reduxDispatch={reduxDispatch}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      uploadPdfApiRequest={uploadPdfApiRequest}
      uploadPdfCloudinaryApiRequest={uploadPdfCloudinaryApiRequest}
      pdfDeleteHandler={pdfDeleteHandler}
    />
  );
};

export default AdminEditProductPage; 
