import { NextRequest, NextResponse } from 'next/server';
import { client } from '../paypalClient';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

export async function GET(req: NextRequest) {
    try {
        // Create a new order
        const createRequest = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        createRequest.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: '100.00'
                }
            }]
        });

        const createResponse = await client().execute(createRequest);
        const orderId = createResponse.result.id;

        // Retrieve the created order
        const getRequest = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);
        const getResponse = await client().execute(getRequest);

        return NextResponse.json({ status: 'success', data: getResponse.result });
    } catch (error: any) {
        console.error('Error executing PayPal request:', error);
        return NextResponse.json({ status: 'error', error: error.message });
    }
}
