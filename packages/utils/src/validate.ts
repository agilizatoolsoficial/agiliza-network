export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return false
  if (/^(\d)\1+$/.test(cleaned)) return false

  const digits = cleaned.split('').map(Number)
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += digits[i]! * (10 - i)
  }
  let check = (sum * 10) % 11
  if (check === 10 || check === 11) check = 0
  if (digits[9]! !== check) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += digits[i]! * (11 - i)
  }
  check = (sum * 10) % 11
  if (check === 10 || check === 11) check = 0
  if (digits[10]! !== check) return false

  return true
}

export function isValidCNPJ(cnpj: string): boolean {
  const cleaned = cnpj.replace(/\D/g, '')
  if (cleaned.length !== 14) return false
  if (/^(\d)\1+$/.test(cleaned)) return false

  const digits = cleaned.split('').map(Number)
  let sum = 0
  const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  for (let i = 0; i < 12; i++) {
    sum += digits[i]! * weights[i]!
  }
  let check = sum % 11
  check = check < 2 ? 0 : 11 - check
  if (digits[12]! !== check) return false

  sum = 0
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  for (let i = 0; i < 13; i++) {
    sum += digits[i]! * weights2[i]!
  }
  check = sum % 11
  check = check < 2 ? 0 : 11 - check
  if (digits[13]! !== check) return false

  return true
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function sanitizeString(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}
