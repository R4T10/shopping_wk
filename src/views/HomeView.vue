<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold text-center mb-8">Home Page</h1>
    <CarouselComponent />
    <div class="flex flex-wrap justify-center gap-4">
      <CardProduct
        v-for="product in GStore.productList"
        :key="product.id"
        :product="product"
        class="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
      />
    </div>
  </div>
</template>

<script>
import CardProduct from "@/components/CardProduct.vue";
import CarouselComponent from "@/components/CarouselComponent.vue";
export default {
  inject: ["GStore"],
  name: "HomeView",
  components: {
    CardProduct,
    CarouselComponent,
  },
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
