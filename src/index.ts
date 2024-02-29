import { getLocale, message, registerCommand } from '@vscode-use/utils'
import { rimraf } from 'rimraf'
import type { ExtensionContext, Uri } from 'vscode'

export function activate(context: ExtensionContext) {
  let cacheMap: Uri[] = []
  context.subscriptions.push(
    registerCommand('fastEmpty.delete', (current, selections: Uri[]) => {
      const start = Date.now()
      const isZh = getLocale().includes('zh')
      if (cacheMap.includes(current)) {
        message.warn(`${current} ${isZh ? '正在删除中，请不要重复删除' : 'is being deleted, please do not delete repeatedly'}`)
        return
      }
      rimraf(selections.map(item => item.fsPath)).then((isSuccess) => {
        message.info(isSuccess ? `${isZh ? '删除成功' : 'Deleted successfully'} 🎉 （${(Date.now() - start) / 1000}s）` : `${isZh ? '删除失败' : 'Failed to delete'} ❌`)
        cacheMap = cacheMap.filter(cache => !selections.includes(cache))
      }).catch((err) => {
        message.error(`${isZh ? '删除失败' : 'Failed to delete'} ❌ ${err}`)
        cacheMap = cacheMap.filter(cache => !selections.includes(cache))
      })
    }),
  )
}

export function deactivate() {

}
