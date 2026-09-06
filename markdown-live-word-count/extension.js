const vscode = require('vscode');

function countWords(text) {
  const matches = text.match(/[\p{Script=Han}]|[\p{L}\p{N}]+/gu);
  return matches ? matches.length : 0;
}

function activate(context) {
  const counter = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  counter.name = 'Markdown 实时字数';
  counter.tooltip = '当前 Markdown 文件字数';

  function update() {
    const editor = vscode.window.activeTextEditor;

    if (!editor || editor.document.languageId !== 'markdown') {
      counter.hide();
      return;
    }

    const total = countWords(editor.document.getText());
    counter.text = `$(pencil) ${total.toLocaleString('zh-CN')} 字`;
    counter.show();
  }

  context.subscriptions.push(
    counter,
    vscode.window.onDidChangeActiveTextEditor(update),
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document === vscode.window.activeTextEditor?.document) {
        update();
      }
    })
  );

  update();
}

function deactivate() {}

module.exports = { activate, deactivate };
