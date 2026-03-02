export function formatE164(phone: string | null | undefined): string | null {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  if (phone.startsWith('+') && digits.length >= 10) return phone
  return null
}

export function formatPhoneForGHL(phone: string | null | undefined): string {
  return formatE164(phone) || ''
}
