import { NextRequest, NextResponse } from 'next/server';
import { client } from '../paypalClient';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

export async function POST(req: NextRequest) {
    try {
        const { amount, currency_code } = await req.json();

        const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency_code || 'USD',
                    value: amount
                }
            }]
        });

        const response = await client().execute(request);
        return NextResponse.json({ status: 'success', id: response.result.id });
    } catch (error: any) {
        console.error('Error creating PayPal order:', error);
        return NextResponse.json({ status: 'error', error: error.message });
    }
}
