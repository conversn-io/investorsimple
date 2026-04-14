import { NextRequest } from 'next/server'
import { createCorsResponse, handleCorsOptions } from '@/lib/cors-headers'
import { deliverWebhookWithRetry } from '@/lib/webhook-delivery'
import { formatPhoneForGHL } from '@/utils/phone-utils'

export async function OPTIONS() {
  return handleCorsOptions()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.otpVerified) {
      return createCorsResponse({ error: 'OTP verification required' }, 403)
    }

    const webhookUrl = process.env.INVESTORSIMPLE_GHL_WEBHOOK
    if (!webhookUrl) {
      console.error('iul-quiz submit-lead: INVESTORSIMPLE_GHL_WEBHOOK not configured')
      return createCorsResponse({ error: 'Webhook not configured' }, 500)
    }

    const fullPhone = `${body.countryCode || '+1'}${body.phone || ''}`

    const ghlPayload = {
      source: 'investorsimple-iul-finder',
      timestamp: body.timestamp || new Date().toISOString(),
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email || '',
      phone: formatPhoneForGHL(fullPhone),
      countryCode: body.countryCode || '+1',
      age: body.age || null,
      state: body.state || '',
      primaryGoal: body.primaryGoal || '',
      currentInvestments: body.currentInvestments || [],
      monthlySavings: body.monthlySavings || '',
      canFundMonthly: true,
      otpVerified: true,
      tcpaConsented: true,
    }

    const result = await deliverWebhookWithRetry(webhookUrl, ghlPayload)

    if (!result.success) {
      console.error('iul-quiz GHL webhook failed:', result.error)
      return createCorsResponse({
        success: false,
        error: 'Lead delivery failed',
        attempts: result.attempts,
      }, 502)
    }

    return createCorsResponse({
      success: true,
      delivered: true,
      attempts: result.attempts,
    })
  } catch (error) {
    console.error('iul-quiz submit-lead error', error)
    return createCorsResponse({ error: 'Internal server error' }, 500)
  }
}
