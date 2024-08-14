<template>
  <div
    class="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-12"
  >
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Image Section -->
      <div class="w-full md:w-1/2">
        <img
          :src="GStore.product_info.image"
          alt="Product image"
          class="w-full h-auto"
        />
      </div>
      <!-- Details Section -->
      <div class="w-full md:w-1/2">
        <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {{ GStore.product_info.product_name }}
        </h1>
        <div class="space-y-4">
          <p class="text-xl font-semibold text-gray-900 dark:text-white">
            <span class="font-normal"
              >{{ GStore.product_info.price }} Bath</span
            >
          </p>
          <p class="text-xl font-semibold text-gray-900 dark:text-white">
            Amount Available:
            <span class="font-normal">{{ GStore.product_info.amount }}</span>
          </p>
          <!-- Description Container -->
          <div
            class="text-lg text-gray-700 dark:text-gray-300 border border-gray-300 p-4 rounded-lg dark:border-gray-600 overflow-y-auto"
            style="max-height: 200px"
          >
            <p class="text-left">
              {{ GStore.product_info.description }}
            </p>
          </div>
          <div class="flex items-center justify-between mt-20">
            <div class="flex items-center space-x-4">
              <button
                @click="decreaseAmount"
                class="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-300"
                :disabled="amountToBuy <= 1"
              >
                -
              </button>
              <p class="text-xl font-semibold">{{ amountToBuy }}</p>
              <button
                @click="increaseAmount"
                class="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-300"
                :disabled="amountToBuy >= GStore.product_info.amount"
              >
                +
              </button>
            </div>
            <button
              @click="submitOrder"
              class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
              :disabled="
                amountToBuy <= 0 || amountToBuy > GStore.product_info.amount
              "
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Comment Section -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Add a Comment
      </h2>
      <div class="flex items-start gap-4">
        <textarea
          v-model="commentText"
          class="flex-1 p-3 border border-gray-300 rounded-lg dark:border-gray-600"
          rows="2"
          placeholder="Write your comment here..."
          required
        ></textarea>
        <button
          @click="submitComment"
          class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600"
        >
          Submit Comment
        </button>
      </div>
    </div>

    <!-- Existing Comments Section -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Comments
      </h2>
      <div
        v-if="comments.length === 0"
        class="text-gray-500 dark:text-gray-400"
      >
        No comments yet.
      </div>
      <ul class="space-y-4">
        <li
          v-for="(comment, index) in comments"
          :key="index"
          class="p-4 border border-gray-300 rounded-lg dark:border-gray-600"
        >
          <p class="text-gray-900 dark:text-white font-semibold">
            {{ comment.user_comment }}:
          </p>
          <p class="text-gray-700 dark:text-gray-300">{{ comment.comment }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ProductService from "@/service/ProductService.js";
import UserUpdateDataService from "@/service/UserUpdateDataService";

export default {
  inject: ["GStore"],
  data() {
    return {
      amountToBuy: 1,
      commentText: "",
      comments: [], // Initialize comments array
    };
  },
  methods: {
    increaseAmount() {
      if (this.amountToBuy < this.GStore.product_info.amount) {
        this.amountToBuy += 1;
      }
    },
    decreaseAmount() {
      if (this.amountToBuy > 1) {
        this.amountToBuy -= 1;
      }
    },
    submitOrder() {
      const productId = this.GStore.product_info._id;
      const username = this.GStore.currentUser;

      ProductService.orderProduct(productId, username, this.amountToBuy)
        .then(() => {
          this.amountToBuy = 1;
          UserUpdateDataService.getUserUpdate(username)
            .then((response) => {
              this.GStore.user_info = response.data.data;
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitComment() {
      const productId = this.GStore.product_info._id;
      const username = this.GStore.currentUser;
      const user_comment = username; // Comment is associated with the logged-in user
      const comment = this.commentText;

      ProductService.userComment(productId, user_comment, comment)
        .then((response) => {
          console.log(response);
          this.comments.push({
            user_comment: user_comment,
            comment: comment,
          });
          this.commentText = ""; // Clear the comment input
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    },
  },
  mounted() {
    // Fetch existing comments for the product when the component is mounted
    const productId = this.GStore.product_info._id;

    ProductService.getProductComments(productId)
      .then((response) => {
        this.comments = response.data.comments || []; // Adjust according to your response structure
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  },
};
</script>
