import { revalidatePath } from 'next/cache'

/**
 * Ревалидирует переданные пути сразу после сохранения/удаления в админке Payload.
 * Ошибки логируются, но не прерывают hook, чтобы не блокировать сохранение документа.
 */
export function revalidateSitePaths(paths: Array<{ path: string; type?: 'page' | 'layout' }>) {
  for (const { path, type } of paths) {
    try {
      revalidatePath(path, type)
    } catch (err) {
      console.error(`[revalidate] Failed to revalidate ${path}:`, err)
    }
  }
}
