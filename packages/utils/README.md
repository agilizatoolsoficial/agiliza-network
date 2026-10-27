# @agiliza/utils

Shared utility functions for the Agiliza Network monorepo.

## Exports

### Formatting
- `formatFileSize(bytes)` — Convert bytes to human-readable string
- `formatDate(date)` — Format date as pt-BR locale string
- `formatCurrency(amount, currency)` — Format as Brazilian currency

### Validation
- `isValidEmail(email)` — Validate email format
- `isValidCPF(cpf)` — Validate Brazilian CPF
- `isValidCNPJ(cnpj)` — Validate Brazilian CNPJ
- `isValidURL(url)` — Validate URL format
- `sanitizeString(str)` — Strip HTML tags from string

### Async Utilities
- `asyncHandler(fn)` — Wrap async function with try/catch
- `debounce(fn, ms)` — Debounce function execution
- `retry(fn, maxRetries, delayMs)` — Retry with exponential backoff

### DOM Utilities
- `getTouchCoords(event)` — Extract touch or mouse coordinates
- `isTouchDevice()` — Check if device supports touch
- `clamp(value, min, max)` — Clamp value within range
