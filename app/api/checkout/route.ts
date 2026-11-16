import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // कार्टमा भएका सामानहरूको कुल रकम (Subtotal) हिसाब गर्ने
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // ¥5,000 वा सोभन्दा बढी भए Free Shipping (0), नत्र ¥500
    const isFreeShipping = subtotal >= 5000;

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
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
              amount: isFreeShipping ? 0 : 500,
              currency: 'jpy',
            },
            display_name: isFreeShipping
              ? 'Free Delivery (¥5,000+ Order)'
              : 'Standard Delivery (Japan)',
          },
        },
      ],
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}