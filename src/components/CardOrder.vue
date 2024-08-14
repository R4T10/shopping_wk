<template>
  <div
    class="max-w-3xl mx-auto bg-white shadow-md rounded-md overflow-hidden flex items-center space-x-4 p-4 my-4"
  >
    <figure>
      <img
        :src="order.product_image"
        alt="Product image"
        class="w-32 h-32 object-cover rounded"
      />
    </figure>
    <div class="flex-1">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ order.product_name }}
      </h2>
      <p class="text-gray-700">{{ order.amount }} items - ${{ order.cost }}</p>
      <div class="mt-4 flex justify-end">
        <button
          @click="deleteOrder"
          class="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/service/ProductService.js";
import UserUpdateDataService from "@/service/UserUpdateDataService";
import Swal from "sweetalert2";

export default {
  inject: ["GStore"],
  name: "CardOrder",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteOrder() {
      const orderId = this.order.order_id;
      const product_name = this.order.product_name;
      const amount = this.order.amount;
      const username = this.GStore.currentUser;

      ProductService.deleteOrder(orderId, username, product_name, amount)
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: "Order Deleted",
            text: "You have successfully deleted your order",
            icon: "success",
          }).then(() => {
            UserUpdateDataService.getUserUpdate(username)
              .then((response) => {
                console.log(response.data.data);
                this.GStore.user_info = response.data.data;
                console.log("User info has been updated");
                console.log(this.GStore.user_info);
              })
              .catch((error) => {
                console.log(error.response.data);
              });
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Deletion Failed",
            text: "Please check your internet connection",
            icon: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 400px; /* Adjust max-width to make the card wider */
  min-height: 450px; /* Adjust min-height to make the card longer */
}
.card img {
  height: 200px; /* Adjust the image height */
  object-fit: cover;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* Ensure the body takes full height */
}
.card-actions {
  margin-top: auto;
}
</style>
