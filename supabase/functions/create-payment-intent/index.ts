import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@14.10.0?target=deno"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS Preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, currency = "usd" } = await req.json()
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    
    if (!stripeSecretKey) {
      throw new Error("Missing STRIPE_SECRET_KEY environment variable in Supabase dashboard.")
    }

    // Initialize Stripe client using Deno's native HTTP fetch client wrapper
    const stripe = new Stripe(stripeSecretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Create the PaymentIntent using the amount in cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency.toLowerCase(),
      automatic_payment_methods: { enabled: true },
    })

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error("PaymentIntent generation error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
