import { NextRequest } from 'next/server'

type OtpBypassInput = {
  otpBypassToken?: string | null
}

export type OtpBypassResult = {
  bypassed: boolean
  reason: string
}

function isTruthy(value: string | undefined) {
  return value === 'true'
}

export function evaluateOtpBypass(request: NextRequest, body: OtpBypassInput): OtpBypassResult {
  const bypassEnabled = isTruthy(process.env.INVESTORSIMPLE_OTP_BYPASS_ENABLED)
  if (!bypassEnabled) return { bypassed: false, reason: 'disabled' }

  const bypassToken = process.env.INVESTORSIMPLE_OTP_BYPASS_TOKEN || ''
  if (!bypassToken) return { bypassed: false, reason: 'missing_server_token' }

  const allowInProduction = isTruthy(process.env.INVESTORSIMPLE_OTP_BYPASS_ALLOW_PRODUCTION)
  if (process.env.NODE_ENV === 'production' && !allowInProduction) {
    return { bypassed: false, reason: 'blocked_in_production' }
  }

  const tokenFromHeader = request.headers.get('x-otp-bypass-token')
  const tokenFromBody = body.otpBypassToken || null
  const provided = tokenFromHeader || tokenFromBody

  if (!provided) return { bypassed: false, reason: 'no_token' }
  if (provided !== bypassToken) return { bypassed: false, reason: 'token_mismatch' }

  return { bypassed: true, reason: 'valid_token' }
}
