import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { items, deliveryDate, deliveryTime, customerNote } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const line_items = items.map((item: any) => {
      const unitAmount = Math.round(Number(item.price) || 0);
      const qty = Number(item.quantity) || 1;

      return {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: item.name || 'Halal Item',
          },
          unit_amount: unitAmount,
        },
        quantity: qty,
      };
    });

    const subtotal = line_items.reduce(
      (sum, item) => sum + item.price_data.unit_amount * item.quantity,
      0
    );

    const isFreeShipping = subtotal >= 5000;
    const origin = req.headers.get('origin') || 'https://kk-halal-mart.vercel.app';

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      payment_method_types: ['card', 'konbini'],
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        delivery_date: deliveryDate || 'Anytime',
        delivery_time: deliveryTime || 'Anytime',
        customer_note: customerNote || 'None',
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: isFreeShipping ? 0 : 500,
              currency: 'jpy',
            },
            display_name: isFreeShipping
              ? 'Free Delivery (¥5,000+ Order)'
              : 'Standard Delivery (Japan)',
          },
        },
      ],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Error:', err);
    return NextResponse.json(
      { error: err.message || 'Payment session failed' },
      { status: 500 }
    );
  }
}