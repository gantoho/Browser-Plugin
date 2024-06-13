<script setup lang='ts'>
import { toRefs} from 'vue'
import FavList from '@/components/FavList.vue'
import { useFavStore } from '@/store/fav.ts';

const { favList } = toRefs(useFavStore())
</script>

<template>
  <div class="main">
    <FavList v-model:favList="favList" />
  </div>
</template>

<style lang='scss' scoped>
.main {
  padding: 10px;
}
</style>
