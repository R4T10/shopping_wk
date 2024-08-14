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
  orderProduct(id, username, amount_user) {
    console.log("Username:", username);
    return apiClient
      .post(`/products/api/v1/products/${id}/orders`, {
        username,
        amount_user,
      })
      .then((response) => {
        console.log("Order Response:", response.data);
        // Handle successful order
        Swal.fire({
          title: "Order Placed",
          text: response.data.message,
          icon: "success",
        }).then(() => {
          this.getProduct(id);
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        Swal.fire({
          title: "Order Failed",
          text: error.response.data.message,
          icon: "error",
        });
      });
  },
  deleteOrder(orderId, username, product_name, amount_order) {
    console.log("this is service");
    console.log(username);
    return apiClient
      .delete(`/products/api/v1/orders`, {
        data: { orderId, username, product_name, amount_order },
      })
      .then((response) => {
        console.log("Order Response:", response.data);
        // Handle successful order
        Swal.fire({
          title: "Delete order success",
          text: response.data.message,
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        Swal.fire({
          title: "Delete order failed",
          text: error.response.data.message,
          icon: "error",
        });
      });
  },
  addProduct(product) {
    return apiClient.post(`/products/api/v1/products`, product);
  },
  getProductComments(productId) {
    return apiClient.get(`/products/api/v1/products/${productId}/comments`);
  },
  userComment(productId, user_comment, comment, username) {
    return apiClient.post(`/products/api/v1/products/${productId}/comment`, {
      user_comment,
      comment,
      username,
    });
  },
};
