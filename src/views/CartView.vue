<template>
  <div class="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6 my-6">
    <h1 class="text-2xl font-bold mb-4 text-center">Order Summary</h1>
    <div class="space-y-4">
      <CardOrder
        v-for="order in GStore.user_info.orders"
        :key="order.id"
        :order="order"
      />
    </div>
    <div class="flex justify-between mt-6 border-t pt-4">
      <p class="text-lg font-semibold">Total Cost: ${{ totalCost }}</p>
      <p class="text-lg font-semibold">Total Amount: {{ totalAmount }} items</p>
    </div>
  </div>
</template>

<script>
import CardOrder from "@/components/CardOrder.vue";
export default {
  inject: ["GStore"],
  components: {
    CardOrder,
  },
  name: "CartView",
  computed: {
    totalCost() {
      return this.GStore.user_info.orders.reduce(
        (total, order) => total + order.cost,
        0
      );
    },
    totalAmount() {
      return this.GStore.user_info.orders.reduce(
        (total, order) => total + order.amount,
        0
      );
    },
  },
};
</script>

<style scoped>
.card-order-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-summary {
  max-width: 36rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

.order-summary-header {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.order-summary-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.total-cost,
.total-amount {
  font-weight: 600;
}
</style>
