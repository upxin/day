const box = document.getElementById("box");
box.style.width = window.innerWidth + "px";
box.style.height = "120px";
box.style.top = "100px"; // 可根据需要设置初始位置
box.style.left = "0px";

const container = document.getElementById("container");
let isDragging = false,
  isResizing = false;
let startX, startY, startWidth, startHeight, startTop, startLeft, currentHandle;

box.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("handle")) {
    isResizing = true;
    currentHandle = e.target.classList[1];
  } else {
    isDragging = true;
  }
  startX = e.clientX;
  startY = e.clientY;
  startWidth = box.offsetWidth;
  startHeight = box.offsetHeight;
  startTop = box.offsetTop;
  startLeft = box.offsetLeft;
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    box.style.left = `${startLeft + dx}px`;
    box.style.top = `${startTop + dy}px`;
  } else if (isResizing) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    let newWidth = startWidth;
    let newHeight = startHeight;
    let newLeft = startLeft;
    let newTop = startTop;

    switch (currentHandle) {
      case "br":
        newWidth += dx;
        newHeight += dy;
        break;
      case "bl":
        newWidth -= dx;
        newLeft += dx;
        newHeight += dy;
        break;
      case "tr":
        newWidth += dx;
        newHeight -= dy;
        newTop += dy;
        break;
      case "tl":
        newWidth -= dx;
        newLeft += dx;
        newHeight -= dy;
        newTop += dy;
        break;
    }

    if (newWidth > 30 && newHeight > 30) {
      box.style.width = `${newWidth}px`;
      box.style.height = `${newHeight}px`;
      box.style.left = `${newLeft}px`;
      box.style.top = `${newTop}px`;
    }
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  isResizing = false;
});
