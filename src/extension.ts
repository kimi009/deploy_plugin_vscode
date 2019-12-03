// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
const fs = require('fs')
const path = require('path')
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "deploy" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.helloWorld',
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage('Hello World!')
    }
  )

  context.subscriptions.push(disposable)

  const fc = vscode.commands.registerCommand('extension.deploy', params => {
    const filePath = params.fsPath
    let isFile = fs.statSync(filePath).isFile()
    if (!isFile) {
      vscode.window.showInformationMessage('发布的脚本不是shell文件')
      return
    }
    let extName = path.extname(filePath)
    if (extName !== '.sh') {
      vscode.window.showInformationMessage('发布的脚本不是shell文件')
      return
    }
    // let m = vscode.workspace.getConfiguration("executor");
    let _terminal = vscode.window.createTerminal("Code");
    let dirName = path.dirname(filePath)
    _terminal.sendText(`cd "${dirName}"`);
    _terminal.sendText(
      `& 'D:\\Program Files\\Git\\git-bash.exe' ${filePath}`
    )
    // // 调出系统输入框获取组件名
    // vscode.window.showInputBox(options).then(value => {
    //   if (!value) return

    //   const componentName = value
    //   const fullPath = `${folderPath}/${componentName}`

    //   // 生成模板代码，不是本文的重点，先忽略
    //   // generateComponent(componentName, fullPath, ComponentType.FUNCTIONAL_COMP)
    // })
  })
  context.subscriptions.push(fc)
}

// this method is called when your extension is deactivated
export function deactivate() {}
