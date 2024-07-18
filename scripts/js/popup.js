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

const body = document.querySelector("body")
const observer = new MutationObserver(() => {
    const biliFavBtnStr = `
        <div class="bili-fav-btn">
            <span class="iconfont icon-ic_collect"></span>
            <span class="bili-fav-btn-text">BiliFav</span>
        </div>
    `
    const biliFavBtn = document.createElement("div")
    body.appendChild(biliFavBtn)
    biliFavBtn.outerHTML = biliFavBtnStr
    
    drag(document.querySelector(".bili-fav-btn"))
    observer.disconnect()
})
observer.observe(body, {
    childList: true,
    subtree: true
})

function drag(ele) {
    console.log(ele, "ele")
    let oldX, oldY, newX, newY
    ele.onmousedown = function (e) {
        if (!ele.style.right && !ele.style.bottom) {
            ele.style.right = 0
            ele.style.bottom = 0
        }
        oldX = e.clientX
        oldY = e.clientY
        document.onmousemove = function (e) {
            newX = e.clientX
            newY = e.clientY
            ele.style.right = parseInt(ele.style.right) - newX + oldX + 'px'
            ele.style.bottom = parseInt(ele.style.bottom) - newY + oldY + 'px'
            oldX = newX
            oldY = newY
        }
        document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}
