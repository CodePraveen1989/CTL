import OrderDetailsPageComponent from './components/OrderDetailsPageComponent'
import { useSelector } from "react-redux";

import axios from "axios";

const getOrder = async (id) => {
    const { data } = await axios.get("/api/orders/user/" + id);
    return data
}

const markAsDelivered = async (id) => {
    const { data } = await axios.put("/api/orders/delivered/" + id);
    if (data) {
        return data;
    }
}

const markAsPaid = async (id) => {
    const { data } = await axios.put("/api/orders/paid/" + id);
    if (data) {
        return data;
    }
}

const AdminOrderDetailsPage = () => {
    const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

    const getUser = async () => {
        const { data } = await axios.get("/api/users/profile/" + userInfo._id);
        return data;
    };
    return <OrderDetailsPageComponent getOrder={getOrder} getUser={getUser} markAsDelivered={markAsDelivered} markAsPaid={markAsPaid} />
};

export default AdminOrderDetailsPage;

