import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'कार्ट खाली छ' }, { status: 400 });
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity || item.qty || item.count || 1,
    }));

    const session = await stripe.checkout.sessions.create({
       line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}