#!/usr/bin/env node

const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const phone = process.env.TEST_PHONE || '+15555550123'
const bypassToken = process.env.TEST_BYPASS_TOKEN || ''

function randomId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

async function post(path, body) {
  const headers = { 'Content-Type': 'application/json' }
  if (bypassToken) headers['x-otp-bypass-token'] = bypassToken

  const res = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  const json = await res.json().catch(() => ({}))
  return { res, json }
}

async function run() {
  const sessionId = randomId()
  console.log('Running Phase 3 flow test', { baseUrl, sessionId })

  const capture = await post('/api/leads/capture-email', {
    email: `test+${Date.now()}@example.com`,
    firstName: 'Test',
    lastName: 'Lead',
    phoneNumber: phone,
    sessionId,
    funnelType: 'investor_quiz',
    quizAnswers: {
      primary_goal: 'income',
      risk_profile: 'moderate',
      time_horizon: '10y',
    },
    utmParams: {
      utm_source: 'phase3_test',
      utm_medium: 'script',
      utm_campaign: 'investorsimple_phase3',
    },
  })
  console.log('capture-email', capture.res.status, capture.json)
  if (!capture.res.ok) process.exit(1)

  let verifyBody
  if (bypassToken) {
    verifyBody = { phone, sessionId, otpBypassToken: bypassToken }
  } else {
    const sendOtp = await post('/api/otp/send', { phone })
    console.log('otp-send', sendOtp.res.status, sendOtp.json)
    if (!sendOtp.res.ok) process.exit(1)

    const otp = process.env.TEST_OTP || sendOtp.json.debug_code || sendOtp.json.debugCode
    if (!otp) {
      console.error('No OTP available. Set TEST_OTP or enable OTP debug mode.')
      process.exit(1)
    }
    verifyBody = { phone, otp, sessionId }
  }

  const verify = await post('/api/leads/verify-otp-and-send-to-ghl', verifyBody)
  console.log('verify-otp-send-ghl', verify.res.status, verify.json)

  if (!verify.res.ok || !verify.json?.verified) process.exit(1)
  console.log('Phase 3 flow passed')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
