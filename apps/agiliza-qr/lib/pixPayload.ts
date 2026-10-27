/**
 * Pix Copia e Cola — Geração de payload EMV/BRCode
 * Especificação: Manual de Padrões para Iniciação do Pix — Banco Central do Brasil
 */

function pad(value: string): string {
  return value.length.toString().padStart(2, '0') + value
}

function buildTLV(id: string, value: string): string {
  return id + pad(value)
}

/**
 * CRC-16/CCITT-FALSE
 * Poly: 0x1021  |  Init: 0xFFFF  |  RefIn: false  |  RefOut: false  |  XorOut: 0x0000
 */
function crc16(data: string): string {
  let crc = 0xffff
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
    }
  }
  return ((crc & 0xffff).toString(16).toUpperCase()).padStart(4, '0')
}

export interface PixPayloadParams {
  key: string
  name: string
  city: string
  amount?: number
  description?: string
  txId?: string
}

export function buildPixPayload({
  key,
  name,
  city,
  amount,
  description = '',
  txId = '***',
}: PixPayloadParams): string {
  // Merchant Account Information (ID 26)
  const pixGui = buildTLV('00', 'BR.GOV.BCB.PIX')
  const pixKey = buildTLV('01', key)
  const pixDesc = description ? buildTLV('02', description.substring(0, 72)) : ''
  const merchantAccount = buildTLV('26', pixGui + pixKey + pixDesc)

  // Additional Data Field (ID 62) — txId
  const safeTxId = txId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 25) || '***'
  const additionalData = buildTLV('62', buildTLV('05', safeTxId))

  // Safe name/city — EMV spec limits
  const safeName = name.substring(0, 25).toUpperCase()
  const safeCity = city.substring(0, 15).toUpperCase()

  // Build payload (without CRC)
  let payload =
    buildTLV('00', '01') +        // Payload Format Indicator
    merchantAccount +
    buildTLV('52', '0000') +      // Merchant Category Code
    buildTLV('53', '986') +       // Transaction Currency — BRL
    (amount != null && amount > 0
      ? buildTLV('54', amount.toFixed(2))
      : '') +
    buildTLV('58', 'BR') +        // Country Code
    buildTLV('59', safeName) +    // Merchant Name
    buildTLV('60', safeCity) +    // Merchant City
    additionalData +
    '6304'                        // CRC placeholder

  return payload + crc16(payload)
}
