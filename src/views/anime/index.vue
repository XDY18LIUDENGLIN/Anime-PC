<template>
  <div class="container">
    <!--    检索栏-->
    <AnimeHeader />
    <div class="container-second">
      <div class="container-second-carousel">
        <!--        轮播图-->
        <AnimeCarousel />
      </div>
      <div class="container-second-tab">
        <ElScrollbar>
          <!--      侧边栏排行榜-->
          <AnimeMina />
        </ElScrollbar>
      </div>
    </div>
    <!--    下方帅选栏-->
    <AnimeBroswerMain />
  </div>
</template>
<script lang="ts">
export default {
  name: 'AnimePage'
};
</script>
<script lang="ts" setup>
import AnimeHeader from './components/AnimeHeader.vue';
import AnimeCarousel from './components/AnimeCarousel.vue';
import AnimeBroswerMain from './components/AnimeBroswerMain.vue';
import AnimeMina from './components/AnimeMina.vue';
</script>
<style lang="less" scoped>
@import url(./styles/AnimePage.less);
</style>
