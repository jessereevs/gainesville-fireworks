import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

function environment() {
    const mode = process.env.PAYPAL_MODE; // Default to 'live' if PAYPAL_MODE is not set
    const clientId = process.env.PAYPAL_CLIENT_ID || '';
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';

    if (mode === 'sandbox') {
        return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
    } else {
        return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
    }
}

function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

export { client };
