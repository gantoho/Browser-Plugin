import { onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const upMid = ref('')
  const upMidStatus = ref(false)

  watch(upMid, (newUpMid) => {
    if (newUpMid.trim() !== '') {
      upMidStatus.value = true
      return
    }
    upMidStatus.value = false
  })

  onMounted(() => {
    chrome.storage.sync.get('upMid', (result) => {
      const upMidStorage = result.upMid
      if (!upMidStorage) {
        return
      }
      upMid.value = upMidStorage
    })
  })

  return {
    upMid,
    upMidStatus
  }
})
