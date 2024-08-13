import apiClient from "./AxiosClient";
import GStore from "@/store";
import Swal from "sweetalert2";
import router from "@/router";
export default {
  getProductList(username) {
    console.log("Current User:" + username);
    return apiClient
      .get(`/products/api/v1/products`, {
        params: { username: username },
      })
      .then((response) => {
        GStore.productList = response.data.data;
        console.log(GStore.productList);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (
          error.response.data.message ==
          "Your account haven't aprrove , please wait"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          GStore.currentUser = null;
          GStore.productList = null;
          Swal.fire({
            title: "Wait for aprroving the account",
            text: "admin is working on approving your accoun, please wait",
            icon: "warning",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/login");
            }
          });
        } else {
          Swal.fire({
            title: "Please login",
            text: "login before going to homepage",
            icon: "warning",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/login");
            }
          });
        }
      });
  },
  getProduct(id) {
    console.log(id);
    return apiClient.get(`/products/api/v1/products/` + id).then((response) => {
      console.log(response.data.data);
      GStore.product_info = response.data.data;
    });
  },
  addProduct(product) {
    return apiClient.post(`/products/api/v1/products`, product);
  },
};
