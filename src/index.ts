import { message, registerCommand } from '@vscode-use/utils'
import { rimraf } from 'rimraf'
import type { ExtensionContext, Uri } from 'vscode'

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    registerCommand('fastEmpty.delete', (current, selections: Uri[]) => {
      const start = Date.now()
      rimraf(selections.map(item => item.path)).then((isSuccess) => {
        message.info(isSuccess ? `删除成功 🎉 （${(Date.now() - start) / 1000}s）` : '删除失败 ❌')
      })
    }),
  )
}

export function deactivate() {

}
