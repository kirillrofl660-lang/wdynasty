/**
 * Простой веб-воркер для оффлоада тяжёлой фильтрации/сортировки массивов.
 * Пока используется только как демо-паттерн для будущего масштабирования.
 */
self.addEventListener('message', (event) => {
  const { id, type, payload } = event.data

  if (type === 'filter') {
    const { items, search, tag } = payload
    const normalizedSearch = (search || '').toLowerCase().trim()
    const result = items.filter((item) => {
      const matchesSearch = !normalizedSearch ||
        (item.title && item.title.toLowerCase().includes(normalizedSearch)) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(normalizedSearch))
      const matchesTag = !tag || tag === 'all' || (item.tags || []).some((t) => t.tag === tag || t === tag)
      return matchesSearch && matchesTag
    })
    self.postMessage({ id, type: 'result', payload: result })
  }
})
