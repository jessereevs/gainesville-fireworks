import { NextRequest, NextResponse } from 'next/server';
import { client } from '../paypalClient';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

export async function POST(req: NextRequest) {
    try {
        const { orderId } = await req.json();

        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
        request.requestBody({ payment_source: {} as any });  // Type assertion to bypass TypeScript check

        const response = await client().execute(request);
        return NextResponse.json({ status: 'success', data: response.result });
    } catch (error: any) {
        console.error('Error capturing PayPal order:', error);
        return NextResponse.json({ status: 'error', error: error.message });
    }
}
