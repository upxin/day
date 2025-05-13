// 现有代码保持不变...

// 表格生成完成后，启用拖拽功能
function enableRowDragging() {
  const table = document.querySelector('table');
  const rows = Array.from(table.querySelectorAll('tr'));
  let draggedRow = null;

  // 为每一行添加拖拽事件监听器
  rows.forEach(row => {
    // 排除表头行
    if (row.querySelector('th')) return;

    // 设置行可拖拽
    row.setAttribute('draggable', 'true');

    // 拖拽开始
    row.addEventListener('dragstart', () => {
      draggedRow = row;
      setTimeout(() => {
        row.classList.add('dragging');
      }, 0);
    });

    // 拖拽结束
    row.addEventListener('dragend', () => {
      row.classList.remove('dragging');
      draggedRow = null;
    });

    // 拖拽经过
    row.addEventListener('dragover', e => {
      e.preventDefault();
      const targetRow = e.target.closest('tr');
      if (!targetRow || targetRow === draggedRow) return;

      // 判断是在目标行上方还是下方
      const rect = targetRow.getBoundingClientRect();
      const threshold = rect.top + rect.height / 2;
      const position = e.clientY < threshold ? 'beforebegin' : 'afterend';

      // 插入拖拽行
      if (position === 'beforebegin') {
        table.querySelector('tbody').insertBefore(draggedRow, targetRow);
      } else {
        table.querySelector('tbody').insertBefore(draggedRow, targetRow.nextSibling);
      }
    });

    // 拖拽进入
    row.addEventListener('dragenter', e => {
      e.preventDefault();
      const targetRow = e.target.closest('tr');
      if (targetRow && targetRow !== draggedRow) {
        targetRow.classList.add('drag-over');
      }
    });

    // 拖拽离开
    row.addEventListener('dragleave', e => {
      const targetRow = e.target.closest('tr');
      if (targetRow && targetRow !== draggedRow) {
        targetRow.classList.remove('drag-over');
      }
    });
  });
}

// 添加必要的 CSS 样式
function addDragStyles() {
  const style = document.createElement('style');
  style.textContent = `
    tr.dragging {
      opacity: 0.5;
    }
  `;
  document.head.appendChild(style);
}

// 在表格生成后调用
addDragStyles();
enableRowDragging();
