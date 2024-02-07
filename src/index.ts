import { message, registerCommand } from '@vscode-use/utils'
import { rimraf } from 'rimraf'
import type { ExtensionContext, Uri } from 'vscode'

export function activate(context: ExtensionContext) {
  let cacheMap: Uri[] = []
  context.subscriptions.push(
    registerCommand('fastEmpty.delete', (current, selections: Uri[]) => {
      const start = Date.now()
      if (cacheMap.includes(current)) {
        message.warn(`${current} 正在删除中，请不要重复删除`)
        return
      }
      rimraf(selections.map(item => item.fsPath)).then((isSuccess) => {
        message.info(isSuccess ? `删除成功 🎉 （${(Date.now() - start) / 1000}s）` : '删除失败 ❌')
        cacheMap = cacheMap.filter(cache => !selections.includes(cache))
      }).catch((err) => {
        message.error(`删除失败 ❌ ${err}`)
        cacheMap = cacheMap.filter(cache => !selections.includes(cache))
      })
    }),
  )
}

export function deactivate() {

}
