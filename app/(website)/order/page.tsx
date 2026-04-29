import type { Metadata } from 'next'
import { OrderClient } from './OrderClient'

export const metadata: Metadata = {
    title: 'Order | ZHOVON',
    description: 'Order a custom website, CRM integration, WordPress build, or full digital system.',
}

export default function OrderPage() {
    return <OrderClient />
}
