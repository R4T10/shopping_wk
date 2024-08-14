<template>
  <Carousel :itemsToShow="3.95" :wrapAround="true" :transition="500">
    <Slide v-for="(image, index) in images" :key="index">
      <img :src="image" alt="Carousel image" class="carousel-image" />
    </Slide>
  </Carousel>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "CarouselComponent",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      images: [
        "https://i.pinimg.com/564x/be/37/88/be3788ceedf9d838038da0efbd4445f9.jpg",
        "https://i.pinimg.com/564x/df/8c/b4/df8cb49b67a64abb445fa54898dd0e58.jpg",
        "https://i.pinimg.com/564x/20/c1/45/20c14504e43b6c80150f1a0bd8498f7c.jpg",
        "https://i.pinimg.com/564x/fb/25/80/fb2580b11651ceb946b2b54fd3cd510e.jpg",
        "https://i.pinimg.com/564x/76/0d/f4/760df4902a329ddb7e78857d57e314fb.jpg",
      ],
    };
  },
});
</script>

<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}
</style>
