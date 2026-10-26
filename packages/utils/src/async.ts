export function asyncHandler<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
): () => Promise<ReturnType<T>> {
  return async () => {
    try {
      return (await fn()) as ReturnType<T>
    } catch (error) {
      console.error('Async handler error:', error)
      throw error
    }
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000,
): Promise<T> {
  let lastError: unknown
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(2, i)))
      }
    }
  }
  throw lastError
}
