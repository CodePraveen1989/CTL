import OrderDetailsPageComponent from './components/OrderDetailsPageComponent'

import axios from "axios";

const getOrder = async(id) => {
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
  return <OrderDetailsPageComponent getOrder={getOrder} markAsDelivered={markAsDelivered} markAsPaid={markAsPaid}/>
};

export default AdminOrderDetailsPage;

