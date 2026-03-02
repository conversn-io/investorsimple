# Phase 3 Flow Testing

## Prereqs
- App deployed or running locally
- CallReady DB credentials configured
- For full OTP flow: Twilio creds configured OR debug mode enabled

## Command

```bash
# local
npm run test:phase3

# against production
BASE_URL=https://investorsimple.org npm run test:phase3

# if OTP debug disabled, provide a known OTP from SMS
BASE_URL=https://investorsimple.org TEST_PHONE=+15555550123 TEST_OTP=123456 npm run test:phase3
```

## What it validates
1. `POST /api/leads/capture-email`
2. `POST /api/otp/send`
3. `POST /api/leads/verify-otp-and-send-to-ghl`

The script exits non-zero on any failure.
