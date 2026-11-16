import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price),
      },
      quantity: item.quantity || item.qty || item.count || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 500, // डेलिभरी चार्ज (फ्री राख्न 0 लेख्नुहोला)
              currency: 'jpy',
            },
            display_name: 'Standard Shipping in Japan',
          },
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}