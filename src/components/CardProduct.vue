<template>
  <div class="card bg-base-100 w-96 shadow-xl">
    <figure>
      <img :src="product.image" alt="Product image" />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-left">
        {{ product.product_name }}
        <!-- <div class="badge badge-secondary">NEW</div> -->
      </h2>
      <p class="text-left">{{ product.description }}</p>
      <!-- <div class="card-actions justify-end">
        <div class="badge badge-outline">Fashion</div>
        <div class="badge badge-outline">Products</div> -->
      <!-- </div> -->
      <p class="text-left font-bold mt-5">{{ product.price }} Bath</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
