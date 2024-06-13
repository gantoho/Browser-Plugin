<script setup lang='ts'>
import { NCard, NPopover } from 'naive-ui';

defineProps<{favVideoListItem: any}>()

const openVideo = (url: string) => {
  window.open(url, 'blank')
}
</script>

<template>
  <div class="fav-video-list-item">
    <n-card
      hoverable
      @click="openVideo(`https://www.bilibili.com/video/${ favVideoListItem.bvid }`)"
    >
      <template #cover>
        <img :src="favVideoListItem.cover" />
      </template>
      <div class="item-content">
        <n-popover trigger="hover">
          <template #trigger>
            <div class="title">{{ favVideoListItem.title }}</div>
          </template>
          <span style="display: inline-block; max-width: 400px; font-width: 900;">{{ favVideoListItem.title }}</span>
        </n-popover>
        <n-popover trigger="hover">
          <template #trigger>
            <div class="intro">{{ favVideoListItem.intro }}</div>
          </template>
          <span style="display: inline-block; max-width: 400px;">{{ favVideoListItem.intro }}</span>
        </n-popover>
      </div>
    </n-card>
  </div>
</template>

<style lang='scss' scoped>
.fav-video-list-item {
  cursor: pointer;
  img {
    width: 100%;
    height: 10vw;
    object-fit: cover;
  }
  .item-content {
    padding: 10px;
    .title {
      font-weight: 900;
      margin-bottom: 10px;
      height: 40px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .intro {
      height: 40px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
  :deep(.n-card__content) {
    padding: 0;
  }
}
@media (max-width: 1000px) {
  .fav-video-list-item {
    img {
      height: 16vw;
    }
  }
}
@media (max-width: 500px) {
  .fav-video-list-item {
    img {
      height: 32vw;
    }
  }
}
</style>
