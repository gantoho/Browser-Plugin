chrome.storage.sync.set({ 'bili-fav': 123 }, () => {
    console.log('保存成功')
});
chrome.storage.sync.get(['bili-fav'], result => {
    console.log(result, "result")
})