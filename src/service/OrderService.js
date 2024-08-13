import apiClient from "./AxiosClient";
import GStore from "@/store";
export default {
  getOrderList() {
    return apiClient.get(`orders/api/v1/orders`).then((response) => {
      GStore.orderList = response.data.data;
      console.log(GStore.orderList);
    });
  },
};
