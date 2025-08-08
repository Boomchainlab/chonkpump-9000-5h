import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check various system components
    const checks = {
      api: true, // API is responding
      database: !!process.env.DATABASE_URL, // Database connection available
      reownConfig: !!process.env.NEXT_PUBLIC_REOWN_PROJECT_ID, // Wallet integration configured
      stripeConfig: !!(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY), // Payment processing
      sessionConfig: !!process.env.SESSION_SECRET // Session management
    }

    const allReady = Object.values(checks).every(check => check === true)
    const readyCount = Object.values(checks).filter(check => check === true).length
    const totalChecks = Object.keys(checks).length

    return NextResponse.json({
      success: true,
      ready: allReady,
      readiness: `${readyCount}/${totalChecks}`,
      checks,
      timestamp: new Date().toISOString(),
      message: allReady 
        ? 'CHONK9K Whale Manager is fully operational' 
        : 'Some components need configuration'
    }, {
      status: allReady ? 200 : 503
    })
  } catch (error) {
    console.error('Readiness check failed:', error)
    return NextResponse.json({
      success: false,
      ready: false,
      error: 'Readiness check failed',
      timestamp: new Date().toISOString()
    }, {
      status: 503
    })
  }
}
