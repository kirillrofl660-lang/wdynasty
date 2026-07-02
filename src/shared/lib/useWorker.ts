'use client'

import { useEffect, useRef, useCallback } from 'react'

let id = 0

export function useWorker<TPayload, TResult>(workerUrl: string) {
  const workerRef = useRef<Worker | null>(null)
  const handlersRef = useRef<Map<number, (result: TResult) => void>>(new Map())

  useEffect(() => {
    if (typeof window === 'undefined') return
    const worker = new Worker(workerUrl)
    workerRef.current = worker

    worker.addEventListener('message', (event) => {
      const { id, payload } = event.data
      const resolve = handlersRef.current.get(id)
      if (resolve) {
        resolve(payload as TResult)
        handlersRef.current.delete(id)
      }
    })

    return () => {
      worker.terminate()
      workerRef.current = null
    }
  }, [workerUrl])

  const run = useCallback((type: string, payload: TPayload): Promise<TResult> => {
    return new Promise((resolve) => {
      const currentId = ++id
      handlersRef.current.set(currentId, resolve)
      workerRef.current?.postMessage({ id: currentId, type, payload })
    })
  }, [])

  return run
}
