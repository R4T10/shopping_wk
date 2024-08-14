<template>
  <div class="card bg-base-100 w-96 shadow-xl">
    <router-link
      :to="{ name: 'ProductDetailView', params: { id: product._id } }"
    >
      <figure class="card-figure">
        <img :src="product.image" alt="Product image" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-left">
          {{ product.product_name }}
          <!-- <div class="badge badge-secondary">NEW</div> -->
        </h2>
        <p class="text-left card-description">{{ product.description }}</p>
        <!-- <div class="card-actions justify-end">
        <div class="badge badge-outline">Fashion</div>
        <div class="badge badge-outline">Products</div> -->
        <!-- </div> -->
        <p class="text-left font-bold mt-5">{{ product.price }} Bath</p>
      </div>
    </router-link>
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
<style scoped>
.card-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* Number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  /* Adjust as needed */
}
.card-figure {
  width: 100%;
  overflow: hidden; /* Ensures no overflow of image */
}

.card-figure img {
  width: 100%; /* Ensures the image fills the container width */
  height: auto; /* Maintains aspect ratio */
  max-height: 200px; /* Sets a maximum height */
  object-fit: cover; /* Crops the image if necessary */
}
</style>
