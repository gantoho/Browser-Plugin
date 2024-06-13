import { defineStore } from 'pinia'
import {onMounted, ref, toRefs, watch} from 'vue'
import { request } from '@/utils'
import { Fav } from '@/types/fav'
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/store/user.ts';

export const useFavStore = defineStore('fav', () => {
  const { upMid } = toRefs(useUserStore())

  const message = useMessage()

  const favList = ref<Fav[]>([]) // 收藏夹列表
  const favVideoList = ref<any>() // 收藏夹内的视频列表
  const pn = ref<number>(1) // 分页页面

  /**
   * 请求获取收藏夹列表
   */
  const getFavListRequest = async (up_mid?: string) => {
    const { code, data, msg } = await request({
      url: '/v3/fav/folder/created/list-all',
      method: 'get',
      params: {
        up_mid: up_mid ? up_mid : upMid.value
      }
    })
    if (code !== 200) {
      message.error(msg)
      return
    }
    favList.value = data?.list
  }
  /**
   * 请求获取收藏夹内的视频列表
   */
  const getFavVideoListRequest = async (mediaId: number) => {
    const { code, data, msg } = await request({
      url: '/v3/fav/resource/list',
      method: 'get',
      params: {
        media_id: mediaId,
        pn: pn.value,
        ps: 20,
        keyword: '',
        order: 'mtime',
        type: 0,
        tid: 0,
        platform: 'web'
      }
    })
    if (code !== 200) {
      message.error(msg)
      return
    }
    favVideoList.value = data.medias
  }

  const favStart = async () => {
    const favListStorage = localStorage.getItem('favList')
    if (favListStorage) {
      favList.value = JSON.parse(favListStorage)
      return
    }
    if (upMid.value.trim() !== '') {
      await getFavListRequest(upMid.value)
      if (!favList.value || favList.value?.length === 0) {
        message.info('该UP主没有收藏夹')
        return
      }

      for (const item of favList.value) {
        let arr: any = []
        for (let i = 1; i <= Math.ceil(item.media_count / 20); i++) {
          pn.value = i
          await getFavVideoListRequest(item.id)
          arr.push(...favVideoList.value)
        }
        item['children'] = arr
        localStorage.setItem('favList', JSON.stringify(favList.value))
      }
    }
  }

  onMounted( async () => {
    // chrome.storage.sync.get('favList', async (result) => {
    //   const favListStorage = result.favList
    //   console.log(favListStorage, "favListStorage")
    //   if (favListStorage) {
    //     favList.value = JSON.parse(favListStorage)
    //     return
    //   }
    //   if (upMid.value.trim() !== '') {
    //     await getFavListRequest(upMid.value)
    //     if (!favList.value || favList.value?.length === 0) {
    //       message.info('该UP主没有收藏夹')
    //       return
    //     }
    //
    //     let arr: any = []
    //     for (const item of favList.value) {
    //       arr = []
    //       for (let i = 1; i <= Math.ceil(item.media_count / 20); i++) {
    //         pn.value = i
    //         // await getFavVideoListRequest(item.id)
    //         arr.push(...favVideoList.value)
    //       }
    //       item['children'] = arr
    //     }
    //     console.log(favList.value, "favList.value")
    //     localStorage.setItem('favList', JSON.stringify(favList.value))
    //     console.log(localStorage.getItem('favList'), "-----te-t")
    //     // chrome.storage.sync.remove('favList', () => {
    //     //   console.log('收藏夹数据删除成功')
    //     // })
    //     chrome.storage.sync.set({'favList': JSON.stringify(favList.value)}, () => {
    //       console.log('收藏夹数据存储成功')
    //     })
    //     chrome.storage.sync.get('favList', (result) => {
    //       console.log(result, "$$$$$$$$$$$$$")
    //     })
    //   }
    // })
  })

  watch(upMid, async () => {
    await favStart()
  })

  return {
    favList,
    favVideoList,
    pn,
    favStart,
    getFavListRequest,
    getFavVideoListRequest
  }
})
