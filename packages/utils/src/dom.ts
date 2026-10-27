export function getTouchCoords(event: TouchEvent | MouseEvent): { x: number; y: number } {
  if ('touches' in event && event.touches.length > 0) {
    return { x: event.touches[0]!.clientX, y: event.touches[0]!.clientY }
  }
  if ('clientX' in event) {
    return { x: (event as MouseEvent).clientX!, y: (event as MouseEvent).clientY! }
  }
  return { x: 0, y: 0 }
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
