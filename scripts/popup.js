// console.log(localStorage.getItem("time_tracker"), "time_tracker")
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name)===0) return c.substring(name.length,c.length);
    }
    return "";
}
// localStorage.setItem("upMid", getCookie('DedeUserID'))
chrome.storage.sync.set({ 'upMid': getCookie('DedeUserID') }, () => {
    console.log('upMid save successfully');
});
chrome.storage.sync.get('upMid', result => {
    console.log(result)
})
// const match = location.pathname.match(/\/video\/([A-Za-z0-9]+)/)
// if (match && match.length > 1) {
//     chrome.storage.sync.set({ 'bvid': match[1] })
// } else {
//     chrome.storage.sync.set({ 'bvid': null })
// }
// chrome.storage.sync.get('bvid', result => {
//     console.log(result, "bvid")
// })


const tabLinks = document.querySelector(".n-tab-links")
const biliFavTabLinkStr = `
<a href="javascript:;" class="n-btn n-bilifav router-link-exact-active router-link-active">
    <span class="iconfont icon-ic_collect"></span>
    <span class="n-text">BiliFav</span>
</a>
`
const biliFavTabLink = document.createElement("a")
tabLinks.appendChild(biliFavTabLink)
biliFavTabLink.outerHTML = biliFavTabLinkStr