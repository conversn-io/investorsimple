export interface WebhookDeliveryResult {
  success: boolean
  status: number
  attempts: number
  error?: string
  responseText?: string
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 12000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

export async function deliverWebhookWithRetry(
  url: string,
  payload: unknown,
  maxAttempts = 3
): Promise<WebhookDeliveryResult> {
  let lastError = 'unknown error'
  let lastStatus = 0
  let lastText = ''

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchWithTimeout(
        url,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
        12000
      )

      lastStatus = response.status
      lastText = await response.text().catch(() => '')

      if (response.ok) {
        return { success: true, status: response.status, attempts: attempt, responseText: lastText }
      }

      lastError = `HTTP ${response.status}`
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error)
    }

    if (attempt < maxAttempts) {
      await sleep(400 * attempt)
    }
  }

  return {
    success: false,
    status: lastStatus,
    attempts: maxAttempts,
    error: lastError,
    responseText: lastText,
  }
}
