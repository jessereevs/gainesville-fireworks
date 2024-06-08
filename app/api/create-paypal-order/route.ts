import { NextRequest, NextResponse } from 'next/server';
import { client } from '../paypalClient';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

export async function POST(req: NextRequest) {
    try {
        const { purchase_units } = await req.json();

        // Ensure that all required fields are present and correctly formatted
        if (!purchase_units || !Array.isArray(purchase_units) || purchase_units.length === 0) {
            throw new Error('Invalid purchase_units');
        }

        purchase_units.forEach(unit => {
            if (!unit.amount || !unit.amount.value || !unit.amount.currency_code) {
                throw new Error('Missing required amount fields in purchase_units');
            }

            unit.amount.value = parseFloat(unit.amount.value).toFixed(2);
            unit.amount.breakdown = {
                item_total: {
                    currency_code: unit.amount.currency_code,
                    value: unit.amount.value
                }
            };
        });

        const requestBody = {
            intent: 'CAPTURE' as 'CAPTURE',
            purchase_units: purchase_units,
            application_context: {
                return_url: 'http://gainesville-fireworks.com/success', // Ensure this URL matches your success page route
                cancel_url: 'http://gainesville-fireworks.com/cancel'  // Optional: URL to redirect if the user cancels the payment
            }
        };

        // Log the request payload for debugging
        console.log('PayPal Order Request Body:', JSON.stringify(requestBody, null, 2));

        const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        request.requestBody(requestBody);

        const response = await client().execute(request);
        return NextResponse.json({
            status: 'success',
            id: response.result.id,
            approvalUrl: response.result.links.find((link: { rel: string }) => link.rel === 'approve').href
        });
    } catch (error: any) {
        console.error('Error creating PayPal order:', error);
        return NextResponse.json({ status: 'error', error: error.message });
    }
}
