import mitt from "mitt";

// 事件总线 eventbus  实现组件之间的通信
export const toastevents = mitt();

export function showToast(user = 0, bell = 0, mail = 0) {
  // 发布显示toast事件
  toastevents.emit("show", { user, bell, mail });
}

export function hideToast() {
  // 发布隐藏toast事件
  toastevents.emit("hide");
}
