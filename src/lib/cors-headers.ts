import { NextResponse } from 'next/server'

const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'

export function createCorsResponse(data: unknown, status: number = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': CORS_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export function handleCorsOptions() {
  return createCorsResponse({}, 200)
}
