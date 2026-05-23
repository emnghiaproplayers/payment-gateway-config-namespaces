import {
    registerAs,
} from '@nestjs/config';
export default registerAs('payment', () => ({
    provider: process.env.PAYMENT_PROVIDER,
    apiKey: process.env.PAYMENT_API_KEY,
    timeoutMs: Number(process.env.PAYMENT_TIMEOUT_MS),
    webhookSecret: process.env.PAYMENT_WEBHOOK_SECRET,
}));