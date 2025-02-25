
// 添加生命周期日志验证 Service Worker 是否激活
console.log("Service Worker 已加载");

chrome.runtime.onInstalled.addListener(() => {
    console.log("扩展已安装或更新");
});

// 核心监听代码
chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "ctrl-shift-up":
      console.log("减小倍速:", command)
      break;
    case "ctrl-shift-down":
      console.log("增加倍速:", command)
      break;
    case "ctrl-shift-right":
      console.log("重置倍速:", command)
      break;
    default:
      console.error("未知命令:", command)
  }
});
