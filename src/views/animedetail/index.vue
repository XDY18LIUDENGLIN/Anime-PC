<template>
  <!-- 展示动漫详情页 -->
  <article class="big-container">
    <MyPageHeader :backFn="back"> 动漫 {{ animeDetail?.name_cn }} 详情 </MyPageHeader>
    <section class="content">
      <!-- pc端上三栏布局 手机端左边一栏 右边详细信息 右边的往下放 -->
      <aside class="left-content" v-if="!loading">
        <AnimeDetailHeader :animeDetail="animeDetail" v-if="animeDetail" />
        <AnimeDetailBody :animeDetail="animeDetail" v-if="animeDetail" />
        <div class="empty" v-else>
          <AdkEmpty desc="数据加载不出来了~请重试" />
        </div>
      </aside>
      <aside class="right-content" v-if="!loading">
        <RataingBox :animeDetail="animeDetail" v-if="animeDetail" />
        <!-- 在看人数 -->
        <AnimeCollections :collectionData="animeDetail.collection" v-if="animeDetail" />
        <AnimeTags v-if="tags && tags.length > 0" :tags="tags" />
        <AnimeRecommend v-if="tags && tags.length > 0" :tags="tags" @changeId="changeData" />
      </aside>
      <aside class="empty" v-else>
        <AdkEmpty desc="数据正在努力加载中~~~" />
        <LoadingAnime />
      </aside>
    </section>
  </article>
</template>
<script lang="ts">
import { useStore } from '@/store/main';
export default {
  name: 'AnimeDetail',
  beforeRouteEnter(to, from, next) {
    const mainstroe = useStore();
    if (to.query.isCache !== 'no') {
      mainstroe.sourcePage.push(from.path);
    }
    to.query = {};
    next();
  }
};
</script>
<script lang="ts" setup>
import { useAnimeDeatil } from '@/hooks/BangumiDetail';
import { ElMessage } from 'element-plus';
import AnimeDetailHeader from './components/Header/AnimeDetailHeader.vue';
import AnimeDetailBody from './components/Body/AnimeDetailBody.vue';
import RataingBox from './components/Card/RataingBox.vue';
import AnimeCollections from './components/Card/AnimeCollections.vue';
import { getSubjectInfoApi } from '@/api/bangumi';
import AnimeRecommend from './components/Card/AnimeRecommend.vue';
import AnimeTags from './components/Card/AnimeTags.vue';
import { useBackToSource } from '@/hooks/useSourcepage';
import { useHead } from '@vueuse/head';
const route = useRoute();
const animeDetail = ref<Bangumi.AnimeDeatilItem | null>();
const tags = ref<Array<Bangumi.AnimeTag>>([]);
const infoBox = ref<Array<Bangumi.InfoBoxItem>>([]);
const loading = ref(false);
const router = useRouter();
const { back } = useBackToSource(router);
const getData = (id: number) => {
  loading.value = true;
  useAnimeDeatil(id)
    .then(result => {
      animeDetail.value = result;
      //绘制图表
      loading.value = false;
    })
    .catch(err => {
      ElMessage.error('请求失败');
      loading.value = false;
    });

  getSubjectInfoApi(id)
    .then((result: any) => {
      const { data: res } = result;
      const data = res.data;
      tags.value = data.tags;
      infoBox.value = data.infobox;
    })
    .catch((err: any) => {
      ElMessage.error('请求失败');
      loading.value = false;
    });
};
const changeData = () => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  animeDetail.value = null;
  const sb = Number(id);
  if (isNaN(sb)) {
    return;
  }
  getData(sb);
};
document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
provide('infoboxVal', infoBox);
useHead({
  // Can be static or computed
  title: computed(() => {
    if (animeDetail.value) {
      if (animeDetail.value.name_cn) return `${animeDetail.value.name_cn}-ADKBlog-我的个人小站`;
      else return `${animeDetail.value.name}-ADKBlog-我的个人小站`;
    } else {
      return '动漫详情-ADKBlog-我的个人小站';
    }
  }),
  meta: [
    {
      name: `description`,
      content: computed(() => (animeDetail.value?.summary ? animeDetail.value.summary : '描述'))
    }
  ]
});
watchEffect(() => {
  changeData();
});
</script>

<style lang="less" scoped>
@import url(./styles/Animedetail.less);
</style>
